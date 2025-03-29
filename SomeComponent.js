import React from 'react';
import Button from '@mui/material.Button';
import { getDbConnection } from './sqliteClient';

async function addProduct() {
  const title = 'New Product';
  const description = 'This is a new product';
  const image = 'https://via.placeholder.com/150';

  if (!title || !description) {
    console.error('Title and description are required');
    return;
  }

  const db = await getDbConnection();
  try {
    await db.run(`
      INSERT INTO products (title, description, image)
      VALUES (?, ?, ?)
    `, [title, description, image]);
    console.log('Product added successfully');
  } catch (error) {
    console.error('Error adding product:', error);
  }
}

function SomeComponent() {
  return (
    <Button variant="contained" color="primary" onClick={addProduct}>
      Add Product
    </Button>
  );
}

export default SomeComponent;
