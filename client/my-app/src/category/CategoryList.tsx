import React, { useEffect, useState } from 'react';
import { Category } from '../models/ICategory';
import { getDisplayCategories } from '../services/CategoryService';
import EditCategory from './EditCategory';
import DeleteCategory from './DeleteCategory';
import '../css/CategoryList.css';

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getDisplayCategories();
        setCategories(result.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [editCategoryId]);

  const handleEditClick = (categoryId: string) => {
    setEditCategoryId(categoryId);
  };

  const handleEditCancel = () => {
    setEditCategoryId(null);
  };

  const handleCategoryUpdated = () => {
    window.location.reload();
  };

  return (
    <ul className="category-list">
      {categories.map((category) => (
        <li key={category.id} className="category-item">
            
          {editCategoryId === category.id ? (
            <EditCategory
              categoryId={category.id}
              onCancel={handleEditCancel}
              onCategoryUpdated={handleCategoryUpdated}
            />
          ) : (
            <>
              {category.name}
              <button onClick={() => handleEditClick(category.id)} className="edit-button">
                Edit
              </button>
              <DeleteCategory categoryId={category.id} onCategoryDeleted={handleCategoryUpdated} />
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;