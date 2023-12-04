import React, { useState, useEffect, useCallback, useRef} from 'react';
import axios from 'axios';
import MyCalendar from './MyCalendar';

function Memories({ handleAddEvent }) {
  console.log('Memories component rendered initially');
  const [memories, setMemories] = useState([]);
  const [newMemory, setNewMemory] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });
  const [photos, setPhotos] = useState([]);
  const [editingMemoryId, setEditingMemoryId] = useState(null);
  const [editedMemoryFields, setEditedMemoryFields] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    photos: [],
  });
  const hasRendered = useRef(false);

  const fetchMemories = useCallback(async () => {
    try {
      console.log('Fetching memories...');
      const response = await axios.get('http://localhost:4000/memories', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      // Flatten the nested arrays
      const flattenedMemories = response.data.flat();

      console.log('Fetched Memories:', flattenedMemories);
      setMemories(flattenedMemories);
    } catch (error) {
      console.error('Error fetching memories:', error);
    }
  }, []);

  useEffect(() => {
    if (!hasRendered.current) {
      fetchMemories();
      hasRendered.current = true;
    }
  }, [fetchMemories]);

  const handleTitleChange = (e) => {
    setNewMemory({ ...newMemory, title: e.target.value });
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
      formData.append('title', newMemory.title)
      formData.append('description', newMemory.description);
      formData.append('date', newMemory.date);
      formData.append('location', newMemory.location);
      photos.forEach((photo, index) => {
        formData.append(`photo_${index}`, photo);
      });

      await axios.post('http://localhost:4000/memories', formData, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Fetch memories after adding a new memory
await fetchMemories();

setNewMemory({ title: '', description: '', date: '', location: '' });
setPhotos([]);


      const newEvent = {
        title: newMemory.title,   
        start: new Date(newMemory.date),
        end: new Date(newMemory.date),
      };
      handleAddEvent(newEvent);
    } catch (error) {
      console.error('Error adding memory:', error);
    }
  };

  const handleEditMemory = async (memoryId) => {
    const editedMemory = memories.find((memory) => memory.id === memoryId);
    if (editedMemory) {
      setEditingMemoryId(memoryId);
      setEditedMemoryFields({
        title: editedMemory.title,
        description: editedMemory.description,
        date: editedMemory.date,
        location: editedMemory.location,
        photos: editedMemory.photos || [],
      });
    }
  };

  const handleEditPhotoChange = (e) => {
    const selectedPhotos = Array.from(e.target.files);
    setEditedMemoryFields((prevFields) => ({
      ...prevFields,
      photos: selectedPhotos,
    }));
  };

  const handleSaveEditMemory = async () => {
    try {
      const formData = new FormData();
      formData.append('title', editedMemoryFields.title);
      formData.append('description', editedMemoryFields.description);
      formData.append('date', editedMemoryFields.date);
      formData.append('location', editedMemoryFields.location);
      editedMemoryFields.photos.forEach((photo, index) => {
      formData.append(`photo_${index}`, photo);
    });

      await axios.put(`http://localhost:4000/memories/${editingMemoryId}`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      setEditingMemoryId(null);
      fetchMemories();
    } catch (error) {
      console.error('Error updating memory:', error);
    }
  };

  const handleCancelEditMemory = () => {
    setEditingMemoryId(null);
    setEditedMemoryFields({
      title: '',
      description: '',
      date: '',
      location: '',
      photos: [],
    });
  };

  const handleDeleteMemory = async (memoryId) => {
    try {
      await axios.delete(`http://localhost:4000/memories/${memoryId}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      fetchMemories();
    } catch (error) {
      console.error('Error deleting memory:', error);
    }
  };

  const renderMemoryOrEditForm = (memoryArray) => {
    const memory = Array.isArray(memoryArray) ? memoryArray[0] : memoryArray;
    console.log('Rendering Memory ID:', memory.id);
    if (!memory) {
      console.log('No memory to render');
      return null;
    }
    console.log('Rendering Memory:', memory);
    if (editingMemoryId !== null && editingMemoryId === memory.id) {
      return (
        <div>
        <input
            type="text"
            value={editedMemoryFields.title}
            onChange={(e) =>
              setEditedMemoryFields({
                ...editedMemoryFields,
                title: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={editedMemoryFields.description}
            onChange={(e) =>
              setEditedMemoryFields({
                ...editedMemoryFields,
                description: e.target.value,
              })
            }
          />
          <input
            type="date"
            value={editedMemoryFields.date}
            onChange={(e) =>
              setEditedMemoryFields({
                ...editedMemoryFields,
                date: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={editedMemoryFields.location}
            onChange={(e) =>
              setEditedMemoryFields({
                ...editedMemoryFields,
                location: e.target.value,
              })
            }
          />
          <div>
            <label>Edit Photos:</label>
            <input type="file" multiple onChange={handleEditPhotoChange} />
          </div>
          <button onClick={handleSaveEditMemory}>Save</button>
          <button onClick={handleCancelEditMemory}>Cancel</button>
        </div>
      );
    } else {
      return (
        <div key={memory.id}>
          <p>{memory.title}</p>
          <p>{memory.description}</p>
          <p>{memory.date}</p>
          <p>{memory.location}</p>
          <div>
            {memory.photo_url && (
              <img
                src={`http://localhost:4000${memory.photo_url}`}
                alt={`Photo`}
                style={{ maxWidth: '100%' }}
              />
            )}
          </div>
          <button onClick={() => handleEditMemory(memory.id)}>Edit Memory</button>
          <button onClick={() => handleDeleteMemory(memory.id)}>Delete Memory</button>
        </div>
      );
    }
  };

  return (
    <div className="memory-container">
      <h1>Memories</h1>
      <form className="memory-sticker">
      <div>
          <label>Title:</label>
          <input type="text" value={newMemory.title} onChange={handleTitleChange} />
        </div>
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
        {memories && memories.length > 0 ? (
          memories.map((memory) => (
            <li key={memory.id}>{renderMemoryOrEditForm(memory)}</li>
          ))
        ) : (
          <p>No memories to display.</p>
        )}
      </ul>

      <MyCalendar style={{ width: '100px', height: '450px' }} />
    </div>
  );
}

export default Memories;
