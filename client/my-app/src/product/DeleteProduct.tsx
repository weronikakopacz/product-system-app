import React from 'react';
import { deleteProduct } from '../services/ProductService';

interface DeleteProductProps {
  productId: string;
  onProductDeleted: () => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ productId, onProductDeleted }) => {
  const handleDelete = async () => {
    try {
      await deleteProduct(productId);
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