import { addDoc, collection } from 'firebase/firestore';
import { db } from '../database/FirebaseConfig.js';

interface Category {
    name: string;
}

async function addCategory(category: Category) {
  const categoriesCollection = collection(db, 'categories');
  await addDoc(categoriesCollection, category);
}

export { addCategory };