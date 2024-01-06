import { Timestamp } from "firebase/firestore";

interface DisplayProduct {
    id: string;
    title: string;
    description: string;
    creationDate: Timestamp;
    creatorUserId: string;
    imageUrl: string;
  }

export { DisplayProduct }