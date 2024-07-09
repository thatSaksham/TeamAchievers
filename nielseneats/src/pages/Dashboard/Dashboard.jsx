import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://teamachievers-1.onrender.com/prods');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const newProduct = { name, description, price, category, image };
      const response = await axios.post('https://teamachievers-1.onrender.com/prod', newProduct, {
        headers: { authentication: 'Bearer ' + localStorage.getItem('token') }
      });
      setProducts([...products, response.data]);
      clearForm();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = { name, description, price, category, image };
      const response = await axios.put(`https://teamachievers-1.onrender.com/${currentProduct._id}`, updatedProduct);
      setProducts(products.map(product => (product._id === currentProduct._id ? response.data : product)));
      clearForm();
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`https://teamachievers-1.onrender.com/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const clearForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setImage('');
    setEditing(false);
    setCurrentProduct(null);
  };

  const handleEditClick = (product) => {
    setEditing(true);
    setCurrentProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setCategory(product.category);
    setImage(product.image);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <br />
      <h2>Manage Dishes</h2>

      <div className="new-dish-form">
        <h3>{editing ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={editing ? handleEditProduct : handleAddProduct}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <button type="submit">{editing ? 'Update' : 'Add'}</button>
          {editing && <button onClick={clearForm}>Cancel</button>}
        </form>
      </div>

      <div className="dishes-list">
        <h3>Existing Products</h3>
        <ul>
          {products.map((product) => (
            <li key={product._id} className="dish-item">
              <span>{product.name} - {product.description} - ₹{product.price} - {product.category}</span>
              <button onClick={() => handleEditClick(product)}>Edit</button>
              <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;