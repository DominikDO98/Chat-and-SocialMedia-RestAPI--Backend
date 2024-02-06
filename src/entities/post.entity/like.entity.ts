import { v4 as uuid } from "uuid";
import { LikeEntity } from "./post.types";

const likeFactory = (newLike: Omit<LikeEntity, 'id' | 'created_at'>) => {
    const like = {
        id: uuid(),
        post_id: newLike.post_id,
        user_id: newLike.user_id,
        created_at: new Date().toLocaleString(),
    }
    return like
}