import { v4 as uuid } from "uuid";

const commentFactory = (newComment: Omit<CommentEntity, 'id' | 'created_at'>) => {
    const comment: CommentEntity = {
        id: uuid(),
        post_id: newComment.post_id,
        user_id: newComment.user_id,
        text: newComment.text,
        created_at: new Date().toLocaleString(),
        
    }
}