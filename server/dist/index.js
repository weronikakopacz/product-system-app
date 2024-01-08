import express from 'express';
import cors from 'cors';
import { addProduct, deleteProduct, editProduct } from './product/Product.js';
import { getDisplayProducts } from './product/DisplayProduct.js';
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json()); //parsowanie json
app.use(cors()); //komunikacja między serwerami
app.post('/api/add', async (req, res) => {
    try {
        const newProduct = req.body;
        await addProduct(newProduct);
        res.status(201).send('Product added successfully');
    }
    catch (error) {
        console.error('Error handling POST request:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.delete('/api/delete/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        await deleteProduct(productId);
        res.status(200).send('Product marked as deleted successfully');
    }
    catch (error) {
        console.error('Error handling DELETE request:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/api/getDisplayProducts', async (req, res) => {
    try {
        const currentPage = parseInt(req.query.currentPage, 10) || 1;
        const pageSize = 5;
        const displayProducts = await getDisplayProducts(pageSize);
        const startIdx = (currentPage - 1) * pageSize;
        const endIdx = startIdx + pageSize;
        const limitedDisplayProducts = displayProducts.products.slice(startIdx, endIdx);
        const totalPages = displayProducts.totalPages;
        res.status(200).json({ products: limitedDisplayProducts, totalPages });
    }
    catch (error) {
        console.error('Error getting active display products:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.put('/api/edit/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const updatedFields = req.body;
        await editProduct(productId, updatedFields);
        res.status(204).send();
    }
    catch (error) {
        console.error('Error editing product:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map