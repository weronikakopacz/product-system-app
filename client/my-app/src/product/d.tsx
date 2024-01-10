import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '../models/IProduct';
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';
import { fetchProducts } from '../services/ProductService';
import '../css/ProductList.css';
import Pagination from '../pages/Pagination';
import '../css/Search.css'
import { Link } from 'react-router-dom';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchData = useCallback(async () => {
    try {
      const response = await fetchProducts(currentPage, searchQuery);
      setProducts(response.products);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error setting products in state:', error);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData, editingProductId, currentPage]);

  const handleEdit = (productId: string) => {
    setEditingProductId(productId);
  };

  const handleEditDone = () => {
    setEditingProductId(null);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1>Product List</h1>
      <div className="search-container">
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button className="search-button" onClick={() => { setCurrentPage(1); fetchData(); }} > Search </button>
      </div>
      <ul>
      {products.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              <div>
                  <h2>{product.title}</h2>
                  {product.imageUrl !== null && product.imageUrl !== undefined && product.imageUrl !== "" && (
                  <img src={product.imageUrl} alt={product.title} />
                  )}
              </div>
            </Link>
            <div>
              <button onClick={() => handleEdit(product.id)}>Edit</button>
              <DeleteProduct productId={product.id} onProductDeleted={() => fetchData()} />
            </div>
            {editingProductId === product.id && (
              <EditProduct productId={product.id} initialData={product} onEditDone={handleEditDone} />
            )}
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;