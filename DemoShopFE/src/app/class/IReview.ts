export interface IReview {
  reviews: Review[]
}

export interface Review {
  id: number;
  comment: string;
  rating: number;
  user_id: number;
  product_id: number;
  created_at: Date;
  updated_at: Date;
}
