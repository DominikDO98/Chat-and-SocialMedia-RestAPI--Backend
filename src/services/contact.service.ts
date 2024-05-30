import { deleteContactRepo } from "../repositories/contact.repository";

export const deleteContactService = async (contact_id: string) => {
	await deleteContactRepo;
};
