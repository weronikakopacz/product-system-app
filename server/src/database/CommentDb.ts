import { db } from './FirebaseConfig.js';
import { Timestamp, addDoc, collection } from 'firebase/firestore';

interface Comment {
    productId: string;
    description: string;
    creationDate: Timestamp;
    isDeleted: boolean;
    creatorUserId: string;
}

async function addComment(comment: Comment) {
    const commentsCollection = collection(db, 'comments');
    await addDoc(commentsCollection, comment);
  }
  
export { addComment };