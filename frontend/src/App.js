import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./SideBar.js";
import Products from "./Products.js";
import Orders from "./Orders.js";
import Users from "./Users.js";

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);


  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <h1 className="text-center">GrimStone</h1>
          <Routes>
            <Route path="/" element={
                <mainDashboard users = {users} setUsers={setUsers} />
            } />
            <Route path="/Products" element={
                <Products products = {products} setProducts={setProducts} />
            }/>
            <Route path="/Orders" element={
                <Orders orders = {orders} setOrders={setOrders} />
            }/>
            <Route path="/Users" element={
                <Users users = {users} setUsers={setUsers} />
            }/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
