import { v4 as uuid } from "uuid";

class MessageEntity {
    private id: string;
    private conversaiton_id: string;
    private text: string;
    private created_at: string;
    private send_by: string;
    private picture?: Blob;
    private attachment?: string;
    private is_deliverd: boolean = false

    constructor(
        conversaiton_id: string,
        text: string,
        send_by: string,
        picture?: Blob,
        attachment?: string,
        ){
            this.id = uuid(),
            this.conversaiton_id = conversaiton_id,
            this.text = text,
            this.created_at = new Date().toLocaleString();
            this.send_by = send_by;
            this.picture = picture;
            this.attachment = attachment;
            this.is_deliverd
        }
}