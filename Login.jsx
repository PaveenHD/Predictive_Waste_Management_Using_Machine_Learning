// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css' 

const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const dummyEmail = 'paveenkumar@gmail.com';
  const dummyPassword = 'paveen@123';

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === dummyEmail && password === dummyPassword) {
      setMessage('Login successful!');
      setTimeout(() => navigate('/dashboard'), 1000); 
    } else {
      setMessage('Invalid email or password.');
    }
  };

  return (
    <div className="logo">
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
  );
};

export default Login;
