import React from 'react';
import { deleteCategory } from '../services/CategoryService';
import { getAccessToken } from '../services/AuthService';
import '../css/CategoryList.css';

interface DeleteCategoryProps {
  categoryId: string
  onCategoryDeleted: () => void;
}

const DeleteCategory: React.FC<DeleteCategoryProps> = ({ categoryId, onCategoryDeleted }) => {
  const accessToken = getAccessToken();

  const handleDelete = async () => {
    try {
      if (accessToken) {
        await deleteCategory(categoryId, accessToken);
        console.log('Category deleted successfully');
        onCategoryDeleted();
      } else {
        console.error('User does not have admin privileges or accessToken is null.');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <button className = "delete-button" onClick={handleDelete}>Delete Category</button>
  );
};

export default DeleteCategory;