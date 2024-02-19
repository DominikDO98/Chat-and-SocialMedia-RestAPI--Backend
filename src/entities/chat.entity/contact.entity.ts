import { v4 as uuid } from "uuid";
import { z } from "zod";
import { ContactEntity } from "./chat.types";

export const newContactSchema = z.object({
    id: z.string().uuid(),
    converation_id: z.string().uuid(),
})

export const contactFactory = (newContact: Omit<ContactEntity, 'id'>) : ContactEntity => {
    const contact: ContactEntity = { 
        id: uuid(),
        converation_id: newContact.converation_id,
    }
    return contact
}