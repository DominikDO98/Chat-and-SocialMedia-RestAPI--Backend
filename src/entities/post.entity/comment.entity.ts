import { v4 as uuid } from "uuid";
import { CommentEntity } from "./post.types";

const commentFactory = (newComment: Omit<CommentEntity, 'id' | 'created_at'>) : CommentEntity => {
    const comment: CommentEntity = {
        id: uuid(),
        post_id: newComment.post_id,
        user_id: newComment.user_id,
        text: newComment.text,
        created_at: new Date().toLocaleString(),
        picture: newComment.picture ? newComment.picture : undefined,
        attachment: newComment.attachment ? newComment.attachment : undefined,
    }
    return comment
}