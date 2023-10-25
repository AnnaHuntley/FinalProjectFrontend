// Memories.js

import React, { useState } from 'react';

function Memories() {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const selectedPhotos = Array.from(e.target.files);
    setPhotos(selectedPhotos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission (send data to the backend, including photos).
    // You can use Axios or another HTTP library to make the API request.

    // Reset form fields after submission.
    setDescription('');
    setDate('');
    setLocation('');
    setPhotos([]);
  };

  return (
    <div>
      <h1>Add a Memory</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={handleDescriptionChange} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={handleDateChange} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" value={location} onChange={handleLocationChange} />
        </div>
        <div>
          <label>Photos:</label>
          <input type="file" multiple onChange={handlePhotoChange} />
        </div>
        <button type="submit">Add Memory</button>
      </form>
    </div>
  );
}

export default Memories;
