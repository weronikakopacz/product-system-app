import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UIProduct, { Product } from './UIProduct';
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';
import '../css/ProductList.css';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [editingProductId]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/getDisplayProducts');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (productId: string) => {
    setEditingProductId(productId);
  };

  const handleEditDone = () => {
    setEditingProductId(null);
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <UIProduct product={product} />
            <div>
              <button onClick={() => handleEdit(product.id)}>Edit</button>
              <DeleteProduct
                productId={product.id}
                onProductDeleted={fetchProducts}
              />
            </div>
            {editingProductId === product.id && (
              <EditProduct
                productId={product.id}
                initialData={product}
                onEditDone={handleEditDone}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;