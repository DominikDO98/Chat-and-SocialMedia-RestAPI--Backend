import { v4 as uuid } from "uuid";

const contactFactory = (newContact: Omit<ContactEntity, 'id'>) => {
    const contact: ContactEntity = { 
        id: uuid(),
        converation_id: newContact.converation_id,
    }
    return contact
}