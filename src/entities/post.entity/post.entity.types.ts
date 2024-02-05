type PostEntity = {
    id: string;
    user_id: string;
    group_id?: string;
    title: string;
    text: string;
    picture?: Blob;
    attachment?: string;
    created_at: string;
    type: number;
}