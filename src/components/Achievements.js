import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState('');

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/achievements');
      setAchievements(response.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const handleNewAchievementChange = (e) => {
    setNewAchievement(e.target.value);
  };

  const handleAddAchievement = async () => {
    try {
      const newAchievementData = { achievement: newAchievement };
      await axios.post('http://localhost:4000/achievements', newAchievementData);
      fetchAchievements();
      setNewAchievement('');
    } catch (error) {
      console.error('Error adding achievement:', error);
    }
  };

  const handleEditAchievement = async (achievementId, updatedAchievement) => {
    try {
      await axios.put(`http://localhost:4000/achievements/${achievementId}`, updatedAchievement);
      fetchAchievements();
    } catch (error) {
      console.error('Error updating achievement:', error);
    }
  };

  const handleDeleteAchievement = async (achievementId) => {
    try {
      await axios.delete(`http://localhost:4000/achievements/${achievementId}`);
      fetchAchievements();
    } catch (error) {
      console.error('Error deleting achievement:', error);
    }
  };

  return (
    <div>
      <h1>Achievements</h1>
      <div>
        <input type="text" value={newAchievement} onChange={handleNewAchievementChange} />
        <button onClick={handleAddAchievement}>Add Achievement</button>
      </div>
      <ul>
        {achievements.map((achievement) => (
          <li key={achievement.id}>
            <p>{achievement.achievement}</p>
            <button onClick={() => handleEditAchievement(achievement.id, { achievement: 'Updated achievement' })}>
              Edit Achievement
            </button>
            <button onClick={() => handleDeleteAchievement(achievement.id)}>Delete Achievement</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Achievements;
