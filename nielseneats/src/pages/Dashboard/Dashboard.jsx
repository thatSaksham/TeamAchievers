import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState('');
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [image, setImage] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://teamachievers-1.onrender.com/prods');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://teamachievers-1.onrender.com/getmenulist', {
        headers: { authentication: 'Bearer ' + localStorage.getItem('token') }
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
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

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const newCategory = { menu_name: newCategoryName, menu_image: newCategoryImage };
      await axios.post('https://teamachievers-1.onrender.com/addcategory', newCategory, {
        headers: { authentication: 'Bearer ' + localStorage.getItem('token') }
      });
      fetchCategories();
      setCategory(newCategoryName);
      setShowNewCategoryForm(false);
      setNewCategoryName('');
      setNewCategoryImage('');
    } catch (error) {
      console.error('Error adding category:', error);
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
    window.scrollTo(0, 0)
    setEditing(true);
    setCurrentProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setCategory(product.category);
    setImage(product.image);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "Add New Category") {
      setShowNewCategoryForm(true);
      setCategory("");
    } else {
      setShowNewCategoryForm(false);
      setCategory(selectedCategory);
    }
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
          <select
            value={category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.menu_name}>{cat.menu_name}</option>
            ))}
            <option value="Add New Category">Add New Category</option>
          </select>
          {showNewCategoryForm && (
            <div className="new-category-form">
              <input
                type="text"
                placeholder="New Category Name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="New Category Image URL"
                value={newCategoryImage}
                onChange={(e) => setNewCategoryImage(e.target.value)}
                required
              />
              <button onClick={handleAddCategory}>Add Category</button>
            </div>
          )}
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