export type IPostEntity = {
	id: string;
	user_id: string;
	group_id?: string;
	title: string;
	text: string;
	picture?: Buffer;
	attachment?: string;
	created_at: Date;
	type: number;
};
