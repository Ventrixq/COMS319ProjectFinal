import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column vh-100 p-3 bg-light"
      style={{ width: "250px" }}
    >
      <h2 className="text-center">Navigation</h2>
      <ul className="nav flex-column">
      <li className="nav-item">
          <Link to="/SignUp" className="nav-link text-dark">
            SignUp
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link text-dark">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Products" className="nav-link text-dark">
            View Products
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Orders" className="nav-link text-dark">
            View Your Orders
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Users" className="nav-link text-dark">
            View All Users
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Orders" className="nav-link text-dark">
            Cart
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
