export interface IProduct {
  _id: string;
  image: string;
  status: boolean;
  quantity?: number;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews: string;
  email: string | null;
}
