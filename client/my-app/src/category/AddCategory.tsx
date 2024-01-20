import React, { useState } from 'react';
import { addCategory } from '../services/CategoryService';
import { getAccessToken } from '../services/AuthService';
import '../css/AddCategory.css'

const AddCategory: React.FC = () => {
  const accessToken = getAccessToken();
  const [newCategoryData, setNewCategoryData] = useState({
    name: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryData({ ...newCategoryData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (accessToken) {
        await addCategory(newCategoryData, accessToken);
        console.log('Category added successfully');
        window.location.reload();
      } else {
        console.error('User does not have admin privileges or accessToken is null.');
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <form className="add-category-form" onSubmit={handleSubmit}>
      <label>
        Category Name:
        <input
          type="text"
          name="name"
          value={newCategoryData.name}
          onChange={handleInputChange}
          className="category-input"
        />
      </label>
      <button type="submit" className="add-category-button">Add Category</button>
    </form>
  );
};

export default AddCategory;