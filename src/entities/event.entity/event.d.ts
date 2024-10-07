export interface IEventEntity {
	post_id: string;
	date: Date;
	lat: number;
	lon: number;
}

export interface IEventDTO {
	date: Date;
	lat: number;
	lon: number;
	participants: number;
	id: string;
	groupId: string | undefined;
	title: string;
	text: string;
	picture: Buffer | undefined;
	attachment: string | undefined;
	createdAt: Date;
	type: number;
	likes: number;
	comments: number;
}

export type TEventCreate = {
	date: Date;
	lat: number;
	lon: number;
};

export type TEventEdit = {
	postId: string;
	date: Date;
	lat: number;
	lon: number;
};
