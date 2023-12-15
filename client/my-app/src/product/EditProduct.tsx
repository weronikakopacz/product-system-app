import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Product } from './UIProduct';
import '../css/EditProduct.css'

interface EditProductProps {
  productId: string;
  initialData: Product;
  onEditDone: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ productId, initialData, onEditDone }) => {
  const [editedData, setEditedData] = useState<Product>(initialData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:8080/api/edit/${productId}`, editedData);
      onEditDone();
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  const handleCancel = () => {
    onEditDone();
  };

  return (
    <div className="edit-product">
      <h2>Edit Product</h2>
      <label>
        Title:
        <input type="text" name="title" value={editedData.title} onChange={handleChange} />
      </label>
      <label>
        Description:
        <input type="text" name="description" value={editedData.description} onChange={handleChange} />
      </label>
      <label>
        Image URL:
        <input type="text" name="imageUrl" value={editedData.imageUrl} onChange={handleChange} />
      </label>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default EditProduct;