import { getDocs, doc, getDoc, collection, query, where } from 'firebase/firestore';
import { db } from '../database/FirebaseConfig.js';
import { DisplayProduct } from '../models/IDisplayProduct.js';

async function getProductDetails(productId: string): Promise<{ product: DisplayProduct }> {
  try {
    const productsCollection = collection(db, 'products');
    const q = query(productsCollection, where('isDeleted', '==', false));
    const querySnapshot = await getDocs(q);

    const productDoc = querySnapshot.docs.find(doc => doc.id === productId);

    if (productDoc) {
      const docSnapshot = await getDoc(productDoc.ref);

      if (docSnapshot.exists()) {
        const { isDeleted, ...rest } = docSnapshot.data();
        return {
          product: {
            id: docSnapshot.id,
            ...rest,
          } as DisplayProduct,
        };
      } else {
        throw new Error(`Product with ID ${productId} not found.`);
      }
    } else {
      throw new Error(`Product with ID ${productId} not found or is deleted.`);
    }
  } catch (error) {
    console.error('Error getting product by id:', error);
    throw error;
  }
}

export { getProductDetails };