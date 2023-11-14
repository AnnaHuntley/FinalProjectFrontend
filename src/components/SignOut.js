import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


axios.defaults.baseURL = '/api'; // Set your API endpoint.

function SignOut() {
    const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      // Send a request to your backend to log the user out (e.g., invalidate the session or token).
      // After a successful sign-out, you may want to clear the user session/token.

      // Redirect to the home page or any other desired page.
      navigate('/');
    } catch (error) {
      // Handle sign-out errors, if any.
    }
  };

  return (
    <div>
      <h2>Sign Out</h2>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default SignOut;
