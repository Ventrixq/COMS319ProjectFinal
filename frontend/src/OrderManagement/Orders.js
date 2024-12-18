import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Orders = ({ orders, setOrders }, users) => {
  //recieve hook
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8081/listOrders");
        if (!response.ok) {
          throw new Error("Failed to fetch Orders");
        }
        const data = await response.json();
        console.log(data);
        setOrders(data); // Product Setter
      } catch (error) {
        alert("There was an Error loading Orders" + error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mt-4">Orders List</h2>
      <ul className="list-group">
        {orders.map((order) => (
          <li
            key={order.id}
            className="list-group-item d-flex align-items-center"
          >
            {order.name && (
              <img
                src={`http://localhost:8081${order.name}`}
                alt={order.name}
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "15px",
                  objectFit: "cover",
                }}
              />
            )}
            <div>
              <strong>{order.name}</strong> - {order.price}
              <p>{order.description}</p>
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
export default Orders;
