import React from 'react';
import { Product } from '../models/IProduct';

const PrintProduct: React.FC<{ product: Product }> = ({ product }) => (
  <div>
    <h3>{product.title}</h3>
    <p>{product.description}</p>
    <p>Creator: {product.creatorUserId}</p>
    <p>Creation Date: {new Date(product.creationDate.seconds * 1000).toLocaleString()}</p>
    {product.imageUrl !== null && product.imageUrl !== undefined && product.imageUrl !== "" && (
      <img src={product.imageUrl} alt={product.title} />
    )}
  </div>
);

export default PrintProduct;

