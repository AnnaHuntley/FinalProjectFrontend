import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BucketList() {
  const [bucketList, setBucketList] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchBucketList();
  }, []);

  const fetchBucketList = async () => {
    try {
      const response = await axios.get('http://localhost:4000/bucket_lists');
      setBucketList(response.data);
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
      await axios.post('http://localhost:4000/bucket_lists', { item: newItem }, {
      headers: {
        //'X-CSRF-Token': csrfToken,
        'Content-Type': 'application/json', 
      },
    });
      fetchBucketList();
      setNewItem('');
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
    <div>
      <h1>Bucket List</h1>
      <div>
        <input type="text" value={newItem} onChange={handleNewItemChange} />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <ul>
        {Array.isArray(bucketList) && bucketList.length > 0 ? (
          bucketList.map((item) => (
            <li key={item.id}>
              <p>{item.item}</p>
              <button onClick={() => handleEditItem(item.id, { item: 'Updated item' })}>
                Edit Item
              </button>
              <button onClick={() => handleDeleteItem(item.id)}>Delete Item</button>
            </li>
          ))
        ) : (
          <p>No bucket list items to display.</p>
        )}
      </ul>
    </div>
  );
}

export default BucketList;
