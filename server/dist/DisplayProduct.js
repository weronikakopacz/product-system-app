import { getDocs, query, where, collection } from 'firebase/firestore';
import { db } from './database/FirebaseConfig.js';
async function getDisplayProducts() {
    try {
        const productsCollection = collection(db, 'products');
        const q = query(productsCollection, where('isDeleted', '==', false));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => {
            const { isDeleted, ...rest } = doc.data();
            return {
                id: doc.id,
                ...rest,
            };
        });
    }
    catch (error) {
        console.error('Error getting active display products from the database:', error);
        throw error;
    }
}
export { getDisplayProducts };
//# sourceMappingURL=DisplayProduct.js.map