import React, { useState, ChangeEvent, useEffect } from 'react';
import Select, { MultiValue } from 'react-select';
import '../css/EditProduct.css';
import { Product } from '../models/IProduct';
import { editProduct } from '../services/ProductService';
import { getDisplayCategories } from '../services/CategoryService';
import { getAccessToken } from '../services/AuthService';

interface EditProductProps {
  productId: string;
  initialData: Product;
  onEditDone: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ initialData, onEditDone }) => {
  const [editedData, setEditedData] = useState<Product>(initialData);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<{ value: string; label: string }[]>();
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCategoryChange = (
    selectedOptions: MultiValue<{ value: string; label: string }> | null,
  ) => {
    if (selectedOptions) {
      setSelectedCategories([...selectedOptions]);
      const selectedCategoryIds = selectedOptions.map((option) => option.value);
      setEditedData((prevData) => ({
        ...prevData,
        categoryIds: selectedCategoryIds,
      }));
    } else {
      setSelectedCategories([]);
      setEditedData((prevData) => ({
        ...prevData,
        categoryIds: [],
      }));
    }
  };

  const validateForm = () => {
    if (!editedData.title.trim()) {
      setError('Title cannot be empty');
      return false;
    }
    setError(null);
    return true;
  };

  const handleEdit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const accessToken = getAccessToken();

      if (accessToken) {
        await editProduct(editedData, accessToken);
        onEditDone();
      } else {
        console.error('User does not have admin privileges or accessToken is null.');
      }
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  const handleCancel = () => {
    onEditDone();
  };

  return (
    <div className="edit-product">
      <h2 className="edit-product-title">Edit Product</h2>
      <label className="edit-product-label">
        Title:
        <input type="text" name="title" value={editedData.title} onChange={handleChange} />
      </label>
      <label className="edit-product-label">
        Description:
        <input type="text" name="description" value={editedData.description} onChange={handleChange} />
      </label>
      <label className="edit-product-label">
        Image URL:
        <input type="text" name="imageUrl" value={editedData.imageUrl} onChange={handleChange} />
      </label>
      <label className="edit-product-label">
        Categories:
        <Select
        className="category-select"
        isMulti
        options={categories.map((category) => ({ value: category.id, label: category.name }))}
        onChange={handleCategoryChange}
        value={selectedCategories}
        />
      </label>
      {error && <p className="error-message">{error}</p>}
      <button className="edit-product-button" onClick={handleEdit}>
        Edit
      </button>
      <button className="edit-product-button cancel" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
};

export default EditProduct;