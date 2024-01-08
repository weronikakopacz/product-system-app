interface Product {
    id: string;
    title: string;
    description: string;
    creatorUserId: string;
    creationDate: { seconds: number; nanoseconds: number };
    imageUrl: string;
  }

export type { Product }