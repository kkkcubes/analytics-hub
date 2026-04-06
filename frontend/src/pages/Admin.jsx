import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Admin() {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  // 🔄 Fetch users
  const fetchUsers = () => {
    fetch("http://localhost:5000/users", {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🗑️ Delete user
  const deleteUser = async (id) => {
    await fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });

    fetchUsers(); // 🔄 refresh list
  };

  // 🔁 Change role
  const changeRole = async (id) => {
    await fetch(`http://localhost:5000/users/${id}/role`, {
      method: "PUT",
      headers: { Authorization: token },
    });

    fetchUsers(); // 🔄 refresh list
  };

  return (
    <Layout>
      <h2>Admin Panel</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((u) => (
          <div
            key={u._id}
            style={{
              marginBottom: "15px",
              padding: "10px",
              background: "#020617",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{u.email}</strong> — {u.role}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => changeRole(u._id)}
                style={{
                  background: "#22c55e",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Change Role
              </button>

              <button
                onClick={() => deleteUser(u._id)}
                style={{
                  background: "#ef4444",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </Layout>
  );
}