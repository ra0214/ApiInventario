export interface User {
    user_id: number | null;
    username: string;
    password: string;
    role: 'admin' | 'employee' | 'company';
    deleted: boolean;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
}
