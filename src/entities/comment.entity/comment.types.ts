export type TComment = {
	id: string;
	post_id: string;
	user_id: string;
	text: string;
	created_at: Date;
	picture?: Buffer;
	attachment?: string;
};
