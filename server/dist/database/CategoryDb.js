import { addDoc, collection } from 'firebase/firestore';
import { db } from './FirebaseConfig.js';
async function addCategory(category) {
    const categoriesCollection = collection(db, 'categories');
    await addDoc(categoriesCollection, category);
}
export { addCategory };
//# sourceMappingURL=CategoryDb.js.map