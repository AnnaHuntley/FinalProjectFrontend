// src/components/Bucket.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import MyCalendar from './MyCalendar';

function BucketList({ handleAddEvent }) {
  const [bucketList, setBucketList] = useState([]);
  const [newItem, setNewItem] = useState('');

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
      console.log('API Response:', response.data); // Log the response
      setBucketList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching bucket list:', error);
    }
  };
  

  const handleNewItemChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleAddItem = async () => {
    try {
      // Get the CSRF token const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      await axios.post(
        'http://localhost:4000/bucket_lists',
        { item: newItem },
        {
          headers: {
            //'X-CSRF-Token': csrfToken,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      fetchBucketList();
      setNewItem('');

      // Call the function to add the event to the calendar
      const newEvent = {
        title: newItem,
        start: new Date(), // Use the current date
        end: new Date(),
      };
      handleAddEvent(newEvent);
    } catch (error) {
      console.error('Error adding item to the bucket list:', error);
    }
  };

  const handleEditItem = async (itemId, updatedItem) => {
    try {
      await axios.put(`http://localhost:4000/bucket_lists/${itemId}`, updatedItem);
      fetchBucketList();
    } catch (error) {
      console.error('Error updating item in the bucket list:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:4000/bucket_lists/${itemId}`);
      fetchBucketList();
    } catch (error) {
      console.error('Error deleting item from the bucket list:', error);
    }
  };

  return (
    <div className="bucket-container">
      <h1>Bucket List</h1>
      <div className="bucket-list-tab">
        <input type="text" value={newItem} onChange={handleNewItemChange} />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      {console.log(bucketList)}
      <ul>
        {Array.isArray(bucketList) && bucketList.length > 0 ? (
          bucketList.map((item) => (
            <li key={item.id}>
              <p>{item.item}</p>
              <button
                onClick={() => handleEditItem(item.id, { item: 'Updated item' })}
              >
                Edit Item
              </button>
              <button onClick={() => handleDeleteItem(item.id)}>Delete Item</button>
            </li>
                   ))
                   ) : (
                     <p>No bucket list items to display.</p>
                   )}
                 </ul>
                 <MyCalendar style={{ width: '100px', height: '450px' }} />
               </div>
               
             );
           }
           
           export default BucketList;
           
