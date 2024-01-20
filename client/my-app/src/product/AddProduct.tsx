import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select, { MultiValue } from 'react-select';
import '../css/AddProduct.css';
import { addProduct } from '../services/ProductService';
import { getAccessToken } from '../services/AuthService';
import { getUserId } from '../services/UserService';
import { getDisplayCategories } from '../services/CategoryService';

interface AddProductProps {}

const AddProduct: React.FC<AddProductProps> = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const selectOptions = categories.map((category) => ({ value: category.id, label: category.name }));

  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    imageUrl: '',
    categoryIds: [] as string[],
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDisplayCategories();
        setCategories(result.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const checkAccessToken = () => {
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

  const handleCategoryChange = (
    selectedOptions: MultiValue<{ value: string; label: string }> | null,
  ) => {
    if (selectedOptions) {
      const selectedCategoryIds = selectedOptions.map((option) => option.value);
      setNewProduct((prevData) => ({
        ...prevData,
        categoryIds: selectedCategoryIds,
      }));
    } else {
      setNewProduct((prevData) => ({
        ...prevData,
        categoryIds: [],
      }));
    }
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

      await addProduct(productData);
      setNewProduct({ title: '', description: '', imageUrl: '', categoryIds: [] });
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
          <textarea name="description" value={newProduct.description} onChange={handleInputChange} />
        </label>
        <label>
          Image URL:
          <input type="text" name="imageUrl" value={newProduct.imageUrl} onChange={handleInputChange} />
        </label>
        <label>
          Categories:
          <Select
            isMulti
            options={selectOptions}
            onChange={handleCategoryChange}
            value={selectOptions.filter((option) => newProduct.categoryIds.includes(option.value))}
          />
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