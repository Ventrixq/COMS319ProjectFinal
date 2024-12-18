import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({admin}) => {
  return (
    <div
      className="d-flex flex-column vh-100 p-3 bg-light"
      style={{ width: "250px" }}
    >
      <h2 className="text-center">Navigation</h2>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/Main" className="nav-link text-dark">
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
          <Link to="/Carts" className="nav-link text-dark">
            Cart
          </Link>
        </li>
        {admin === true && (
          <>
          </>
        )}
      </ul>
    </div>
  );
};
export default Sidebar;
