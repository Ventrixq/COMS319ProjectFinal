import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Users = ({ users, setUsers }) => {
  //recieve hook
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8081/listUsers");
        if (!response.ok) {
          throw new Error("Failed to fetch Users");
        }
        const data = await response.json();
        console.log(data);
        setUsers(data); // User Setter
      } catch (error) {
        alert("There was an Error loading Users" + error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mt-4">Users List</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex align-items-center"
          >
            {user.imageUrl && (
              <img
                src={`http://localhost:8081${user.imageUrl}`}
                alt={user.name}
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "15px",
                  objectFit: "cover",
                }}
              />
            )}
            <div>
              <strong>{user.name}</strong> - {user.name}
              <p>{user.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Users;
