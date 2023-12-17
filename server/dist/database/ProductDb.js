import { db } from "./FirebaseConfig.js";
import { Timestamp, addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
async function addProduct(newProduct) {
    try {
        if (!newProduct.title) {
            throw new Error('Title is required field');
        }
        const productToAdd = {
            ...newProduct,
            isDeleted: false,
            creationDate: Timestamp.now(),
        };
        const productsCollection = collection(db, 'products');
        const docRef = await addDoc(productsCollection, productToAdd);
        productToAdd.id = docRef.id;
    }
    catch (error) {
        console.error('Error adding product to the database:', error);
        throw error;
    }
}
async function deleteProduct(productId) {
    try {
        const productsCollection = collection(db, 'products');
        const productRef = doc(productsCollection, productId);
        await updateDoc(productRef, { isDeleted: true });
    }
    catch (error) {
        console.error('Error deleting product from the database:', error);
        throw error;
    }
}
async function editProduct(productId, updatedFields) {
    try {
        const productsCollection = collection(db, 'products');
        const productRef = doc(productsCollection, productId);
        const productSnapshot = await getDoc(productRef);
        if (productSnapshot.exists() && !productSnapshot.data().isDeleted) {
            await updateDoc(productRef, updatedFields);
        }
        else {
            throw new Error('Product not found or deleted');
        }
    }
    catch (error) {
        console.error('Error editing product in the database:', error);
        throw error;
    }
}
export { addProduct, deleteProduct, editProduct };
//# sourceMappingURL=ProductDb.js.map