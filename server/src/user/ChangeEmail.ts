import { collection, doc, updateDoc } from "@firebase/firestore";
import { getAuth, updateEmail } from "firebase/auth";
import { db } from "../database/FirebaseConfig.js";


const changeEmail = async (userId: string, newEmail: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        try {
            await updateEmail(user, newEmail);

            const usersCollection = collection(db, 'users');
            const userDoc = doc(usersCollection, userId);
            await updateDoc(userDoc, { email: newEmail });
        } catch (error) {
            console.error('Error updating email:', error);
            throw error;
        }
    } else {
        console.error('User not authenticated');
        throw new Error('User not authenticated');
    }
};

export { changeEmail };