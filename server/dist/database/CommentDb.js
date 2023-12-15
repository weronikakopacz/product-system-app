import { db } from './FirebaseConfig.js';
import { addDoc, collection } from 'firebase/firestore';
async function addComment(comment) {
    const commentsCollection = collection(db, 'comments');
    await addDoc(commentsCollection, comment);
}
export { addComment };
//# sourceMappingURL=CommentDb.js.map