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
    photo: null,
  });

  const [editingMemoryId, setEditingMemoryId] = useState(null);
  const [editedMemoryFields, setEditedMemoryFields] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    photo: null,
  });
  const hasRendered = useRef(false);

  const fetchMemories = useCallback(async () => {
    try {
      console.log('Fetching memories...');
      const response = await axios.get('http://localhost:4000/memories', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
  
      console.log('Fetched Memories:', response.data);
      setMemories(response.data);
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
    const selectedPhoto = e.target.files[0];
    setNewMemory((prevMemory) => ({
      ...prevMemory,
      photo: selectedPhoto,
    }));
  };

  const handleAddMemory = async () => {
    try {
      const formData = new FormData();
      formData.append('memory[title]', newMemory.title);
      formData.append('memory[description]', newMemory.description);
      formData.append('memory[date]', newMemory.date);
      formData.append('memory[location]', newMemory.location);
      if (newMemory.photo) {
        formData.append('memory[photo]', newMemory.photo);
      }
  
  
      await axios.post('http://localhost:4000/memories', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });


await fetchMemories();

setNewMemory({ title: '', description: '', date: '', location: '', photo: null});


const newEvent = {
  title: newMemory.title,
  start: new Date(newMemory.date),
  end: new Date(newMemory.date),
};
console.log('Calling handleAddEvent with:', newEvent);
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
      formData.append('memory[title]', editedMemoryFields.title);
      formData.append('memory[description]', editedMemoryFields.description);
      formData.append('memory[date]', editedMemoryFields.date);
      formData.append('memory[location]', editedMemoryFields.location);
      
      // Only append photos if there are photos to update
      if (editedMemoryFields.photos.length > 0) {
        editedMemoryFields.photos.forEach((photo, index) => {
          formData.append('memory[photo]', photo);
        });
      }
  
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
        <div className="memory-render" key={memory.id}>
          <p>{memory.title}</p>
          <p>{memory.description}</p>
          <p>{memory.date}</p>
          <p>{memory.location}</p>
          <div>
            {memory.photo_url && (
              <img
                src={`http://localhost:4000/${memory.photo_url}`}
                alt={`Photo`}
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
          <textarea value={newMemory.description} onChange={handleDescriptionChange} rows={3} />
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
          <p style={{ color: 'gray', fontSize: '12px' }}>
             (Only 1 photo allowed)
         </p>
        </div>
        <button type="button" onClick={handleAddMemory}>
          Add Memory
        </button>
      </form>

      <ul className="memory-list">
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
