export interface IPostEntity {
	id: string;
	user_id: string;
	group_id?: string;
	title: string;
	text: string;
	picture?: Buffer;
	attachment?: string;
	created_at: Date;
	type: number;
}

export interface IPostDTO {
	id: string;
	groupId?: string;
	title: string;
	text: string;
	picture?: Buffer;
	attachment?: string;
	createdAt: Date;
	type: number;
	likes: number;
	comments: number;
	liked: boolean;
}

export type TCretePost = {
	groupId?: string;
	title: string;
	text: string;
	picture?: Buffer;
	attachment?: string;
	createdAt: Date;
	type: number;
};

export type TEditPost = {
	id: string;
	groupId?: string;
	title: string;
	text: string;
	picture?: Buffer;
	attachment?: string;
	createdAt: Date;
	type: number;
};
