import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Set the base URL for Axios (use try/catch for error handling)
try {
  axios.defaults.baseURL = 'http://localhost:4000/api/v1'; // Adjust this to match your API endpoint.
  axios.defaults.withCredentials = true; // Set withCredentials globally
} catch (error) {
  console.error('Failed to set Axios base URL:', error);
}

function SignIn() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post('/login', { user }, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      // Assuming a successful response contains a user session or token
      // Handle successful login (e.g., store user session/token).
      // Redirect to the home page or any other desired page.
      navigate('/');
    } catch (error) {
      // Handle login errors, e.g., show an error message to the user.
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container">
      <h2>Sign In</h2>
      <input
        type="text"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={handleSignIn}>Sign In</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default SignIn;
