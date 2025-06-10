import React, { useState } from "react";

const AuthForm = ({ onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [authForm, setAuthForm] = useState({
    name: "",
    gender: "",
    country: "",
    state: "",
    postalCode: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthForm((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error on input
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoginView) {
      // Signup validation
      if (authForm.password !== authForm.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (!authForm.name || !authForm.gender || !authForm.country || !authForm.state || !authForm.postalCode) {
        setError("All fields are required.");
        return;
      }
    }

    // Dummy success trigger
    onLoginSuccess();
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError(""); // Clear errors when toggling
    setAuthForm({
      name: "",
      gender: "",
      country: "",
      state: "",
      postalCode: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isLoginView ? "Employee Login" : "Create Account"}</h2>

        {!isLoginView && (
          <>
            <div className="form-group">
              <label>Full Name*</label>
              <input
                type="text"
                name="name"
                value={authForm.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Gender*</label>
              <select
                name="gender"
                value={authForm.gender}
                onChange={handleChange}
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
                onChange={handleChange}
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
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Postal Code*</label>
                <input
                  type="text"
                  name="postalCode"
                  value={authForm.postalCode}
                  onChange={handleChange}
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
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password*</label>
          <input
            type="password"
            name="password"
            value={authForm.password}
            onChange={handleChange}
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
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
        )}

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="auth-btn">
          {isLoginView ? "Login" : "Sign Up"}
        </button>

        <p className="auth-toggle">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={toggleView}>
            {isLoginView ? "Sign up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
