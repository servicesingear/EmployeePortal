import React, { useState } from "react";

const LeaveApplication = () => {
  const [leaveForm, setLeaveForm] = useState({
    startDate: "",
    endDate: "",
    leaveType: "casual",
    reason: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleLeaveSubmit = (e) => {
    e.preventDefault();

    const { startDate, endDate, reason } = leaveForm;

    // Validation
    if (new Date(startDate) > new Date(endDate)) {
      alert("End date must be after or same as start date.");
      return;
    }

    if (reason.trim().length < 5) {
      alert("Please provide a more detailed reason (at least 5 characters).");
      return;
    }

    alert(`✅ Leave Application Submitted!
📅 ${startDate} to ${endDate}
📝 Reason: ${reason}
📂 Type: ${leaveForm.leaveType}`);

    setLeaveForm({
      startDate: "",
      endDate: "",
      leaveType: "casual",
      reason: "",
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000); // reset message
  };

  return (
    <section className="portal-section" id="leave">
      <h2>Leave Application</h2>

      {submitted && (
        <div className="success-message">Your application was submitted!</div>
      )}

      <form className="leave-form" onSubmit={handleLeaveSubmit}>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={leaveForm.startDate}
            onChange={(e) =>
              setLeaveForm({ ...leaveForm, startDate: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            value={leaveForm.endDate}
            onChange={(e) =>
              setLeaveForm({ ...leaveForm, endDate: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Leave Type</label>
          <select
            value={leaveForm.leaveType}
            onChange={(e) =>
              setLeaveForm({ ...leaveForm, leaveType: e.target.value })
            }
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
            onChange={(e) =>
              setLeaveForm({ ...leaveForm, reason: e.target.value })
            }
            placeholder="Describe your reason for leave"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Application
        </button>
      </form>
    </section>
  );
};

export default LeaveApplication;
