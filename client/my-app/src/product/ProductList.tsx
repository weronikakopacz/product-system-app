import React, { useState, useEffect } from 'react';
import { Product } from '../models/Product';
import PrintProduct from './PrintProduct';
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';
import { fetchProducts } from '../services/ProductService';
import '../css/ProductList.css';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [editingProductId]);

  const fetchData = async () => {
    try {
      const productsData = await fetchProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error setting products in state:', error);
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
            <PrintProduct product={product} />
            <div>
              <button onClick={() => handleEdit(product.id)}>Edit</button>
              <DeleteProduct
                productId={product.id}
                onProductDeleted={fetchData}
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