import React, { useState, useEffect } from 'react';
import { editCategory } from '../services/CategoryService';
import { getAccessToken } from '../services/AuthService';

interface EditCategoryProps {
  categoryId: string;
  onCancel: () => void;
  onCategoryUpdated: () => void;
}

const EditCategory: React.FC<EditCategoryProps> = ({ categoryId, onCancel, onCategoryUpdated }) => {
  const [updatedFields, setUpdatedFields] = useState({
    name: '',
  });

  useEffect(() => {
    getAccessToken();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedFields({ ...updatedFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const accessToken = getAccessToken();
      if (accessToken) {
        await editCategory(categoryId, updatedFields, accessToken);
        console.log('Category edited successfully');
        onCategoryUpdated();
        onCancel();
      } else {
        console.error('User does not have admin privileges or accessToken is null.');
      }
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Updated Name:
        <input type="text" name="name" value={updatedFields.name} onChange={handleInputChange} />
      </label>
      <button type="submit">Edit Category</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditCategory;