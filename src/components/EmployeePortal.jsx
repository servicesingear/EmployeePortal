import React, { useState, useEffect } from "react";

import AuthForm from "./components/AuthForm";
import AdminPanel from "./components/AdminPanel";
import EmployeeProfile from "./components/EmployeeProfile";
import LeaveApplication from "./components/LeaveApplication";
import TravelRequest from "./components/TravelRequest";
import SalarySlips from "./components/SalarySlips";
import TrainingCourses from "./components/TrainingCourses";
import PortalNav from "./components/PortalNav";

const EmployeePortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminRequestSent, setAdminRequestSent] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    name: "John Doe",
    employeeId: "EMP123",
    department: "Engineering",
    position: "Developer",
    email: "john@example.com",
    phone: "1234567890",
    joinDate: "2023-01-01",
    address: "123 Main St, City",
  });

  // Load login/admin state from localStorage on mount
  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn") === "true";
    const savedAdmin = localStorage.getItem("isAdmin") === "true";

    if (savedLogin) setIsLoggedIn(true);
    if (savedAdmin) setIsAdmin(true);
  }, []);

  // Update localStorage when login/admin state changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("isAdmin", isAdmin);
  }, [isLoggedIn, isAdmin]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setShowAdminPanel(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
  };

  const toggleAdminPanel = () => {
    setShowAdminPanel((prev) => !prev);
  };

  const handleAdminAccessRequest = () => {
    setAdminRequestSent(true);
    // Simulate approval in 3 seconds (for demo)
    setTimeout(() => {
      alert("Admin access approved!");
      setIsAdmin(true);
    }, 3000);
  };

  const handleExportDetails = () => {
    const dataStr = JSON.stringify(profile, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${profile.employeeId}_details.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isLoggedIn) {
    return <AuthForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="employee-portal">
      <header className="portal-header">
        <h1>GEAR SERVICES EMPLOYEE PORTAL</h1>
        <div className="header-actions">
          {isAdmin ? (
            <button onClick={toggleAdminPanel} className="admin-btn">
              {showAdminPanel ? "Hide Admin Panel" : "Admin Panel"}
            </button>
          ) : (
            <button
              className="request-admin-btn"
              onClick={handleAdminAccessRequest}
              disabled={adminRequestSent}
            >
              {adminRequestSent ? "Request Sent" : "Request Admin Access"}
            </button>
          )}
          <button className="export-btn" onClick={handleExportDetails}>
            Export My Details
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      {showAdminPanel && isAdmin && <AdminPanel />}

      <PortalNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "profile" && (
        <EmployeeProfile profile={profile} setProfile={setProfile} />
      )}
      {activeTab === "leave" && <LeaveApplication />}
      {activeTab === "travel" && <TravelRequest />}
      {activeTab === "salary" && <SalarySlips />}
      {activeTab === "training" && <TrainingCourses />}
    </div>
  );
};

export default EmployeePortal;
