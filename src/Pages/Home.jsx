import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCall } from "../features/api/apiSlice";
import Layout from "../layout/Layout";
import BlogCard from "../components/Cards/BlogCard";
import { useSnackbar } from "notistack";

const Home = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const getBlogs = () => {
    setIsLoading(true); // Start loading

    dispatch(
      getCall({
        path: "/posts",
        body: {
          /* request body */
        },
        headers: {
          /* headers */
        },
        showLoader: true,
        fallback: null,
      })
    ).then((response) => {
      const responseData = response.payload.resp.data;
      setBlogs(responseData);
      setIsLoading(false); // Stop loading when data arrives
    });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {isLoading ? ( // Render the loader if still loading
          <div className="flex justify-center">
            <div className="loader">
              {enqueueSnackbar("Loading...", {
                variant: "warning",
              })}
            </div>
          </div>
        ) : (
          <div className="flex grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((item) => (
              <div className="flex justify-center" key={item.id}>
                <BlogCard data={item} getBlogs={getBlogs} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
