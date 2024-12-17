import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Products = ({ products, setProducts }, users) => {
  //recieve hook
  const [order, setOrderName] = useState("");
  const [description, setDescription] = useState("");

  const addOneOrder = async (product) => {
    try {
      const response = await fetch("http://localhost:8081/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          deliverDate: new Date().toISOString(),
          orderDate: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Error: " + errorData.error);
      } else {
        const successMessage = await response.text();
        alert(successMessage);
      }
    } catch (err) {
      alert("An error occurred: " + err);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call this function to fetch backend with method POST
    addOneOrder();

    // Clean hooks to start again
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4">Products List</h2>
      <ul className="list-group">
        {products.map((product) => (
          <li
            key={product.id}
            className="list-group-item d-flex align-items-center"
          >
            {product.image_url && (
              <img
                src={`http://localhost:8081${product.imageUrl}`}
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
                onClick={() => addOneOrder(product)}
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
