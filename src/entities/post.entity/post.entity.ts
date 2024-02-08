import { v4 as uuid } from "uuid";
import { PostEntity } from "./post.types";
import { z } from "zod";


const newPostSchema = z.object({
    id: z.string().uuid(),
    user_id: z.string().uuid(),
    group_id: z.string().uuid().optional(),
    title: z.string().min(3).max(30),
    text: z.string().min(3).max(200),
    picture: z.any(z.instanceof(Blob)).optional(),
    attachment: z.string().min(3).max(200).optional(),
    created_at: z.string().datetime(),
    type: z.number(),
})

const postFactory = (newPost: Omit<PostEntity, 'id' | 'created_at'>) : PostEntity => {
    const post: PostEntity = {
        id: uuid(),
        user_id: newPost.user_id,
        group_id: newPost.group_id ? newPost.group_id : undefined,
        title: newPost.title,
        text: newPost.text,
        picture: newPost.picture ? newPost.picture : undefined,
        attachment: newPost.attachment ? newPost.attachment : undefined,
        created_at: new Date().toLocaleString(),
        type: newPost.type ? newPost.type : 0,
    }
    return post
}