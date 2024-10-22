import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../apis/auth';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRole, setUserRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await signup({ userName, userEmail, userPassword, userRole });
      console.log('Signup successful', response);
      navigate('/login');
    } catch (err) {
      setError(err.error || 'An error occurred during signup');
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userEmail">Email:</label>
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userPassword">Password:</label>
          <input
            type="password"
            id="userPassword"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userRole">Role:</label>
          <input
            type="text"
            id="userRole"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <div className="switch-form">
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;