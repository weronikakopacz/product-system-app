import axios from "axios";
import { Category } from "../models/ICategory";

const API_BASE_URL = 'http://localhost:8080/api/categories';

export const addCategory = async (newCategoryData: any, accessToken: string): Promise<void> => {
  try {
    await axios.post<void>(`${API_BASE_URL}/add`, newCategoryData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};

export const editCategory = async (categoryId: string, updatedFields: Pick<Category, 'name'>, accessToken: string): Promise<void> => {
  try {
    await axios.put<void>(`${API_BASE_URL}/edit/${categoryId}`, updatedFields, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error('Error editing category:', error);
    throw error;
  }
};

export const deleteCategory = async (categoryId: string, accessToken: string): Promise<void> => {
  try {
    await axios.delete<void>(`${API_BASE_URL}/delete/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

export const getDisplayCategories = async (): Promise<{ categories: Category[] }> => {
  try {
    const response = await axios.get<{ categories: Category[] }>(`${API_BASE_URL}/display-categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getCategoryNames = async (categoryIds: string[]): Promise<string[]> => {
  try {
    const response = await axios.get<{ categories: Category[] }>(`${API_BASE_URL}/display-categories`);
    const categories = response.data.categories;
    const filteredCategories = categories.filter(category => categoryIds.includes(category.id));
    const categoryNames = filteredCategories.map(category => category.name);
    return categoryNames;
  } catch (error) {
    console.error('Error fetching category names:', error);
    throw error;
  }
};