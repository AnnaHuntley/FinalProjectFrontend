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
      const newItemData = { item: newItem };
      await axios.post('http://localhost:4000/bucket_lists', newItemData);
      fetchBucketList();
      setNewItem('');
    } catch (error) {
      console.error('Error adding item to bucket list:', error);
    }
  };

  const handleEditItem = async (itemId, updatedItem) => {
    try {
      await axios.put(`http://localhost:4000/bucket_lists/${itemId}`, updatedItem);
      fetchBucketList();
    } catch (error) {
      console.error('Error updating item in bucket list:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:4000/bucket_lists/${itemId}`);
      fetchBucketList();
    } catch (error) {
      console.error('Error deleting item from bucket list:', error);
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
        {bucketList.map((item) => (
          <li key={item.id}>
            <p>{item.item}</p>
            <button onClick={() => handleEditItem(item.id, { item: 'Updated item' })}>
              Edit Item
            </button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete Item</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BucketList;
