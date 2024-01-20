import axios from 'axios';
import { Product } from '../models/IProduct';

const API_BASE_URL = 'http://localhost:8080/api/products';

export const fetchProducts = async (currentPage: number, searchQuery?: string, categoryIds?: string[]): Promise<{ products: Product[], totalPages: number }> => {
  try {
    const categoryIdsParam = categoryIds ? JSON.stringify(categoryIds) : undefined;
    const url = `${API_BASE_URL}/getDisplayProducts?currentPage=${currentPage}${searchQuery ? `&searchQuery=${searchQuery}` : ''}${categoryIdsParam ? `&categoryIds=${categoryIdsParam}` : ''}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  };
};

export const editProduct = async (editedData: Product, accessToken: string): Promise<void> => {
  const { id, ...dataWithoutId } = editedData;
  try {
    await axios.put(`${API_BASE_URL}/edit/${id}`, dataWithoutId, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error('Error editing product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId: string, accessToken: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/delete/${productId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const addProduct = async (newProductData: any): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/add`, newProductData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const getProductById = async (productId: string): Promise<Product> => {
  try {
    const url = `${API_BASE_URL}/getDisplayProducts/${productId}`;
    const response = await axios.get(url);
    return response.data.product;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};