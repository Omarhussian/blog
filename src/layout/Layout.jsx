import React from "react";
import "tailwindcss/tailwind.css";
import AppBar from "./AppBar";
const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      <div className="flex">
        <div
          className="flex-grow  min-h-screen overflow-y-auto"
          style={{
            background:
              "linear-gradient(to right, #667eea, #764ba2, #6B8DD6, #8E37D7)",
            animation: "gradientAnimation 10s linear infinite",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
