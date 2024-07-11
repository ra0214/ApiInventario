export interface Product {
    product_id: number | null;
    product_name: string;
    price: number;
    stock: number;
    description: string;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean;
}