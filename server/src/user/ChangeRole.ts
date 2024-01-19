import { collection, doc, getDoc, updateDoc } from "@firebase/firestore";
import { db } from "../database/FirebaseConfig.js";

async function changeRole(userId: string, newRole: string) {
    try {
      const usersCollection = collection(db, 'users');
      const userRef = doc(usersCollection, userId);

      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        await updateDoc(userRef, { role: newRole });
      } else {
        throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error editing user in the database:', error);
    throw error;
  }
}

export { changeRole }