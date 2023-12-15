import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/AddProduct.css';

interface AddProductProps {}

const AddProduct: React.FC<AddProductProps> = () => {
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:8080/api/add', newProduct, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setNewProduct({ title: '', description: '', imageUrl: '' });
      navigate('/');
    } catch (error) {
      console.error('Błąd podczas dodawania produktu:', error);
    }
  };  

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>
      <form className="add-product-form">
        <label>
          Title:
          <input type="text" name="title" value={newProduct.title} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <input name="description" value={newProduct.description} onChange={handleInputChange} />
        </label>
        <label>
          Image URL:
          <input type="text" name="imageUrl" value={newProduct.imageUrl} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;