import React, { useState } from "react";
import "tailwindcss/tailwind.css";
const AppBar = () => {

 
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
            {/* <input
              type="text"
              placeholder="Search"
              className="rounded-md px-2 py-1 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
             
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
