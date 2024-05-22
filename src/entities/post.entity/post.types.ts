export type PostEntity = {
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

export type CommentEntity = {
	id: string;
	post_id: string;
	user_id: string;
	text: string;
	created_at: Date;
	picture?: Buffer;
	attachment?: string;
};

export type LikeEntity = {
	post_id: string;
	user_id: string;
};

export type EventEntity = {
	post_id: string;
	date: Date;
	lat: number;
	lon: number;
};

export type EventCreationEntity = { post: PostEntity; event: EventEntity };
