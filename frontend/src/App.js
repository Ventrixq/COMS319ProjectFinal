import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./SideBar.js";
import Products from "./Products.js";

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUsers] = useState([]);

  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <h1 className="text-center">GrimStone</h1>
          <Routes>
            <Route path="/" element={
                <mainDashboard user = {user} setUsers={setUsers} />
            } />
            <Route path="/Products" element={
                <Products products = {products} setProducts={setProducts} />
            }/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
