import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import MyCalendar from './MyCalendar';

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/achievements');
      setAchievements(response.data);
      
    console.log(response.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const handleTitleChange = (e) => {
    setNewAchievement({ ...newAchievement, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setNewAchievement({ ...newAchievement, description: e.target.value });
  };

  const handleDateChange = (e) => {
    setNewAchievement({ ...newAchievement, date: e.target.value });
  };

  const handleAddAchievement = async () => {
    try {
      await axios.post('http://localhost:4000/achievements', newAchievement);
      fetchAchievements();
      setNewAchievement({ title: '', description: '', date: '' });
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
    <div className="achievement-container">
      <h1>Achievements</h1>
      <form className="accordion"> 
        <div>
          <label>Title:</label>
          <input type="text" value={newAchievement.title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={newAchievement.description} onChange={handleDescriptionChange} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={newAchievement.date} onChange={handleDateChange} />
        </div>
        <button type="button" onClick={handleAddAchievement}>
          Add Achievement
        </button>
      </form>
      <ul>
        {Array.isArray(achievements) && achievements.length > 0 ? (
          achievements.map((achievement) => (
            <li key={achievement.id}>
              <p>{achievement.title}</p>
              <p>{achievement.description}</p>
              <p>{achievement.date}</p>
              <button onClick={() => handleEditAchievement(achievement.id, { title: 'Updated title' })}>
                Edit Achievement
              </button>
              <button onClick={() => handleDeleteAchievement(achievement.id)}>Delete Achievement</button>
            </li>
          ))
        ) : (
          <p>No achievements to display.</p>
        )}
      </ul>
      <MyCalendar />
    </div>
  );
}

export default Achievements;
