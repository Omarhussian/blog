import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";

const DashRoute = () => {
  return (
    <Router>
      <Routes>
        <Route index exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default DashRoute;
