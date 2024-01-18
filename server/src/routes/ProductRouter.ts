import express from 'express';
import { addProduct, deleteProduct, editProduct } from '../product/ProductRepository.js';
import { getDisplayProducts } from '../product/DisplayProductRepository.js';
import { Product } from '../models/IProduct.js';
import { getProductDetails } from '../product/ProductDetails.js';
import verifyToken, { DecodedToken } from '../user/VerifyToken.js';

const productRouter = express.Router();
const PAGE_NUMBER = 5;


productRouter.post('/add', async (req, res) => {
  try {
    const newProduct: Product = req.body;
    await addProduct(newProduct);

    res.status(201).send('Product added successfully');
  } catch (error) {
    console.error('Error handling POST request:', error);
    res.status(500).send('Internal Server Error');
  }
});

productRouter.delete('/delete/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const accessToken = req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decodedToken: DecodedToken | null = await verifyToken(accessToken);

    if (!decodedToken || decodedToken.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied. User is not an admin.' });
    }

    await deleteProduct(productId);

    res.status(200).send('Product marked as deleted successfully');
  } catch (error) {
    console.error('Error handling DELETE request:', error);
    res.status(500).send('Internal Server Error');
  }
});

productRouter.get('/getDisplayProducts', async (req, res) => {
  try {
    const currentPage = parseInt(req.query.currentPage as string, 10) || 1;
    const searchQuery = req.query.searchQuery as string | undefined;

    const displayProducts = await getDisplayProducts(PAGE_NUMBER, searchQuery);

    const startIdx = (currentPage - 1) * PAGE_NUMBER;
    const endIdx = startIdx + PAGE_NUMBER;
    const limitedDisplayProducts = displayProducts.products.slice(startIdx, endIdx);

    const totalPages = displayProducts.totalPages;

    res.status(200).json({ products: limitedDisplayProducts, totalPages });
  } catch (error) {
    console.error('Error getting active display products:', error);
    res.status(500).send('Internal Server Error');
  }
});

productRouter.get('/getDisplayProducts/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const { product } = await getProductDetails(productId);

    res.status(200).json({ product });
  } catch (error) {
    console.error('Error getting product by id:', error);
    res.status(500).send('Internal Server Error');
  }
});

productRouter.put('/edit/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const updatedFields = req.body;

    if ('title' in updatedFields && updatedFields.title.trim() === '') {
      return res.status(400).send('Title cannot be empty');
    }

    await editProduct(productId, updatedFields);

    res.status(204).send();
  } catch (error) {
    console.error('Error editing product:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default productRouter;