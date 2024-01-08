import { query, where, getDocs, collection, orderBy } from 'firebase/firestore';
import { db } from '../database/FirebaseConfig.js';
async function getDisplayProducts(pageSize) {
    try {
        const productsCollection = collection(db, 'products');
        const q = query(productsCollection, where('isDeleted', '==', false), orderBy('creationDate'));
        const querySnapshot = await getDocs(q);
        const displayProducts = querySnapshot.docs.map((doc) => {
            const { isDeleted, ...rest } = doc.data();
            return {
                id: doc.id,
                ...rest,
            };
        });
        const totalProducts = await getDocs(q).then(snapshot => snapshot.size);
        const totalPages = Math.ceil(totalProducts / pageSize);
        return { products: displayProducts, totalPages };
    }
    catch (error) {
        console.error('Error getting active display products from the database:', error);
        throw error;
    }
}
export { getDisplayProducts };
//# sourceMappingURL=DisplayProduct.js.map