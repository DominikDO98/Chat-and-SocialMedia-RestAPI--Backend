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

type ConversationEntity = {
    id: string;
    is_group: boolean;
    name: string;
}

type ContactEntity = {
    id: string;
    converation_id: string;
}

type Invitation = {
    id: string;
    from_user_id: string;
    to_user_id: string;
}