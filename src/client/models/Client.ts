export interface Client{
    client_id: number | null;
    fullname: string;
    password: string;
    celphone: number;
    email:string;
    role_id_fk: number;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean;
}