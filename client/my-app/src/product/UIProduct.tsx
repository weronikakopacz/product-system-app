import React from 'react';

interface Product {
  id: string;
  title: string;
  description: string;
  creatorUserId: string;
  creationDate: { seconds: number; nanoseconds: number };
  imageUrl: string;
}

const UIProduct: React.FC<{ product: Product }> = ({ product }) => (
  <div>
    <h3>{product.title}</h3>
    <p>{product.description}</p>
    <p>Creator: {product.creatorUserId}</p>
    <p>Creation Date: {new Date(product.creationDate.seconds * 1000).toLocaleString()}</p>
    <img src={product.imageUrl} alt={product.title} />
  </div>
);

export default UIProduct;
export type { Product };

