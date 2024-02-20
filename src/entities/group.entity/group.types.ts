export type GroupEnitiy = {
	id: string;
	admin_id: string;
	name?: string;
	created_at: Date;
	is_private?: boolean;
	description: string;
	profile_photo?: Blob;
};
