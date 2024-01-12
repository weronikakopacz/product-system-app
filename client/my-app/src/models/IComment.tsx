interface Comment {
    id: string;
    productId: string;
    description: string;
    creationDate: { seconds: number; nanoseconds: number };
    creatorUserId: string;
}

export type { Comment }