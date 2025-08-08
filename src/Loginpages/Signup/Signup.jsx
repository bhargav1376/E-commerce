import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import signupimg from '../../Images/Signup.jpg';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    refId: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [errors, setErrors] = useState({});

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear errors when user starts typing
    setErrors({ ...errors, [name]: '' });
  };

  const validatePassword = (password) => {
    const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
    return pattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phoneNumber, password, confirmPassword } = formData;
    let tempErrors = {};

    if (!name.trim()) tempErrors.name = 'Name is required';
    else if (name.length < 3) tempErrors.name = 'Name must be at least 3 characters long';
    if (!email.trim()) tempErrors.email = 'Email is required';
    if (!phoneNumber.trim()) tempErrors.phoneNumber = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(phoneNumber)) tempErrors.phoneNumber = 'Phone number must be 10 digits';
    if (!validatePassword(password)) tempErrors.password = 'Password must contain 1 capital, 1 special character, 1 number, and be at least 8 characters long.';
    if (password !== confirmPassword) tempErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    try {
      const date = new Date().toISOString().slice(0, 10);
      const refId = '';
      const res = await axios.post('http://localhost:4030/signup', {
        ...formData,
        refId,
        date,
      });

      showToast('✅ Successfully Registered! Redirecting to Login...', 'success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Something went wrong';
      if (errorMsg.toLowerCase().includes('email')) {
        setErrors((prev) => ({ ...prev, email: errorMsg }));
      } else if (errorMsg.toLowerCase().includes('phone')) {
        setErrors((prev) => ({ ...prev, phoneNumber: errorMsg }));
      } else {
        showToast(errorMsg, 'error');
      }
    }
  };

  return (
    <div className='signup-container-wrapper-outer'>
      <div className='signup-container'>
        <div className='signup-image-wrapper'>
          <div className='signup-container-wrapper-Img'>
            <img src={signupimg} alt="Signup Illustration" className='signup-image' />
          </div>
          <div className='signup-container-wrapper-text'>
            <h1 className='signup-header'>Astrolite Tech Solutions</h1>
          </div>
        </div>
        <div className="signup-card">
          <h2 className="signup-title">Create an Account</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" required />
              {errors.name && <span className="input-error">{errors.name}</span>}
            </div>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email ID" required />
              {errors.email && <span className="input-error">{errors.email}</span>}
            </div>
            <div className="input-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter Phone Number" required />
              {errors.phoneNumber && <span className="input-error">{errors.phoneNumber}</span>}
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" required />
                <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {errors.password && <span className="input-error">{errors.password}</span>}
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-container">
                <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Enter Confirm Password" required />
                <button type="button" className="password-toggle-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {errors.confirmPassword && <span className="input-error">{errors.confirmPassword}</span>}
            </div>
            <button type="submit" className="signup-btn">Create Account</button>
          </form>
          <Link to="/login" className="signup-login-link">Already have an account? Login</Link>
        </div>
      </div>

      {/* Popup message (not toast) */}
      {toast.message && (
        <div className={`popup-message ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Signup;
