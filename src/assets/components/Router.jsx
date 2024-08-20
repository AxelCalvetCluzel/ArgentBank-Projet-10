import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./Header";
import Footer from "./Footer";
import User from "./pages/User";

const AppRouter = () => {
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/user" element={<User />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
