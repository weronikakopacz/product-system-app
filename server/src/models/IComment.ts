import { Timestamp } from "@firebase/firestore";

interface Comment {
    id?: string;
    productId: string;
    description: string;
    creationDate: Timestamp;
    isDeleted: boolean;
    creatorUserId: string;
}

export { Comment }
