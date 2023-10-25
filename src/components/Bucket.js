// BucketList.js

import React, { useState } from 'react';

function BucketList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const handleNewItemChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem('');
  };

  return (
    <div>
      <h1>Bucket List</h1>
      <div>
        <input type="text" value={newItem} onChange={handleNewItemChange} />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default BucketList;
