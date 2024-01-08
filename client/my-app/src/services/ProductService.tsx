import axios from 'axios';
import { Product } from '../models/IProduct';

const API_BASE_URL = 'http://localhost:8080/api';

export const fetchProducts = async (currentPage: number): Promise<{ products: Product[], totalPages: number }> => {
  try {
    const url = `${API_BASE_URL}/getDisplayProducts?currentPage=${currentPage}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  };
};

export const editProduct = async (editedData: Product): Promise<void> => {
  const { id, ...dataWithoutId } = editedData;
  try {
    await axios.put(`${API_BASE_URL}/edit/${id}`, dataWithoutId);
  } catch (error) {
    console.error('Error editing product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/delete/${productId}`);
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