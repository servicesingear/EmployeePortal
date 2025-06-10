import React, { useState, useEffect } from 'react';
import './App.css';

const EmployeePortal = () => {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminApprovalRequests, setAdminApprovalRequests] = useState([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [authForm, setAuthForm] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    country: '',
    state: '',
    postalCode: ''
  });

  // Portal state
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: 'LakshmiDurga',
    employeeId: 'EMP12345',
    department: 'Engineering',
    position: 'Software Developer',
    email: 'lakshmidurga@company.com',
    phone: '+1 (555) 123-4567',
    joinDate: '2020-05-15',
    address: '123 Main St, Cityville, State 12345'
  });
  
  const [leaveForm, setLeaveForm] = useState({
    startDate: '',
    endDate: '',
    leaveType: 'casual',
    reason: ''
  });
  
  const [travelForm, setTravelForm] = useState({
    destination: '',
    purpose: '',
    startDate: '',
    endDate: '',
    estimatedCost: '',
    additionalDetails: ''
  });
  
  const [salarySlips] = useState([
    { month: 'June 2025', amount: '50,000.00', file: 'salary_june_2025.pdf' },
    { month: 'May 2025', amount: '45,250.00', file: 'salary_May_2025.pdf' },
    { month: 'April 2025', amount: '65,750.00', file: 'salary_October_2025.pdf' }
  ]);
  
  const [trainingCourses, setTrainingCourses] = useState([
    { id: 1, title: 'Advanced React Development', duration: '3 weeks', status: 'Completed' },
    { id: 2, title: 'Cloud Architecture Fundamentals', duration: '6 weeks', status: 'available' },
    { id: 3, title: 'Leadership Skills Workshop', duration: '15 day', status: 'upcoming' }
  ]);

  // Check if user is admin on component mount
  useEffect(() => {
    // For demo purposes, we'll check if email contains 'admin'
    if (authForm.email.includes('admin')) {
      setIsAdmin(true);
    }
  }, [authForm.email]);

  // Auth handlers
  const handleAuthInputChange = (e) => {
    const { name, value } = e.target;
    setAuthForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Basic validation
    if (authForm.email && authForm.password) {
      setIsLoggedIn(true);
      // For demo, if email contains 'admin', set as admin
      if (authForm.email.includes('admin')) {
        setIsAdmin(true);
      }
    } else {
      alert('Please enter both email and password');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Validation
    if (authForm.password !== authForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!authForm.firstName || !authForm.lastName || !authForm.email || !authForm.password || 
        !authForm.contactNumber || !authForm.dateOfBirth || !authForm.gender || 
        !authForm.country || !authForm.state || !authForm.postalCode) {
      alert('Please fill all required fields');
      return;
    }
    
    setIsLoggedIn(true);
    // Set the profile from signup form
    setProfile(prev => ({ 
      ...prev, 
      name: `${authForm.firstName} ${authForm.lastName}`,
      email: authForm.email,
      phone: authForm.contactNumber
    }));
    
    // For demo purposes, we'll just log the data
    console.log('User signed up with:', authForm);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setShowAdminPanel(false);
    setAuthForm({ 
      firstName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
      gender: '',
      country: '',
      state: '',
      postalCode: ''
    });
  };

  // Request admin access
  const requestAdminAccess = () => {
    const request = {
      employeeId: profile.employeeId,
      employeeName: profile.name,
      department: profile.department,
      requestDate: new Date().toLocaleDateString(),
      status: 'pending'
    };
    
    // In a real app, this would be an API call to save the request
    setAdminApprovalRequests([...adminApprovalRequests, request]);
    alert('Admin access request submitted for approval');
  };

  // Approve admin access (for admin users)
  const approveAdminAccess = (employeeId) => {
    // In a real app, this would update the user's role in the backend
    setAdminApprovalRequests(prev => 
      prev.map(req => 
        req.employeeId === employeeId ? { ...req, status: 'approved' } : req
      )
    );
    alert(`Admin access approved for employee ${employeeId}`);
  };

  // Reject admin access (for admin users)
  const rejectAdminAccess = (employeeId) => {
    setAdminApprovalRequests(prev => 
      prev.map(req => 
        req.employeeId === employeeId ? { ...req, status: 'rejected' } : req
      )
    );
    alert(`Admin access rejected for employee ${employeeId}`);
  };

  // View all employee data (admin function)
  const viewAllEmployeeData = () => {
    // In a real app, this would fetch all employee data from the backend
    const allEmployeeData = [
      {
        employeeId: 'EMP12345',
        name: 'LakshmiDurga',
        department: 'Engineering',
        position: 'Software Developer',
        email: 'lakshmidurga@company.com',
        phone: '+1 (555) 123-4567',
        joinDate: '2020-05-15'
      },
      {
        employeeId: 'EMP67890',
        name: 'John Doe',
        department: 'Marketing',
        position: 'Marketing Manager',
        email: 'john@company.com',
        phone: '+1 (555) 987-6543',
        joinDate: '2019-11-20'
      },
      {
        employeeId: 'EMP54321',
        name: 'Jane Smith',
        department: 'HR',
        position: 'HR Specialist',
        email: 'jane@company.com',
        phone: '+1 (555) 456-7890',
        joinDate: '2021-02-10'
      }
    ];
    
    console.log('All employee data:', allEmployeeData);
    alert(`Viewing data for ${allEmployeeData.length} employees. Check console for details.`);
  };

  // Download salary slip with proper employee details
  const handleDownloadSalarySlip = (file) => {
    // Get the month from the filename
    const month = file.replace('salary_', '').replace('.pdf', '').replace('_', ' ');
    
    // Create a more detailed PDF content with employee information
    const dummyPdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 500 >>
stream
BT
/F1 16 Tf
72 750 Td
(COMPANY NAME) Tj
ET
BT
/F1 14 Tf
72 720 Td
(Salary Slip for ${month}) Tj
ET
BT
/F1 12 Tf
72 690 Td
(Employee Name: ${profile.name}) Tj
ET
BT
/F1 12 Tf
72 660 Td
(Employee ID: ${profile.employeeId}) Tj
ET
BT
/F1 12 Tf
72 630 Td
(Department: ${profile.department}) Tj
ET
BT
/F1 12 Tf
72 600 Td
(Position: ${profile.position}) Tj
ET
BT
/F1 12 Tf
72 570 Td
----------------------------------------) Tj
ET
BT
/F1 12 Tf
72 540 Td
(Basic Salary: 4,500.00) Tj
ET
BT
/F1 12 Tf
72 510 Td
(House Allowance: 500.00) Tj
ET
BT
/F1 12 Tf
72 480 Td
(Transport Allowance: 250.00) Tj
ET
BT
/F1 12 Tf
72 450 Td
----------------------------------------) Tj
ET
BT
/F1 14 Tf
72 420 Td
(Gross Salary: 5,250.00) Tj
ET
BT
/F1 12 Tf
72 390 Td
(Tax Deduction: 250.00) Tj
ET
BT
/F1 12 Tf
72 360 Td
(PF Contribution: 200.00) Tj
ET
BT
/F1 12 Tf
72 330 Td
----------------------------------------) Tj
ET
BT
/F1 16 Tf
72 300 Td
(Net Salary: 4,800.00) Tj
ET
BT
/F1 10 Tf
72 270 Td
(This is a system generated document and does not require signature) Tj
ET
BT
/F1 10 Tf
72 240 Td
(Issued on: ${new Date().toLocaleDateString()}) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000015 00000 n 
0000000062 00000 n 
0000000115 00000 n 
0000000206 00000 n 
0000000241 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
800
%%EOF`;

    const blob = new Blob([dummyPdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle course enrollment
  const handleEnrollCourse = (courseId) => {
    setTrainingCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId ? { ...course, status: 'enrolled' } : course
      )
    );
    alert('You have successfully enrolled in the course!');
  };

  // Export user details to CSV
  const exportUserDetailsToCSV = () => {
    // Prepare CSV content with proper headers and values
    const headers = [
      'First Name',
      'Last Name',
      'Contact Number',
      'Email',
      'Date of Birth',
      'Gender',
      'Country',
      'State',
      'Postal Code'
    ].join(',');
    
    const values = [
      `"${authForm.firstName}"`,
      `"${authForm.lastName}"`,
      `"${authForm.contactNumber}"`,
      `"${authForm.email}"`,
      `"${authForm.dateOfBirth}"`,
      `"${authForm.gender}"`,
      `"${authForm.country}"`,
      `"${authForm.state}"`,
      `"${authForm.postalCode}"`
    ].join(',');
    
    const csvContent = `${headers}\n${values}`;
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'user_details.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Profile handlers
  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditingProfile(false);
    alert('Profile updated successfully!');
  };

  // Form handlers
  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    alert('Leave application submitted successfully!');
    setLeaveForm({
      startDate: '',
      endDate: '',
      leaveType: 'casual',
      reason: ''
    });
  };

  const handleTravelSubmit = (e) => {
    e.preventDefault();
    alert('Travel request submitted successfully!');
    setTravelForm({
      destination: '',
      purpose: '',
      startDate: '',
      endDate: '',
      estimatedCost: '',
      additionalDetails: ''
    });
  };

  // Render login/signup form if not logged in
  if (!isLoggedIn) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h2>{isLoginView ? 'Employee Login' : 'Sign Up'}</h2>
          <form onSubmit={isLoginView ? handleLogin : handleSignup}>
            {!isLoginView && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name*</label>
                    <input
                      type="text"
                      name="firstName"
                      value={authForm.firstName}
                      onChange={handleAuthInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name*</label>
                    <input
                      type="text"
                      name="lastName"
                      value={authForm.lastName}
                      onChange={handleAuthInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Contact Number*</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={authForm.contactNumber}
                    onChange={handleAuthInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Date of Birth*</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={authForm.dateOfBirth}
                    onChange={handleAuthInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Gender*</label>
                  <select
                    name="gender"
                    value={authForm.gender}
                    onChange={handleAuthInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Country*</label>
                  <input
                    type="text"
                    name="country"
                    value={authForm.country}
                    onChange={handleAuthInputChange}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>State*</label>
                    <input
                      type="text"
                      name="state"
                      value={authForm.state}
                      onChange={handleAuthInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Postal Code*</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={authForm.postalCode}
                      onChange={handleAuthInputChange}
                      required
                    />
                  </div>
                </div>
              </>
            )}
            
            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                name="email"
                value={authForm.email}
                onChange={handleAuthInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password*</label>
              <input
                type="password"
                name="password"
                value={authForm.password}
                onChange={handleAuthInputChange}
                required
                minLength="6"
              />
            </div>
            
            {!isLoginView && (
              <div className="form-group">
                <label>Confirm Password*</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={authForm.confirmPassword}
                  onChange={handleAuthInputChange}
                  required
                  minLength="6"
                />
              </div>
            )}
            
            <button type="submit" className="auth-btn">
              {isLoginView ? 'Login' : 'Sign Up'}
            </button>
            <p className="auth-toggle">
              {isLoginView ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => setIsLoginView(!isLoginView)}>
                {isLoginView ? 'Sign up' : 'Login'}
              </span>
            </p>
          </form>
        </div>
      </div>
    );
  }

  // Render portal if logged in
  return (
    <div className="employee-portal">
      <header className="portal-header">
        <h1> GEAR SERVICES EMPLOYEE PORTAL</h1>
        <div className="header-actions">
          {isAdmin && (
            <button 
              onClick={() => setShowAdminPanel(!showAdminPanel)} 
              className="admin-btn"
            >
              {showAdminPanel ? 'Hide Admin Panel' : 'Admin Panel'}
            </button>
          )}
          {!isAdmin && (
            <button 
              onClick={requestAdminAccess} 
              className="request-admin-btn"
            >
              Request Admin Access
            </button>
          )}
          <button onClick={exportUserDetailsToCSV} className="export-btn">
            Export My Details
          </button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>
      
      {showAdminPanel && isAdmin && (
        <div className="admin-panel">
          <h2>Admin Dashboard</h2>
          
          <div className="admin-section">
            <h3>Admin Access Requests</h3>
            {adminApprovalRequests.length > 0 ? (
              <table className="admin-requests-table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Request Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminApprovalRequests.map((request, index) => (
                    <tr key={index}>
                      <td>{request.employeeId}</td>
                      <td>{request.employeeName}</td>
                      <td>{request.department}</td>
                      <td>{request.requestDate}</td>
                      <td className={`status-${request.status}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </td>
                      <td>
                        {request.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => approveAdminAccess(request.employeeId)}
                              className="approve-btn"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => rejectAdminAccess(request.employeeId)}
                              className="reject-btn"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No pending admin access requests</p>
            )}
          </div>
          
          <div className="admin-section">
            <h3>Employee Data Management</h3>
            <button 
              onClick={viewAllEmployeeData}
              className="view-data-btn"
            >
              View All Employee Data
            </button>
            <div className="employee-stats">
              <p>Total Employees: 3</p>
              <p>Departments: Engineering, Marketing, HR</p>
            </div>
          </div>
        </div>
      )}
      
      <nav className="portal-nav">
        <button onClick={() => setActiveTab('profile')} className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}>
          Profile Details 
        </button>
        <button onClick={() => setActiveTab('leave')} className={`nav-link ${activeTab === 'leave' ? 'active' : ''}`}>
          Leave Application
        </button>
        <button onClick={() => setActiveTab('travel')} className={`nav-link ${activeTab === 'travel' ? 'active' : ''}`}>
          Travel Allowance
        </button>
        <button onClick={() => setActiveTab('salary')} className={`nav-link ${activeTab === 'salary' ? 'active' : ''}`}>
          Salary Slips
        </button>
        <button onClick={() => setActiveTab('training')} className={`nav-link ${activeTab === 'training' ? 'active' : ''}`}>
          Training New Courses
        </button>
      </nav>
      
      {activeTab === 'profile' && (
        <section className="portal-section" id="profile">
          <div className="section-header">
            <h2>Profile Details</h2>
            {!isEditingProfile && (
              <button onClick={() => setIsEditingProfile(true)} className="edit-btn">
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
                    value={profile.name}
                    onChange={handleProfileInputChange}
                    className="detail-input"
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
                    value={profile.department}
                    onChange={handleProfileInputChange}
                    className="detail-input"
                  />
                </div>
                <div className="detail-row">
                  <label className="detail-label">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={profile.position}
                    onChange={handleProfileInputChange}
                    className="detail-input"
                  />
                </div>
                <div className="detail-row">
                  <label className="detail-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileInputChange}
                    className="detail-input"
                  />
                </div>
                <div className="detail-row">
                  <label className="detail-label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileInputChange}
                    className="detail-input"
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
                    value={profile.address}
                    onChange={handleProfileInputChange}
                    className="detail-textarea"
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-btn">Save Changes</button>
                  <button type="button" onClick={() => setIsEditingProfile(false)} className="cancel-btn">
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
      )}
      
      {activeTab === 'leave' && (
        <section className="portal-section" id="leave">
          <h2>Leave Application</h2>
          <form className="leave-form" onSubmit={handleLeaveSubmit}>
            <div className="form-group">
              <label>Start Date</label>
              <input 
                type="date" 
                value={leaveForm.startDate}
                onChange={(e) => setLeaveForm({...leaveForm, startDate: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input 
                type="date" 
                value={leaveForm.endDate}
                onChange={(e) => setLeaveForm({...leaveForm, endDate: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Leave Type</label>
              <select 
                value={leaveForm.leaveType}
                onChange={(e) => setLeaveForm({...leaveForm, leaveType: e.target.value})}
              >
                <option value="casual">Casual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="vacation">Vacation</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Reason</label>
              <textarea 
                value={leaveForm.reason}
                onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Submit Application</button>
          </form>
        </section>
      )}
      
      {activeTab === 'travel' && (
        <section className="portal-section" id="travel">
          <h2>Travel Request</h2>
          <form className="travel-form" onSubmit={handleTravelSubmit}>
            <div className="form-group">
              <label>Destination</label>
              <input 
                type="text" 
                value={travelForm.destination}
                onChange={(e) => setTravelForm({...travelForm, destination: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Purpose</label>
              <input 
                type="text" 
                value={travelForm.purpose}
                onChange={(e) => setTravelForm({...travelForm, purpose: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input 
                type="date" 
                value={travelForm.startDate}
                onChange={(e) => setTravelForm({...travelForm, startDate: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input 
                type="date" 
                value={travelForm.endDate}
                onChange={(e) => setTravelForm({...travelForm, endDate: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Estimated Cost</label>
              <input 
                type="number" 
                value={travelForm.estimatedCost}
                onChange={(e) => setTravelForm({...travelForm, estimatedCost: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Additional Details</label>
              <textarea 
                value={travelForm.additionalDetails}
                onChange={(e) => setTravelForm({...travelForm, additionalDetails: e.target.value})}
              />
            </div>
            <button type="submit" className="submit-btn">Submit Request</button>
          </form>
        </section>
      )}
      
      {activeTab === 'salary' && (
        <section className="portal-section" id="salary">
          <h2>Salary Slips</h2>
          <div className="slips-list">
            {salarySlips.map((slip, index) => (
              <div key={index} className="slip-item">
                <div className="slip-info">
                  <span className="slip-month">{slip.month}</span>
                  <span className="slip-amount">{slip.amount}</span>
                </div>
                <button 
                  className="download-btn"
                  onClick={() => handleDownloadSalarySlip(slip.file)}
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {activeTab === 'training' && (
        <section className="portal-section" id="training">
          <h2>Training New Courses</h2>
          <div className="courses-list">
            {trainingCourses.map((course) => (
              <div key={course.id} className="course-item">
                <div className="course-info">
                  <span className="course-title">{course.title}</span>
                  <div className="course-details">
                    <span className="course-duration">{course.duration}</span>
                    <span className={`course-status ${course.status}`}>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </span>
                  </div>
                </div>
                {course.status === 'available' ? (
                  <button 
                    className="enroll-btn"
                    onClick={() => handleEnrollCourse(course.id)}
                  >
                    Enroll
                  </button>
                ) : course.status === 'enrolled' ? (
                  <span className="enrolled-label">Enrolled</span>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default EmployeePortal;
