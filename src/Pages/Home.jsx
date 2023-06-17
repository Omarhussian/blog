import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCall } from "../features/api/apiSlice";
import Layout from "../layout/Layout";
import BlogCard from "../components/Cards/BlogCard";
import { useSnackbar } from "notistack";
import { createAction } from "@reduxjs/toolkit";
import Pagination from "../components/Pagnation";
export const updateBlogs = createAction("api/updateBlogs");
const Home = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const blogs = useSelector((state) => state.api.data);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10);

  const getBlogs = () => {
    setIsLoading(true);
    dispatch(
      getCall({
        path: "/posts",
        body: {},
        headers: {},
        showLoader: true,
        fallback: null,
      })
    ).then((response) => {
      const responseData = response.payload.resp.data;
      dispatch(updateBlogs(responseData));
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const filteredBlogs = currentBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="container mx-auto mt-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            onFocus={(e) => e.target.classList.remove("animate-pulse")}
            onBlur={(e) => e.target.classList.add("animate-pulse")}
            className="animate-pulse px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <div className="loader">
              {enqueueSnackbar("Loading...", {
                variant: "warning",
              })}
            </div>
          </div>
        ) : (
          <>
            <div className="flex grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((item) => (
                <div className="flex justify-center" key={item.id}>
                  <BlogCard data={item} getBlogs={getBlogs} />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              {blogs.length > blogsPerPage && (
                <Pagination
                  blogsPerPage={blogsPerPage}
                  totalBlogs={blogs.length}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
