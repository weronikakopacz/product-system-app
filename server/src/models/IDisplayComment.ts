import { Timestamp } from "@firebase/firestore";

interface DisplayComment {
    id: string;
    productId: string;
    description: string;
    creationDate: Timestamp;
    creatorUserId: string;
}

export { DisplayComment }