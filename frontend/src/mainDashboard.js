import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const mainDashboard = ({user, setUsers}) => {
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
        </div>
    );
};


export default mainDashboard;
