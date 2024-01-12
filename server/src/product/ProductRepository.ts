import { Product } from "../models/IProduct.js";
import { db } from "../database/FirebaseConfig.js";
import { Timestamp, addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { deleteComment } from "../comment/CommentRepository.js";

async function addProduct(newProduct: Omit<Product, 'id' | 'isDeleted' | 'creationDate'>) {
  try {
    if (!newProduct.title) {
      throw new Error('Title is required field');
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
    const productsCollection = collection(db, 'products');
    const productRef = doc(productsCollection, productId);

    //usuwanie komentarzy do produktu
    const commentsCollection = collection(db, 'comments');
    const commentsQuery = query(commentsCollection, where('productId', '==', productId));
    const querySnapshot = await getDocs(commentsQuery);

    const deleteCommentsPromises = querySnapshot.docs.map(async (commentDoc) => {
      await deleteComment(commentDoc.id);
    });
    await Promise.all(deleteCommentsPromises);

    await updateDoc(productRef, { isDeleted: true });
  } catch (error) {
    console.error('Error deleting product and associated comments from the database:', error);
    throw error;
  }
}

async function editProduct(productId: string, updatedFields: Pick<Product, 'title' | 'description' | 'imageUrl'>) {
  try {
    const productsCollection = collection(db, 'products');
    const productRef = doc(productsCollection, productId);

    const productSnapshot = await getDoc(productRef);

    if (productSnapshot.exists() && !productSnapshot.data().isDeleted) {
      await updateDoc(productRef, updatedFields);
    } else {
      throw new Error('Product not found or deleted');
    }
  } catch (error) {
    console.error('Error editing product in the database:', error);
    throw error;
  }
}

export { addProduct, deleteProduct, editProduct };