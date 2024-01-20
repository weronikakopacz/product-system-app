import express from 'express';
import cors from 'cors';
import productRouter from './routes/ProductRouter.js';
import commentRouter from './routes/CommentRouter.js';
import userRouter from './routes/UserRouter.js';
import categoryRouter from './routes/CategoryRouter.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); // Parsowanie JSON
app.use(cors()); // Komunikacja między serwerami

app.use('/api/products', productRouter);
app.use('/api/comments', commentRouter);
app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});