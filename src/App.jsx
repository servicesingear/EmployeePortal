import React, { useState } from "react";
import AuthForm from "./components/AuthForm/AuthForm";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import EmployeeProfile from "./components/EmployeeProfile/EmployeeProfile";
import LeaveApplication from "./components/LeaveApplication/LeaveApplication";
import TravelRequest from "./components/TravelRequest/TravelRequest";
import SalarySlips from "./components/SalarySlips/SalarySlips";
import TrainingCourses from "./components/TrainingCourses/TrainingCourses";
import AuthForm from "./components/AuthForm/AuthForm";
import "./portalStyles.css";
  

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    name: "John Doe",
    employeeId: "EMP123",
    department: "Engineering",
    position: "Developer",
    email: "john.doe@example.com",
    phone: "1234567890",
    joinDate: "2023-01-01",
    address: "123 Street, City",
  });

  // Dummy login/logout handlers
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowAdminPanel(false);
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <AuthForm onLogin={handleLogin} />
      ) : (
        <div className="employee-portal">
          <header className="portal-header">
            <h1>GEAR SERVICES EMPLOYEE PORTAL</h1>
            <div className="header-actions">
              {isAdmin ? (
                <button
                  onClick={() => setShowAdminPanel(!showAdminPanel)}
                  className="admin-btn"
                >
                  {showAdminPanel ? "Hide Admin Panel" : "Admin Panel"}
                </button>
              ) : (
                <button className="request-admin-btn">Request Admin Access</button>
              )}
              <button className="export-btn">Export My Details</button>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </header>

          {showAdminPanel && isAdmin && <AdminPanel />}

          <nav className="portal-nav">
            <button
              onClick={() => setActiveTab("profile")}
              className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
            >
              Profile Details
            </button>
            <button
              onClick={() => setActiveTab("leave")}
              className={`nav-link ${activeTab === "leave" ? "active" : ""}`}
            >
              Leave Application
            </button>
            <button
              onClick={() => setActiveTab("travel")}
              className={`nav-link ${activeTab === "travel" ? "active" : ""}`}
            >
              Travel Allowance
            </button>
            <button
              onClick={() => setActiveTab("salary")}
              className={`nav-link ${activeTab === "salary" ? "active" : ""}`}
            >
              Salary Slips
            </button>
            <button
              onClick={() => setActiveTab("training")}
              className={`nav-link ${activeTab === "training" ? "active" : ""}`}
            >
              Training New Courses
            </button>
          </nav>

          <main className="portal-content">
            {activeTab === "profile" && (
              <EmployeeProfile profile={profile} setProfile={setProfile} />
            )}
            {activeTab === "leave" && <LeaveApplication />}
            {activeTab === "travel" && <TravelRequest />}
            {activeTab === "salary" && <SalarySlips />}
            {activeTab === "training" && <TrainingCourses />}
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
