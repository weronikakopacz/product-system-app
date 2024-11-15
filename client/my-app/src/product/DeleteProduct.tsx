import React, { useEffect, useState } from 'react';
import { deleteProduct } from '../services/ProductService';
import { getAccessToken } from '../services/AuthService';
import { checkUserRole } from '../user/CheckUserRole';

interface DeleteProductProps {
  productId: string;
  onProductDeleted: () => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ productId, onProductDeleted }) => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await checkUserRole();
      setUserRole(role);
    };

    fetchUserRole();
  }, []);

  const handleDelete = async () => {
    try {
      const accessToken = getAccessToken();

      if (userRole !== 'user' && accessToken) {
        await deleteProduct(productId, accessToken);
        onProductDeleted();
      } else {
        console.error('User does not have admin privileges or accessToken is null.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (userRole === null) {
    // Warunkowe renderowanie
    return null;
  }

  return userRole !== 'user' ? (
    <button className="button" onClick={handleDelete}>
      Delete Product
    </button>
  ) : null;
};

export default DeleteProduct;