import { v4 as uuid } from "uuid";
import { z } from "zod";
import { LikeEntity } from "./post.types";

export const newLikeSchema = z.object({
    id: z.string().uuid(),
    post_id: z.string().uuid(),
    user_id: z.string().uuid(),
    created_at: z.date(),
})

export const likeFactory = (newLike: Omit<LikeEntity, 'id' | 'created_at'>) : LikeEntity => {
    const like = {
        id: uuid(),
        post_id: newLike.post_id,
        user_id: newLike.user_id,
        created_at: new Date(),
    }
    return like
}