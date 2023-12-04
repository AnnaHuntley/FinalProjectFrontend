import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import MyCalendar from './MyCalendar';

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    description: '',
  });

  // State for tracking edited achievement
  const [editingAchievementId, setEditingAchievementId] = useState(null);
  const [editedAchievementFields, setEditedAchievementFields] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/achievements', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setAchievements(response.data);
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

  const handleAddAchievement = async () => {
    try {
      await axios.post('http://localhost:4000/achievements', newAchievement, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      fetchAchievements();
      setNewAchievement({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding achievement:', error);
    }
  };

  const handleEditAchievement = async (achievementId) => {
    // Find the edited achievement by ID
    const editedAchievement = achievements.find(
      (achievement) => achievement.id === achievementId
    );
    if (editedAchievement) {
      // Set the editing state and fields
      setEditingAchievementId(achievementId);
      setEditedAchievementFields({
        title: editedAchievement.title,
        description: editedAchievement.description,
      });
    }
  };

  const handleSaveEditAchievement = async () => {
    try {
      await axios.put(
        `http://localhost:4000/achievements/${editingAchievementId}`,
        editedAchievementFields,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      setEditingAchievementId(null); // Exit edit mode after editing
      fetchAchievements();
    } catch (error) {
      console.error('Error updating achievement:', error);
    }
  };

  const handleCancelEditAchievement = () => {
    // Reset editing state and fields
    setEditingAchievementId(null);
    setEditedAchievementFields({
      title: '',
      description: '',
    });
  };

  const handleDeleteAchievement = async (achievementId) => {
    try {
      await axios.delete(`http://localhost:4000/achievements/${achievementId}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      fetchAchievements();
    } catch (error) {
      console.error('Error deleting achievement:', error);
    }
  };

  return (
    <div className="achievement-container">
      <h1>Achievements</h1>
      <form className="achievement">
        <div>
          <label>Title:</label>
          <input type="text" value={newAchievement.title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={newAchievement.description}
             onChange={handleDescriptionChange}
           />
        </div>
        <button type="button" onClick={handleAddAchievement}>
          Add Achievement
        </button>
      </form>
      <ul>
        {Array.isArray(achievements) && achievements.length > 0 ? (
          achievements.map((achievement) => (
            <li className="achievement-render" key={achievement.id}>
              {/* Display fields based on edit mode */}
              {editingAchievementId === achievement.id ? (
                <>
                  <div>
                    <label>Title:</label>
                    <input
                      type="text"
                      value={editedAchievementFields.title}
                      onChange={(e) =>
                        setEditedAchievementFields({
                          ...editedAchievementFields,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label>Description:</label>
                    <textarea
                value={editedAchievementFields.description}
                onChange={(e) =>
                  setEditedAchievementFields({
                    ...editedAchievementFields,
                    description: e.target.value,
                  })
                }
              />
                  </div>
                  <button onClick={handleSaveEditAchievement}>Save</button>
                  <button onClick={handleCancelEditAchievement}>Cancel</button>
                </>
              ) : (
                <>
                  <p>{achievement.title}</p>
                  <p>{achievement.description}</p>
                  <button onClick={() => handleEditAchievement(achievement.id)}>
                    Edit Achievement
                  </button>
                  <button onClick={() => handleDeleteAchievement(achievement.id)}>
                    Delete Achievement
                  </button>
                </>
              )}
            </li>
          ))
        ) : (
          <p>No achievements to display.</p>
        )}
      </ul>
      <MyCalendar style={{ width: '100px', height: '450px' }} />
    </div>
  );
}

export default Achievements;
