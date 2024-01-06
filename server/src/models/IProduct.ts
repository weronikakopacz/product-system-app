import { Timestamp } from "firebase/firestore";

interface Product {
    id?: string;
    title: string;
    description: string;
    isDeleted: boolean;
    creationDate: Timestamp;
    creatorUserId: string;
    imageUrl: string;
  }

export { Product } 