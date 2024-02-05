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

type CommentEntity = {
    id: string;
    post_id: string;
    user_id: string;
    text: string;
    created_at: string;
    picture?: Blob;
    attachment?: string;
}

type LikeEntity = {
    id: string;
    post_id: string;
    user_id: string;
    created_at: string;
}

type EventEntity = {
    post_id: string;
    date: string;
    lat: number;
    lon: number;
}