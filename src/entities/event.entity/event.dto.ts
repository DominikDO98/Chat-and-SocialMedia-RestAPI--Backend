import { IPostDTO } from "../post.entity/post";
import { IEventDTO, IEventEntity } from "./event";

export class EventDTO implements IEventDTO {
	public date: Date;
	public lat: number;
	public lon: number;
	public participants: number;
	public readonly id: string;
	public readonly groupId: string | undefined;
	public title: string;
	public text: string;
	public picture: Buffer | undefined;
	public attachment: string | undefined;
	public createdAt: Date;
	public type: number;
	public likes: number;
	public comments: number;
	public liked: boolean;
	constructor(newEvent: IEventEntity, participants: number, post: IPostDTO) {
		this.date = newEvent.date;
		this.lat = newEvent.lat;
		this.lon = newEvent.lon;
		this.participants = participants;
		this.id = post.id;
		this.groupId = post.groupId ? post.groupId : undefined;
		this.title = post.title;
		this.text = post.text;
		this.picture = post.picture ? post.picture : undefined;
		this.attachment = post.attachment ? post.attachment : undefined;
		this.createdAt = post.createdAt;
		this.type = post.type;
		this.likes = post.likes;
		this.comments = post.comments;
		this.liked = post.liked;
	}
	static createDTO(entity: IEventEntity, participants: number, post: IPostDTO) {
		return new EventDTO(entity, participants, post);
	}
}
