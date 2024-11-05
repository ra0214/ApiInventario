export interface product {
  product_id: number | null;
  name: string;
  description: string;
  stock_boxes: number;
  stock_individual: number;
  deleted: boolean;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}
