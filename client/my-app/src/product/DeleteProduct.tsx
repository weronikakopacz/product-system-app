import React from 'react';
import axios from 'axios';

interface DeleteProductProps {
  productId: string;
  onProductDeleted: () => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ productId, onProductDeleted }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/delete/${productId}`);
      onProductDeleted();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete Product</button>
  );
};

export default DeleteProduct;