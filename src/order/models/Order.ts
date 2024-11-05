export interface Order {
    order_id?: number | null;
    user_id?: number;
    status?: string;
    description?: string;
    total?: number;
    created_at?: string;
    created_by?: string;
    updated_at?: string;
    updated_by?: string;
    deleted?: boolean;
    fullname?:String;
    items?: { product_name: string, quantity: number }[];
  }
  