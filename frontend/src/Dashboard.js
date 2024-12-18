import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/mainAndOutfitStyles/blog.css";
import "./styles/mainAndOutfitStyles/carousel.css";

const Dashboard = ({user, setUsers}) => {
    //recieve hook
    
    useEffect(() => {
      const fetchProducts= async () => {
        try {
          const response = await fetch("http://localhost:8081/listProducts");
          if (!response.ok) {
            throw new Error("Failed to fetch Products");
          }
          const data = await response.json();
          console.log(data)
          setUsers(data); // Product Setter
          
        } catch (error) {
          alert("There was an Error loading Products" + error);
        }
      };
      fetchProducts();
    }, []);
    
    return (
        <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            ShopEase
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Shop
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Cart
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container text-center my-5">
        <h1>Welcome to ShopEase</h1>
        <p className="lead">Your one-stop shop for everything you need!</p>
        <a href="#" className="btn btn-primary btn-lg">
          Start Shopping
        </a>
      </div>

      {/* Product Grid */}
      <div className="container">
        <div className="row">
          {[1, 2, 3, 4, 5, 6].map((product, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100">
                <img
                  src={`https://via.placeholder.com/300?text=Product+${index + 1}`}
                  className="card-img-top"
                  alt={`Product ${index + 1}`}
                />
                <div className="card-body">
                  <h5 className="card-title">Product {index + 1}</h5>
                  <p className="card-text">$99.99</p>
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light text-center text-lg-start mt-5">
        <div className="container p-4">
          <p>&copy; 2024 ShopEase. All rights reserved.</p>
        </div>
      </footer>
    </>    
    );
};


export default Dashboard;
