import { db } from '../database/FirebaseConfig.js';
import { Timestamp, addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Comment } from '../models/IComment.js';

async function addComment(productRef: string, newComment: Omit<Comment, 'id' | 'isDeleted' | 'creationDate' | 'productId'>): Promise<void> {
  try {
    if (!newComment.description) {
      throw new Error('Description is a required field');
    }

    const commentToAdd: Comment = {
      ...newComment,
      isDeleted: false,
      creationDate: Timestamp.now(),
      productId: productRef
    };

    const commentsCollection = collection(db, 'comments');
    const docRef = await addDoc(commentsCollection, commentToAdd);

    commentToAdd.id = docRef.id;
  } catch (error) {
    console.error('Error adding comment to the database:', error);
    throw error;
  }
}

async function deleteComment(commentId: string) {
  try {
    const commentsCollection = collection(db, 'comments');
    const commentRef = doc(commentsCollection, commentId);

    await updateDoc(commentRef, { isDeleted: true });
  } catch (error) {
    console.error('Error deleting comment from the database:', error);
    throw error;
  }
}

async function editComment(commentId: string, updatedFields: Pick<Comment, 'description' >) {
  try {
    const commentsCollection = collection(db, 'comments');
    const commentRef = doc(commentsCollection, commentId);

    const commentSnapshot = await getDoc(commentRef);

    if (commentSnapshot.exists() && !commentSnapshot.data().isDeleted) {
      await updateDoc(commentRef, updatedFields);
    } else {
      throw new Error('Comment not found or deleted');
    }
  } catch (error) {
    console.error('Error editing comment in the database:', error);
    throw error;
  }
}

export { addComment, deleteComment, editComment };