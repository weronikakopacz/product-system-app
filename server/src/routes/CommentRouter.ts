import express, { Request, Response } from "express";
import { Comment } from '../models/IComment.js';
import { addComment, deleteComment, editComment } from "../comment/CommentRepository.js";
import { getProductDetails } from "../product/ProductDetails.js";
import { getDisplayComments } from "../comment/DisplayCommentRepository.js";
import verifyToken, { DecodedToken } from "../user/VerifyToken.js";

const commentRouter = express.Router();

commentRouter.post('/add/:productId', async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const newComment: Comment = req.body;

    const { product } = await getProductDetails(productId);

    if (!product) {
      return res.status(404).send('Product not found or deleted');
    }

    await addComment(productId, newComment);

    res.status(201).send('Comment added successfully');
  } catch (error) {
    console.error('Error handling POST request:', error);
    res.status(500).send('Internal Server Error');
  }
});

commentRouter.delete('/delete/:commentId', async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const accessToken = req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decodedToken: DecodedToken | null = await verifyToken(accessToken);

    if (!decodedToken || decodedToken.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied. User is not an admin.' });
    }
    
    await deleteComment(commentId);

    res.status(200).send('Comment marked as deleted successfully');
  } catch (error) {
    console.error('Error handling DELETE request:', error);
    res.status(500).send('Internal Server Error');
  }
});

commentRouter.put('/edit/:commentId', async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const updatedFields = req.body;

    if ('description' in updatedFields && updatedFields.description.trim() === '') {
      return res.status(400).send('Description cannot be empty');
    }

    await editComment(commentId, updatedFields);

    res.status(204).send();
  } catch (error) {
    console.error('Error editing comment:', error);
    res.status(500).send('Internal Server Error');
  }
});

commentRouter.get('/getDisplayComments/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const { comments: displayComments } = await getDisplayComments(productId);

    res.status(200).json({ comments: displayComments });
  } catch (error) {
    console.error('Error getting product by id:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default commentRouter;