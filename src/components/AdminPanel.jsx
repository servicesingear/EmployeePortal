import React, { useState } from "react";

const AdminPanel = () => {
  const [requests, setRequests] = useState([
    {
      id: "EMP001",
      name: "Alice Johnson",
      department: "Marketing",
      date: "2025-05-01",
      status: "pending",
    },
    {
      id: "EMP002",
      name: "Bob Smith",
      department: "Engineering",
      date: "2025-05-02",
      status: "approved",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: newStatus } : r
      )
    );
  };

  return (
    <div className="admin-panel">
      <h2>Admin Dashboard</h2>

      <section className="admin-section">
        <h3>Admin Access Requests</h3>
        {requests.length > 0 ? (
          <table className="requests-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>{r.department}</td>
                  <td>{r.date}</td>
                  <td className={`status ${r.status}`}>
                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </td>
                  <td>
                    {r.status === "pending" ? (
                      <>
                        <button
                          className="btn approve"
                          onClick={() => updateStatus(r.id, "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn reject"
                          onClick={() => updateStatus(r.id, "rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="no-action">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No admin access requests available.</p>
        )}
      </section>

      <section className="admin-section">
        <h3>Employee Overview</h3>
        <button className="btn view-data">View All Employees</button>
        <div className="employee-stats">
          <p><strong>Total Employees:</strong> 3</p>
          <p><strong>Departments:</strong> Engineering, Marketing, HR</p>
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
