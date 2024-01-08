import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '../models/IProduct';
import PrintProduct from './PrintProduct';
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';
import { fetchProducts } from '../services/ProductService';
import '../css/ProductList.css';
import '../css/Pagination.css'

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetchProducts(currentPage);
      setProducts(response.products);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error setting products in state:', error);
    }
  }, [currentPage]);

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
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <PrintProduct product={product} />
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
      <div className="pagination-container">
      <div className="pagination">
        <button
          className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`page-link ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          &raquo;
        </button>
      </div>
    </div>
  </div>
)};

export default ProductList;