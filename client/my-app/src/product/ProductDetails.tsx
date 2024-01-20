import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/ProductService';
import { Product } from '../models/IProduct';
import { getUserEmail } from '../services/UserService';
import { getCategoryNames } from '../services/CategoryService';
import '../css/ProductDetails.css';
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';
import CommentList from '../comment/CommentList';
import AddComment from '../comment/AddComment';
import { checkUserUid } from '../user/CheckUserUid';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [creatorEmail, setCreatorEmail] = useState<string | null>('');
  const [categoryNames, setCategoryNames] = useState<string[]>([]);
  const [userUid, setUserUid] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const productData = await getProductById(id);
          if (productData) {
            setProduct(productData);
            if (productData.creatorUserId) {
              const userData = await getUserEmail(productData.creatorUserId);
              setCreatorEmail(userData.email);
            }
            const categoryNames = await getCategoryNames(productData.categoryIds);
            setCategoryNames(categoryNames);
            const uid = await checkUserUid();
            setUserUid(uid);
          } else {
            console.error('Product details not found.');
          }
        }
      } catch (error) {
        console.error('Error setting products in state:', error);
      }
    };

    fetchData();
  }, [id, editingProductId]);

  const handleEdit = () => {
    setEditingProductId(product?.id || '');
  };

  const handleEditDone = () => {
    setEditingProductId(null);
  };

  const handleDelete = async () => {
    try {
      navigate('/');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleCommentAdded = () => {
    try {
      window.location.reload();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      {product ? (
        <div>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Creator: {creatorEmail}</p>
          <p>Creation Date: {new Date(product.creationDate.seconds * 1000).toLocaleString()}</p>
          <p>Categories: {categoryNames.join(', ')}</p>
          {product.imageUrl && <img src={product.imageUrl} alt={product.title} />}
          <div>
          {userUid === product.creatorUserId && (
                  <>
                    <button className="button" onClick={() => handleEdit}>
                      Edit
                    </button>
                  </>
                )}
            <DeleteProduct productId={product.id} onProductDeleted={handleDelete} />
          </div>
          {editingProductId === product.id && (
            <EditProduct productId={product.id} initialData={product} onEditDone={handleEditDone} />
          )}
          <AddComment productId={product.id} onCommentAdded={handleCommentAdded} />
          <CommentList productId={product.id} />
        </div>
      ) : (
        <p>{'Product details not available.'}</p>
      )}
    </div>
  );
};

export default ProductDetails;