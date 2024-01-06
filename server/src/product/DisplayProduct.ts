import { getDocs, query, where, collection, Timestamp } from 'firebase/firestore';
import { db } from '../database/FirebaseConfig.js';
import { DisplayProduct } from '../models/IDisplayProduct.js';

async function getDisplayProducts(): Promise<DisplayProduct[]> {
  try {
    const productsCollection = collection(db, 'products');
    const q = query(productsCollection, where('isDeleted', '==', false));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const { isDeleted, ...rest } = doc.data();
      return {
        id: doc.id,
        ...rest,
      } as DisplayProduct;
    });
  } catch (error) {
    console.error('Error getting active display products from the database:', error);
    throw error;
  }
}

export { getDisplayProducts };