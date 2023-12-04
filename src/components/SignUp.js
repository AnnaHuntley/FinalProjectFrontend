import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Set the base URL for Axios (use try/catch for error handling)
try {
  axios.defaults.baseURL = 'http://localhost:4000'; // Adjust this to match your API endpoint.
} catch (error) {
  console.error('Failed to set Axios base URL:', error);
}

function SignUp() {
  const [user, setUser] = useState({ email: '', password: '', passwordConfirmation: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      // Check if the passwords match
      if (user.password !== user.passwordConfirmation) {
        alert("Password and Password Confirmation do not match.");
        return;
      }
  
      const response = await axios.post('/api/v1/signup', user);
      // Handle successful sign-up, e.g., redirect to the login page.
      navigate('/login');
    } catch (error) {
      // Handle sign-up errors, e.g., show an error message to the user.
      setError('Sign-up failed. Please check your information.');
    }
  };
  

  return (
    <div className="container">
      <h2>Sign Up</h2>
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
      <input
        type="password"
        placeholder="Password Confirmation"
        value={user.passwordConfirmation}
        onChange={(e) => setUser({ ...user, passwordConfirmation: e.target.value })}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <Link to="/login">Already have an account? Log in</Link>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default SignUp;
