import { v4 as uuid } from "uuid";
import { LikeEntity } from "./post.types";
import { z } from "zod";

const newLikeSchema = z.object({
    id: z.string().uuid(),
    post_id: z.string().uuid(),
    user_id: z.string().uuid(),
    created_at: z.string().datetime(),
})

const likeFactory = (newLike: Omit<LikeEntity, 'id' | 'created_at'>) : LikeEntity => {
    const like = {
        id: uuid(),
        post_id: newLike.post_id,
        user_id: newLike.user_id,
        created_at: new Date().toLocaleString(),
    }
    return like
}