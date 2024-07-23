export interface Product {
    product_id: number | null;
    product_name: string;
    price: number;
    stock: number;
    description: string;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted: boolean;
    url?: string;
  }