import React, { useState, useContext } from "react";
import { PopupContext } from "../../Context/PopupContext";
import { postCall } from "../../features/api/apiSlice";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const AddPopup = ({ getBlogs }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { hidePopup } = useContext(PopupContext);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSave = () => {
    const newBlog = {
      title: title,
      body: body,
      userId: 1,
    };

    dispatch(
      postCall({
        path: "/posts",
        body: newBlog,
        showLoader: true,
        fallback: null,
      })
    )
      .unwrap()
      .then(() => {
        enqueueSnackbar("Success", { variant: "success" });

        hidePopup();
      });
  };

  const handleCancel = () => {
    hidePopup();
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6 w-full"
      style={{ width: 440 }}
    >
      <h2 className="text-xl font-semibold mb-4">Add Blog</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Body</label>
        <textarea
          value={body}
          onChange={handleBodyChange}
          className="px-3 py-2 border border-gray-300 rounded-lg w-full h-40 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
        ></textarea>
      </div>
      <div className="flex justify-center">
        <button
          className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddPopup;
