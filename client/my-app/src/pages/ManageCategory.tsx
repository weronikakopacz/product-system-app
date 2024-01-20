import React from 'react';
import CategoryList from '../category/CategoryList';
import AddCategory from '../category/AddCategory';

const ManageCategory: React.FC = () => (
  <div className="App">
    <AddCategory />
    <CategoryList />
  </div>
);

export default ManageCategory;