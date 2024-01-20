import { Product } from "../models/IProduct.js";
import { db } from "../database/FirebaseConfig.js";
import { Timestamp, addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { deleteComment } from "../comment/CommentRepository.js";

async function addProduct(newProduct: Omit<Product, 'id' | 'isDeleted' | 'creationDate'>) {
  try {
    if (!newProduct.title || !newProduct.categoryIds || newProduct.categoryIds.length === 0) {
      throw new Error('Title and non-empty categoryIds are required fields');
    }

    const categoriesCollection = collection(db, 'categories');
    const categoriesQuery = query(categoriesCollection, where('isDeleted', '==', false));

    const existingCategoriesSnapshot = await getDocs(categoriesQuery);
    const existingCategoriesIds = existingCategoriesSnapshot.docs.map(doc => doc.id);

    const invalidCategoryIds = newProduct.categoryIds.filter(id => !existingCategoriesIds.includes(id));
    
    if (invalidCategoryIds.length > 0) {
      throw new Error(`Invalid categoryIds: ${invalidCategoryIds.join(', ')}`);
    }

    const productToAdd: Product = {
      ...newProduct,
      isDeleted: false,
      creationDate: Timestamp.now(),
    };

    const productsCollection = collection(db, 'products');
    const docRef = await addDoc(productsCollection, productToAdd);

    productToAdd.id = docRef.id;
  } catch (error) {
    console.error('Error adding product to the database:', error);
    throw error;
  }
}

async function deleteProduct(productId: string) {
  try {
    const commentsCollection = collection(db, 'comments');
    const commentsQuery = query(commentsCollection, where('productId', '==', productId));
    const querySnapshot = await getDocs(commentsQuery);

    const deleteCommentsPromises = querySnapshot.docs.map(async (commentDoc) => {
      await deleteComment(commentDoc.id);
    });
    await Promise.all(deleteCommentsPromises);

    const productsCollection = collection(db, 'products');
    const productRef = doc(productsCollection, productId);

    await updateDoc(productRef, { isDeleted: true });
  } catch (error) {
    console.error('Error deleting product and associated comments from the database:', error);
    throw error;
  }
}

async function editProduct(productId: string, updatedFields: Pick<Product, 'title' | 'description' | 'imageUrl' | 'categoryIds'>) {
  try {
    const productsCollection = collection(db, 'products');
    const productRef = doc(productsCollection, productId);

    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists() || productSnapshot.data().isDeleted) {
      throw new Error('Product not found or deleted');
    }

    const categoriesCollection = collection(db, 'categories');
    const categoriesQuery = query(categoriesCollection, where('isDeleted', '==', false));

    const existingCategoriesSnapshot = await getDocs(categoriesQuery);
    const existingCategoriesIds = existingCategoriesSnapshot.docs.map(doc => doc.id);

    const invalidCategoryIds = updatedFields.categoryIds.filter(id => !existingCategoriesIds.includes(id));

    if (invalidCategoryIds.length > 0) {
      throw new Error(`Invalid categoryIds: ${invalidCategoryIds.join(', ')}`);
    }

    await updateDoc(productRef, updatedFields);
  } catch (error) {
    console.error('Error editing product in the database:', error);
    throw error;
  }
}

export { addProduct, deleteProduct, editProduct };