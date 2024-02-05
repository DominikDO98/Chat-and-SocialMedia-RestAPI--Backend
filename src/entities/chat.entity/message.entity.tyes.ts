type MessageEntity = {
    id: string;
    conversaiton_id: string;
    text: string;
    created_at: string;
    send_by: string;
    is_deliverd: boolean;
    picture?: Blob;
    attachment?: string;
}