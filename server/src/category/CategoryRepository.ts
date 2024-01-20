import { db } from '../database/FirebaseConfig.js';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Category } from '../models/ICategory.js'
import { Product } from '../models/IProduct.js';

async function addCategory(newCategory: Omit<Category, 'id' | 'isDeleted'>): Promise<void> {
  try {
    if (!newCategory.name) {
      throw new Error('Description is a required field');
    }

    const categoryToAdd: Category = {
      ...newCategory,
      isDeleted: false,
    };

    const categoriesCollection = collection(db, 'categories');
    const docRef = await addDoc(categoriesCollection, categoryToAdd);

    categoryToAdd.id = docRef.id;
  } catch (error) {
    console.error('Error adding category to the database:', error);
    throw error;
  }
}

async function deleteCategory(categoryId: string) {
  try {
    const productsCollection = collection(db, 'products');
    const productsQuery = query(productsCollection, where('categoryIds', 'array-contains', categoryId));
    const productsSnapshot = await getDocs(productsQuery);

    const updateProductsPromises = productsSnapshot.docs.map(async (productDoc) => {
      const productRef = doc(productsCollection, productDoc.id);
      const productData = productDoc.data() as Product;

      const updatedCategoryIds = productData.categoryIds.filter(id => id !== categoryId);

      await updateDoc(productRef, { categoryIds: updatedCategoryIds });
    });
    await Promise.all(updateProductsPromises);

    const categoriesCollection = collection(db, 'categories');
    const categoryRef = doc(categoriesCollection, categoryId);
    await updateDoc(categoryRef, { isDeleted: true });

  } catch (error) {
    console.error('Error deleting category from the database:', error);
    throw error;
  }
}

async function editCategory(categoryId: string, updatedFields: Pick<Category, 'name' >) {
  try {
    const categoriesCollection = collection(db, 'categories');
    const categoryRef = doc(categoriesCollection, categoryId);

    const categorySnapshot = await getDoc(categoryRef);

    if (categorySnapshot.exists() && !categorySnapshot.data().isDeleted) {
      await updateDoc(categoryRef, updatedFields);
    } else {
      throw new Error('Category not found or deleted');
    }
  } catch (error) {
    console.error('Error editing category in the database:', error);
    throw error;
  }
}

export { addCategory, editCategory, deleteCategory };