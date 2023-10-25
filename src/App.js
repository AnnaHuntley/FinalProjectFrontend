import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Memories from './components/Memories';
import Bucket from './components/Bucket';
import Achievements from './components/Achievements';
import Home from './components/Home';
import Navbar from './components/Navbar';
import OfflineFallback from './components/OfflineFallback';


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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
