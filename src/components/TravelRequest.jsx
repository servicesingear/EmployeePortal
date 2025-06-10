import React, { useState } from "react";

const TravelRequest = () => {
  const [travelForm, setTravelForm] = useState({
    destination: "",
    purpose: "",
    startDate: "",
    endDate: "",
    estimatedCost: "",
    additionalDetails: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (travelForm.endDate && travelForm.startDate && travelForm.endDate < travelForm.startDate) {
      newErrors.endDate = "End Date cannot be before Start Date.";
    }
    if (travelForm.estimatedCost && travelForm.estimatedCost < 0) {
      newErrors.estimatedCost = "Estimated Cost cannot be negative.";
    }
    return newErrors;
  };

  const handleTravelSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert("Travel Request Submitted!");
    setTravelForm({
      destination: "",
      purpose: "",
      startDate: "",
      endDate: "",
      estimatedCost: "",
      additionalDetails: "",
    });
    setErrors({});
  };

  return (
    <section className="portal-section" id="travel">
      <h2>Travel Request</h2>
      <form className="travel-form" onSubmit={handleTravelSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="destination">Destination</label>
          <input
            id="destination"
            type="text"
            value={travelForm.destination}
            onChange={(e) =>
              setTravelForm({ ...travelForm, destination: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="purpose">Purpose</label>
          <input
            id="purpose"
            type="text"
            value={travelForm.purpose}
            onChange={(e) =>
              setTravelForm({ ...travelForm, purpose: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            type="date"
            value={travelForm.startDate}
            onChange={(e) =>
              setTravelForm({ ...travelForm, startDate: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            type="date"
            value={travelForm.endDate}
            onChange={(e) =>
              setTravelForm({ ...travelForm, endDate: e.target.value })
            }
            required
          />
          {errors.endDate && (
            <p className="error-message" style={{ color: "red" }}>{errors.endDate}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="estimatedCost">Estimated Cost</label>
          <input
            id="estimatedCost"
            type="number"
            min="0"
            value={travelForm.estimatedCost}
            onChange={(e) =>
              setTravelForm({ ...travelForm, estimatedCost: e.target.value })
            }
            required
          />
          {errors.estimatedCost && (
            <p className="error-message" style={{ color: "red" }}>{errors.estimatedCost}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="additionalDetails">Additional Details</label>
          <textarea
            id="additionalDetails"
            value={travelForm.additionalDetails}
            onChange={(e) =>
              setTravelForm({ ...travelForm, additionalDetails: e.target.value })
            }
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit Request
        </button>
      </form>
    </section>
  );
};

export default TravelRequest;
