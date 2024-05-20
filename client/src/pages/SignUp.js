import React, { useState } from 'react';
import { FaRegUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import '../styles/SignUp.scss';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    photo: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    // Add your signup logic here
  };

  return (
    <div className="signup-page d-flex justify-content-center align-items-center mt-2">
      <div className="card p-4 shadow-lg">
        <div className="text-center ">
          <h3>Sign Up</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-3">
            {formData.photo ? (
              <img 
                src={URL.createObjectURL(formData.photo)} 
                alt="User Avatar" 
                className="rounded-circle" 
                width={100} 
                height={100} 
              />
            ) : (
              <FaRegUserCircle size={50} className="mb-3" />
            )}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="photo-upload"
                style={{ display: 'none' }}
              />
              <label htmlFor="photo-upload" className="btn btn-outline-primary">
                Upload Photo
              </label>
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
        <div className="text-center mt-3">
          <span>Already have an account? </span>
          <Link to="/login" className="text-primary">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
