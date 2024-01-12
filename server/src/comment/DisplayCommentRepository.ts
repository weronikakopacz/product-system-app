import { collection, getDocs, orderBy, query, where } from '@firebase/firestore';
import { db } from '../database/FirebaseConfig.js';
import { DisplayComment } from '../models/IDisplayComment.js';

async function getDisplayComments(productRef: string): Promise<{ comments: DisplayComment[] }> {
  try {
    const commentsCollection = collection(db, 'comments');

    let q = query(
      commentsCollection,
      where('isDeleted', '==', false),
      where('productId', "==", productRef),
      orderBy('creationDate')
    );

    const querySnapshot = await getDocs(q);

    const displayComments: DisplayComment[] = querySnapshot.docs.map((doc) => {
      const { isDeleted, ...rest } = doc.data();
      return {
        id: doc.id,
        ...rest,
      } as DisplayComment;
    });

    return { comments: displayComments };
  } catch (error) {
    console.error('Error getting active display comments from the database:', error);
    throw error;
  }
}

export { getDisplayComments };