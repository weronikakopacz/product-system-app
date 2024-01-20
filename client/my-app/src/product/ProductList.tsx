import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '../models/IProduct';
import { fetchProducts } from '../services/ProductService';
import { getDisplayCategories } from '../services/CategoryService';
import Select from 'react-select';
import '../css/ProductList.css';
import Pagination from '../pages/Pagination';
import '../css/Search.css';
import { Link } from 'react-router-dom';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<{ value: string; label: string }[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<{ value: string; label: string }[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetchProducts(currentPage, searchQuery, selectedCategories.map((option) => option.value));
      setProducts(response.products);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error setting products in state:', error);
    }
  }, [currentPage, searchQuery, selectedCategories]);

  useEffect(() => {
    fetchData();
  }, [fetchData, currentPage, selectedCategories, searchQuery]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getDisplayCategories();
        const formattedCategories = result.categories.map(category => ({
          value: category.id,
          label: category.name
        }));
        setCategoryOptions(formattedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handlePageChange = async (newPage: number): Promise<void> => {
    try {
      await fetchData();
      setCurrentPage(newPage);
    } catch (error) {
      console.error('Error handling page change:', error);
    }
  };

  return (
    <div className="product-list-container">
      <h1 className="product-list-title">Product List</h1>
      <div className="search-container">
        <label htmlFor="search" className="search-label">
          Search:
        </label>
        <input type="text" id="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <label htmlFor="categoryIds" className="category-label">
          Select Categories:
        </label>
        <Select
          className="category-select"
          isMulti
          options={categoryOptions}
          value={selectedCategories}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          onChange={(selectedOptions) => setSelectedCategories(selectedOptions as { value: string; label: string }[])}
        />
        <button className="search-button" onClick={() => { setCurrentPage(1); fetchData(); }}>
          Search
        </button>
      </div>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <Link to={`/product/${product.id}`} className="product-link">
              <div className="product-details">
                <h2 className="product-title">{product.title}</h2>
                {product.imageUrl && (
                  <img src={product.imageUrl} alt={product.title} className="product-image" />
                )}
              </div>
            </Link>
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
