import { v4 as uuid } from "uuid";
import { PostEntity } from "./post.types";

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