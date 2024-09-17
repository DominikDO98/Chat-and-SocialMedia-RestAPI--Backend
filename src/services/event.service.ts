import { EventEntity } from "../entities/event.entity/event.entity";
import { IEventEntity } from "../entities/event.entity/event.types";
import { PostEntity } from "../entities/post.entity/post.entity";
import { IPostEntity } from "../entities/post.entity/post.types";
import { EventRepository } from "../repositories/event.repository";

export class EventService {
	private _eventRepository = EventRepository;

	createEvent = async (postData: Omit<IPostEntity, "user_id">, eventData: IEventEntity, user_id: string): Promise<void> => {
		const newPost = new PostEntity(postData, user_id);
		const newEvent = new EventEntity(eventData, newPost.id);
		await this._eventRepository.createEvent(newPost, newEvent);
	};

	editEvent = async (postData: Omit<IPostEntity, "user_id">, eventData: IEventEntity, user_id: string): Promise<void> => {
		const newPost = new PostEntity(postData, user_id);
		const newEvent = new EventEntity(eventData, newPost.id);
		await this._eventRepository.editEvent(newPost, newEvent);
	};

	joinEvent = async (user_id: string, event_id: string): Promise<void> => {
		await this._eventRepository.joinEvent(user_id, event_id);
	};

	leaveEvent = async (user_id: string, event_id: string): Promise<void> => {
		await this._eventRepository.leaveEvent(user_id, event_id);
	};

	deleteEvent = async (user_id: string, event_id: string): Promise<void> => {
		await this._eventRepository.deleteEvent(user_id, event_id);
	};

	loadEvent = async (event_id: string): Promise<IEventEntity> => {
		const event = await this._eventRepository.loadEvent(event_id);
		return event;
	};
}
