export interface ICommentEntity {
	id: string;
	post_id: string;
	user_id: string;
	text: string;
	created_at: Date;
	picture?: Buffer;
	attachment?: string;
}

export interface ICommentDTO {
	id: string;
	postId: string;
	text: string;
	createdAt: Date;
	picture?: Buffer;
	attachment?: string;
}

export type TCreateComment = {
	postId: string;
	text: string;
	createdAt: Date;
	picture?: Buffer;
	attachment?: string;
};

export type TEditComment = {
	id: string;
	postId: string;
	text: string;
	createdAt: Date;
	picture?: Buffer;
	attachment?: string;
};
