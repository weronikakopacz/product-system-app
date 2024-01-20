import express from 'express';
import { addCategory, deleteCategory, editCategory } from '../category/CategoryRepository.js';
import { authenticateAdmin } from '../user/AuthMiddleware.js';
import { getDisplayCategories } from '../category/DisplayCategoryRepository.js';

const categoryRouter = express.Router();

categoryRouter.post('/add', authenticateAdmin, async (req, res) => {
  try {
    const newCategory = req.body;
    await addCategory(newCategory);
    res.status(201).json({ message: 'Category added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

categoryRouter.put('/edit/:categoryId', authenticateAdmin, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const updatedFields = req.body;
    if ('name' in updatedFields && updatedFields.name.trim() === '') {
      return res.status(400).send('Name cannot be empty');
    }

    await editCategory(categoryId, updatedFields);
    res.json({ message: 'Category edited successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

categoryRouter.delete('/delete/:categoryId', authenticateAdmin, async (req, res) => {
  try {
    const { categoryId } = req.params;
    await deleteCategory(categoryId);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

categoryRouter.get('/display-categories', async (_req, res) => {
  try {
    const result = await getDisplayCategories();
    res.json(result);
  } catch (error) {
    console.error('Error in /api/display-categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default categoryRouter;