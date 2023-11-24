import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Memories from './components/Memories';
import Bucket from './components/Bucket';
import Achievements from './components/Achievements';
import Home from './components/Home';
import Navbar from './components/Navbar';
import OfflineFallback from './components/OfflineFallback';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import SignUp from './components/SignUp';



function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/bucket_lists" element={<Bucket />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/offline" element={<OfflineFallback />}/> 
          <Route path="/login" element={<SignIn />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/logout" element={<SignOut />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
