import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Memories() {
  const [memories, setMemories] = useState([]);
  const [newMemory, setNewMemory] = useState({
    description: '',
    date: '',
    location: '',
  });
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const response = await axios.get('http://localhost:4000/memories');
      setMemories(response.data);
    } catch (error) {
      console.error('Error fetching memories:', error);
    }
  };

  const handleDescriptionChange = (e) => {
    setNewMemory({ ...newMemory, description: e.target.value });
  };

  const handleDateChange = (e) => {
    setNewMemory({ ...newMemory, date: e.target.value });
  };

  const handleLocationChange = (e) => {
    setNewMemory({ ...newMemory, location: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const selectedPhotos = Array.from(e.target.files);
    setPhotos(selectedPhotos);
  };

  const handleAddMemory = async () => {
    try {
      const formData = new FormData();
      formData.append('description', newMemory.description);
      formData.append('date', newMemory.date);
      formData.append('location', newMemory.location);
      photos.forEach((photo, index) => {
        formData.append(`photo_${index}`, photo);
      });

      await axios.post('http://localhost:4000/memories', formData);
      fetchMemories();
      setNewMemory({ description: '', date: '', location: '' });
      setPhotos([]);
    } catch (error) {
      console.error('Error adding memory:', error);
    }
  };

  const handleEditMemory = async (memoryId, updatedMemory) => {
    try {
      await axios.put(`http://localhost:4000/memories/${memoryId}`, updatedMemory);
      fetchMemories();
    } catch (error) {
      console.error('Error updating memory:', error);
    }
  };

  const handleDeleteMemory = async (memoryId) => {
    try {
      await axios.delete(`http://localhost:4000/memories/${memoryId}`);
      fetchMemories();
    } catch (error) {
      console.error('Error deleting memory:', error);
    }
  };

  return (
    <div>
      <h1>Memories</h1>
      <form>
        <div>
          <label>Description:</label>
          <input type="text" value={newMemory.description} onChange={handleDescriptionChange} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={newMemory.date} onChange={handleDateChange} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" value={newMemory.location} onChange={handleLocationChange} />
        </div>
        <div>
          <label>Photos:</label>
          <input type="file" multiple onChange={handlePhotoChange} />
        </div>
        <button type="button" onClick={handleAddMemory}>
          Add Memory
        </button>
      </form>
      <ul>
        {memories.map((memory) => (
          <li key={memory.id}>
            <p>{memory.description}</p>
            <p>{memory.date}</p>
            <p>{memory.location}</p>
            <button onClick={() => handleEditMemory(memory.id, { description: 'Updated description' })}>
              Edit Memory
            </button>
            <button onClick={() => handleDeleteMemory(memory.id)}>Delete Memory</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Memories;
