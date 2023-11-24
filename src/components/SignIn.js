import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Set the base URL for Axios (use try/catch for error handling)
try {
  axios.defaults.baseURL = 'http://localhost:4000'; // Adjust this to match your API endpoint.
  axios.defaults.withCredentials = true; // Set withCredentials globally
} catch (error) {
  console.error('Failed to set Axios base URL:', error);
}

function SignIn() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // State for displaying login errors
  const navigate = useNavigate();

  /*useEffect(() => {
    // Fetch CSRF token from meta tags when the component mounts
    const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
const csrfToken = csrfTokenElement ? csrfTokenElement.content : null;

if (!csrfToken) {
  console.error('CSRF token not found');
  // Handle the absence of CSRF token, such as showing an error message or redirecting to an error page.
  return;
}
    // Set CSRF token in Axios headers
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
  }, []); // Run this effect only once when the component mounts*/

  const handleSignIn = async () => {
    try {
      const response = await axios.post('/users/sign_in', user, {
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
