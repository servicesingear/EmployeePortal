import React from "react";

const tabs = [
  { id: "profile", label: "Profile Details" },
  { id: "leave", label: "Leave Application" },
  { id: "travel", label: "Travel Request" },
  { id: "salary", label: "Salary Slips" },
  { id: "training", label: "Training Courses" },
];

const PortalNav = ({ activeTab, setActiveTab }) => {
  const handleKeyDown = (e, tabId) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveTab(tabId);
    }
  };

  return (
    <nav className="portal-nav" role="tablist" aria-label="Employee Portal Navigation">
      <ul>
        {tabs.map(({ id, label }) => (
          <li
            key={id}
            role="tab"
            tabIndex={0}
            aria-selected={activeTab === id}
            className={activeTab === id ? "active" : ""}
            onClick={() => setActiveTab(id)}
            onKeyDown={(e) => handleKeyDown(e, id)}
            style={{ cursor: "pointer" }}
          >
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PortalNav;
