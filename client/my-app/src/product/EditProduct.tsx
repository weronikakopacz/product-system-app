import React, { useState, ChangeEvent } from 'react';
import '../css/EditProduct.css'
import { Product } from '../models/Product';
import { editProduct } from '../services/ProductService';

interface EditProductProps {
  productId: string;
  initialData: Product;
  onEditDone: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ productId, initialData, onEditDone }) => {
  const [editedData, setEditedData] = useState<Product>(initialData);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
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
      await editProduct(editedData);
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
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default EditProduct;