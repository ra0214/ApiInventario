export interface Order{
    order_id: number | null;
    user_id: number;
    fullname: string;
    total:number;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean;
}