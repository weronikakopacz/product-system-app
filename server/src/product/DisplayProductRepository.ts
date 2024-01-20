import { query, where, getDocs, collection, orderBy } from 'firebase/firestore';
import { db } from '../database/FirebaseConfig.js';
import { DisplayProduct } from '../models/IDisplayProduct.js';

async function getDisplayProducts(
  pageSize: number,
  searchQuery?: string,
  categoryIds?: string[]
): Promise<{ products: DisplayProduct[]; totalPages: number }> {
  try {
    const productsCollection = collection(db, 'products');

    let q = query(
      productsCollection,
      where('isDeleted', '==', false),
      orderBy('title')
    );

    if (searchQuery) {
      if (categoryIds && categoryIds.length > 0) {
        q = query(
          productsCollection,
          where('isDeleted', '==', false),
          where('title', '>=', searchQuery),
          where('title', '<=', searchQuery + '\uf8ff'),
          where('categoryIds', 'array-contains-any', categoryIds),
          orderBy('title')
        );
      } else {
        q = query(
          productsCollection,
          where('isDeleted', '==', false),
          where('title', '>=', searchQuery),
          where('title', '<=', searchQuery + '\uf8ff'),
          orderBy('title')
        );
      }
    } else if (categoryIds && categoryIds.length > 0) {
      q = query(
        productsCollection,
        where('isDeleted', '==', false),
        where('categoryIds', 'array-contains-any', categoryIds),
        orderBy('title')
      );
    }

    const querySnapshot = await getDocs(q);

    const displayProducts: DisplayProduct[] = querySnapshot.docs.map((doc) => {
      const { isDeleted, ...rest } = doc.data();
      return {
        id: doc.id,
        ...rest,
      } as DisplayProduct;
    });

    const totalProducts = await getDocs(q).then((snapshot) => snapshot.size);
    const totalPages = Math.ceil(totalProducts / pageSize);

    return { products: displayProducts, totalPages };
  } catch (error) {
    console.error('Error getting active display products from the database:', error);
    throw error;
  }
}

export { getDisplayProducts };