import { v4 as uuid } from "uuid";

class PostEntity {
    private id: string;
    private user_id: string;
    private group_id?: string;
    private title: string;
    private text: string;
    private picture?: Blob;
    private attachment?: string;
    private readonly created_at: string;
    private readonly type: number;

    constructor(
        user_id: string,
        title: string,
        text: string,
        type: number,
        picture?: Blob, 
        attachment?: string,
        group_id?: string
        ) {
        this.id = uuid(),
        this.user_id = user_id,
        this.group_id = group_id,
        this.title = title,
        this.text = text,
        this.created_at = new Date().toLocaleString(),
        this.type = type
        this.picture = picture,
        this.attachment = attachment
    }

    
    public set setPicture(img: Blob) {
        this.picture = img;
    }

    public set setAttachment(link: string) {
        this.attachment = link;
    }

    public set setText(text: string) {
        this.text = text;
    }
    
}