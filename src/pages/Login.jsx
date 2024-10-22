import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../apis/auth';

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login({ userEmail, userPassword });
      console.log('Login successful', response);
      // Store the token in localStorage or a more secure storage method
      localStorage.setItem('token', response.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.error || 'An error occurred during login');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <div className="switch-form">
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;