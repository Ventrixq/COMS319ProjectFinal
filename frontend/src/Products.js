import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Products = ({ products, setProducts }, users) => {
  //recieve hook
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
    <div className="container">
      <h2 className="text-center mt-4">Products List</h2>
      <ul className="list-group">
        {products.map((product) => (
          <li
            key={product.id}
            className="list-group-item d-flex align-items-center"
          >
            {product.imageUrl && (
              <img
                src={`${product.imageUrl}`}
                alt={product.name}
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "15px",
                  objectFit: "cover",
                }}
              />
            )}
            <div>
              <strong>{product.name}</strong> - {product.price}
              <p>{product.description}</p>
              <button
                id="Buy"
                type="button"
                className="btn btn-primary"
              >
                Buy
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Products;
