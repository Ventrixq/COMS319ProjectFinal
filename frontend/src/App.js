import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./SideBar.js";
import Dashboard from "./Dashboard.js";
import Products from "./ProductManagement/Products.js";
import Orders from "./OrderManagement/Orders.js";
import SignUp from "./UserManagement/UserSignUp.js";

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
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/" element={
                <Dashboard users = {users} setUsers={setUsers} />
            } />
            <Route path="/Products" element={
                <Products products = {products} setProducts={setProducts} />
            }/>
            <Route path="/Orders" element={
                <Orders orders = {orders} setOrders={setOrders} />
            }/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
