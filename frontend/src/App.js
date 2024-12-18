import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./MainComponents/SideBar.js";
import Dashboard from "./Dashboard/Dashboard.js";
import Products from "./ProductManagement/Products.js";
import Orders from "./OrderManagement/Orders.js";
import SignUp from "./UserManagement/UserSignUp.js";

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [logged, setLogged] = useState([false]);
  const [userId, setUserId] = useState([]);

  return (
    <div className="App">
    {logged ? (
      <Router>
        <div className="d-flex">
          {admin && <Sidebar admin={admin} />}
          <div className="flex-grow-1 p-3">
            <h1 className="text-center">GrimStone</h1>
            <Routes>
                <Route path="/Main" element={
                    <Dashboard users = {users} setUsers={setUsers} />
                } />
                <Route path="/Products" element={
                    <Products products = {products} setProducts={setProducts} />
                }/>
                <Route path="/Orders" element={
                    <Orders orders = {orders} setOrders={setOrders} />
                }/>
                <Route path="/Carts" element={
                    <Orders orders = {orders} setOrders={setOrders} />
                }/>
                {admin === true && (
                    <>
                    </>
                )}
            </Routes>
          </div>
        </div>
      </Router>
    ) : (
      <SignUp
        logged = {logged} setLogged = {setLogged}
        admin = {admin} setAdmin={setAdmin}
        userId = {userId} setUserId = {setUserId}
      />
    )}
  </div>
);
}
export default App;
