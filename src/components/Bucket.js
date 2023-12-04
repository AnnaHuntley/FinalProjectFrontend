import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import MyCalendar from './MyCalendar';

function BucketList({ handleAddEvent }) {
  const [bucketList, setBucketList] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editItemText, setEditItemText] = useState('');
  const [newItemDate, setNewItemDate] = useState('');

  useEffect(() => {
    fetchBucketList();
  }, []);

  const fetchBucketList = async () => {
    try {
      const response = await axios.get('http://localhost:4000/bucket_lists', {
        headers: {
          Accept: 'application/json',
        },
      });
      setBucketList(response.data);
    } catch (error) {
      console.error('Error fetching bucket list:', error);
    }
  };

  const handleNewItemChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleNewItemDateChange = (e) => {
    setNewItemDate(e.target.value);
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4000/bucket_lists',
        { item: newItem, date: newItemDate }, // Include the date in the request payload
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      fetchBucketList();
      setNewItem('');

      const newItemDateObject = new Date(newItemDate);
      if (isNaN(newItemDateObject.getTime())) {
        throw new Error('Invalid date');
      }

      const newEvent = {
        title: newItem,
        start: newItemDateObject,
        end: newItemDateObject,
      };

      handleAddEvent(newEvent);
    } catch (error) {
      console.error('Error adding item to the bucket list:', error);
    }
  };

  const handleEditItem = async (itemId) => {
    try {
      const updatedItemText = editItemText || bucketList.find(item => item.id === itemId)?.item;
      const itemDate = newItemDate;  // Use the updated date from state
  
      await axios.put(
        `http://localhost:4000/bucket_lists/${itemId}`,
        { item: updatedItemText, date: itemDate },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Update the state directly without refetching the entire list
      setBucketList(prevList => prevList.map(item => 
        item.id === itemId ? { ...item, item: updatedItemText, date: itemDate } : item
      ));
  
      // Reset edit state
      setEditItemId(null);
      setEditItemText('');
    } catch (error) {
      console.error('Error updating item in the bucket list:', error);
    }
  };
  
  
  
  

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:4000/bucket_lists/${itemId}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      fetchBucketList();
    } catch (error) {
      console.error('Error deleting item from the bucket list:', error);
    }
  };

  return (
    <div className="bucket-container">
      <h1>Bucket List</h1>
      <div className="bucket-list-tab">
        <textarea
          value={newItem}
          onChange={handleNewItemChange}
          placeholder="Add a new item (Press Enter for a new line)"
          rows={3}
        />
        <input
          type="date"
          value={newItemDate}
          onChange={handleNewItemDateChange}
          placeholder="Select a date"
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <ul className="bucket-list">
        {Array.isArray(bucketList) && bucketList.length > 0 ? (
          bucketList.map((item) => (
            <li key={item.id} className="bucket-list-item">
              {editItemId === item.id ? (
                <>
                  <textarea
                    value={editItemText || item.item}
                    onChange={(e) => setEditItemText(e.target.value)}
                    rows={3}
                  />
                  <input
                    type="date"
                    value={newItemDate}
                    onChange={(e) => setNewItemDate(e.target.value)}
                    placeholder="Select a date"
                  />
                  <div className="button-group">
                    <button className="edit-btn" onClick={() => handleEditItem(item.id)}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditItemId(null)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <p>{item.item}</p>
                  <p>Date: {item.date ? new Date(item.date).toLocaleDateString() : 'Invalid Date'}</p>
                  <div className="button-group">
                    <button className="edit-btn" onClick={() => setEditItemId(item.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteItem(item.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <p>No bucket list items to display.</p>
        )}
      </ul>
      <MyCalendar events={bucketList} style={{ width: '100px', height: '450px' }} />
    </div>
  );
}

export default BucketList;
