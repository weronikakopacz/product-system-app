import { collection, getDocs, query, where } from '@firebase/firestore';
import { db } from '../database/FirebaseConfig.js'
import { DisplayCategory } from '../models/IDisplayCategory.js';

async function getDisplayCategories(): Promise<{ categories: DisplayCategory[] }> {
  try {
    const categoriesCollection = collection(db, 'categories');

    let q = query(categoriesCollection, where('isDeleted', '==', false));
    const querySnapshot = await getDocs(q);

    const displayCategories: DisplayCategory[] = querySnapshot.docs.map((doc) => {
      const { isDeleted, ...rest } = doc.data();
      return {
        id: doc.id,
        ...rest,
      } as DisplayCategory;
    });

    return { categories: displayCategories };
  } catch (error) {
    console.error('Error getting active display categories from the database:', error);
    throw error;
  }
}

export { getDisplayCategories };