import React, { useState } from "react";

const EmployeeProfile = ({ profile, setProfile }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = ["name", "department", "position", "email", "phone", "address"];
    for (const field of requiredFields) {
      if (!tempProfile[field].trim()) {
        alert(`Please fill out the ${field} field.`);
        return;
      }
    }

    setProfile(tempProfile);
    setIsEditingProfile(false);
    alert("Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    setTempProfile(profile); // reset changes
    setIsEditingProfile(false);
  };

  return (
    <section className="portal-section" id="profile">
      <div className="section-header">
        <h2>Profile Details</h2>
        {!isEditingProfile && (
          <button
            onClick={() => setIsEditingProfile(true)}
            className="edit-btn"
          >
            Edit Profile
          </button>
        )}
      </div>

      {isEditingProfile ? (
        <form className="profile-form" onSubmit={handleSaveProfile}>
          <div className="profile-details edit-mode">
            <div className="detail-row">
              <label className="detail-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={tempProfile.name}
                onChange={handleProfileInputChange}
                className="detail-input"
                required
              />
            </div>

            <div className="detail-row">
              <label className="detail-label">Employee ID</label>
              <span className="detail-value">{profile.employeeId}</span>
            </div>

            <div className="detail-row">
              <label className="detail-label">Department</label>
              <input
                type="text"
                name="department"
                value={tempProfile.department}
                onChange={handleProfileInputChange}
                className="detail-input"
                required
              />
            </div>

            <div className="detail-row">
              <label className="detail-label">Position</label>
              <input
                type="text"
                name="position"
                value={tempProfile.position}
                onChange={handleProfileInputChange}
                className="detail-input"
                required
              />
            </div>

            <div className="detail-row">
              <label className="detail-label">Email</label>
              <input
                type="email"
                name="email"
                value={tempProfile.email}
                onChange={handleProfileInputChange}
                className="detail-input"
                required
              />
            </div>

            <div className="detail-row">
              <label className="detail-label">Phone</label>
              <input
                type="tel"
                name="phone"
                value={tempProfile.phone}
                onChange={handleProfileInputChange}
                className="detail-input"
                required
              />
            </div>

            <div className="detail-row">
              <label className="detail-label">Join Date</label>
              <span className="detail-value">{profile.joinDate}</span>
            </div>

            <div className="detail-row">
              <label className="detail-label">Address</label>
              <textarea
                name="address"
                value={tempProfile.address}
                onChange={handleProfileInputChange}
                className="detail-textarea"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <div className="detail-row">
            <span className="detail-label">Full Name</span>
            <span className="detail-value">{profile.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Employee ID</span>
            <span className="detail-value">{profile.employeeId}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Department</span>
            <span className="detail-value">{profile.department}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Position</span>
            <span className="detail-value">{profile.position}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email</span>
            <span className="detail-value">{profile.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Phone</span>
            <span className="detail-value">{profile.phone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Join Date</span>
            <span className="detail-value">{profile.joinDate}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Address</span>
            <span className="detail-value">{profile.address}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default EmployeeProfile;
