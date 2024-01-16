import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AddProduct.css';
import { addProduct } from '../services/ProductService';
import { getAccessToken } from '../services/AuthService';
import { getUserId } from '../services/UserService';

interface AddProductProps {}

const AddProduct: React.FC<AddProductProps> = () => {
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAccessToken = async () => {
      const accessToken = getAccessToken();
      if (!accessToken) {
        setError('User not logged in. Please log in to add a product.');
      }
    };

    checkAccessToken();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!newProduct.title.trim()) {
      setError('Title cannot be empty');
      return false;
    }
    setError(null);
    return true;
  };

  const handleAddProduct = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        setError('User not logged in. Please log in to add a product.');
        return;
      }

      const currentUser = await getUserId(accessToken);
      const productData = {
        ...newProduct,
        creatorUserId: currentUser,
      };
      console.log(productData);
      await addProduct(productData);
      setNewProduct({ title: '', description: '', imageUrl: '' });
      navigate('/');
    } catch (error) {
      console.error('Error adding product:', error);
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
        {error && <p className="error-message">{error}</p>}
        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;