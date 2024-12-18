import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateProductButton from './UpdateProduct';
import ProductGrid from "./ProductGrid";

const Products = ({ products, setProducts }, users) => {
  //recieve hook
  const handleCreateProduct = async () => {
    // Hardcoded data to be sent in the POST request
    const productData = {
      imageURL: "https://example.com/fakeimage.jpg",
      name: "Fake Product",
      price: 29.99,
      description: "This is a fake description for testing.",
    };

    try {
      // Sending POST request to /product
      const response = await fetch('http://localhost:8081/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData), // Send the product data
      });

      // Check if the request was successful
      if (response.ok) {
        const result = await response.json();
        console.log('Product created:', result);
        alert('Product created successfully!');
      } else {
        console.error('Error creating product:', response.statusText);
        alert('Error creating product.');
      }
    } catch (error) {
      console.error('Request failed', error);
      alert('Failed to create product.');
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8081/listProducts");
        if (!response.ok) {
          throw new Error("Failed to fetch Products");
        }
        const data = await response.json();
        console.log(data);
        setProducts(data); // Product Setter
      } catch (error) {
        alert("There was an Error loading Products" + error);
      }
    };
    fetchProducts();
  }, []);

  
  return (
    <>
      {/* Carousel Navigation */}
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://via.placeholder.com/1920x500?text=Welcome+to+ShopEase"
              className="d-block w-100"
              alt="Welcome Banner"
            />
            <div className="carousel-caption d-none d-md-block">
              <h1>ShopEase</h1>
              <p>Your one-stop shop for everything you need!</p>
              <a href="#" className="btn btn-primary btn-lg" onClick={handleCreateProduct}>
                Start Shopping
              </a>
            </div>
          </div>
        
          <div className="carousel-item">
            <img
              src="https://via.placeholder.com/1920x500?text=Exclusive+Offers"
              className="d-block w-100"
              alt="Exclusive Offers"
            />
            <div className="carousel-caption d-none d-md-block">
              <h2>Exclusive Offers</h2>
              <p>Shop now and save big on our top categories.</p>
              <a href="#" className="btn btn-success btn-lg">
                View Deals
              </a>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://via.placeholder.com/1920x500?text=New+Arrivals"
              className="d-block w-100"
              alt="New Arrivals"
            />
            <div className="carousel-caption d-none d-md-block">
              <h2>New Arrivals</h2>
              <p>Discover the latest trends and must-have items.</p>
              <a href="#" className="btn btn-warning btn-lg">
                Browse Now
              </a>
            </div>
          </div>
        </div>
        <UpdateProductButton />
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
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
        <ProductGrid products={products}/>
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
export default Products;
