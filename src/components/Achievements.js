// Achievements.js

import React, { useState } from 'react';

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState('');

  const handleNewAchievementChange = (e) => {
    setNewAchievement(e.target.value);
  };

  const handleAddAchievement = () => {
    setAchievements([...achievements, newAchievement]);
    setNewAchievement('');
  };

  return (
    <div>
      <h1>Achievements</h1>
      <div>
        <input type="text" value={newAchievement} onChange={handleNewAchievementChange} />
        <button onClick={handleAddAchievement}>Add Achievement</button>
      </div>
      <ul>
        {achievements.map((achievement, index) => (
          <li key={index}>{achievement}</li>
        ))}
      </ul>
    </div>
  );
}

export default Achievements;
