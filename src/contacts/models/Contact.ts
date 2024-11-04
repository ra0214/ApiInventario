export interface Contact {
    id: number | null;
    first_name: string;
    last_name: string;
    phone: string;
    email?: string;
    category: 'Amigos' | 'Familia' | 'Trabajo';
    is_favorite: boolean;
    deleted: boolean;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
}
