import React, { useState, useContext } from "react";
import "tailwindcss/tailwind.css";
import { useDispatch } from "react-redux";
import { PopupContext } from "../Context/PopupContext";
import AddPopup from "../components/popups/AddPopup";

const AppBar = () => {
  const { showPopup } = useContext(PopupContext);

  const handleAddBlog = () => {
    showPopup(<AddPopup />)
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            {/* if u have a logo img or something u want implement here. */}
            {/* <img src="/logo.png" alt="Logo" className="h-6 w-6 mr-2" /> */}
            <h1 className="text-white font-bold text-lg">Blogs</h1>
          </div>
          <div className="flex items-center">
            <button
              className="px-4 py-2 text-purple-500 bg-white rounded-lg  focus:outline-none"
              onClick={handleAddBlog}
            >
              Add Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
