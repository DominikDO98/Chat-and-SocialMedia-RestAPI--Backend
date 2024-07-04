import { eventFactory } from "../entities/event.entity/event.entity";
import { EventEntity } from "../entities/event.entity/event.type";
import { postFactory } from "../entities/post.entity/post.entity";
import { PostEntity } from "../entities/post.entity/post.types";
import { EventRepository } from "../repositories/event.repository";

export class EventService {
	private _eventRepository = EventRepository;
	constructor() {
		this._eventRepository;
	}
	createEventService = async (postData: Omit<PostEntity, "user_id">, eventData: EventEntity, user_id: string): Promise<void> => {
		const newPost = postFactory(postData, user_id);
		const newEvent = eventFactory(eventData, newPost.id);
		await this._eventRepository.createEvent(newPost, newEvent);
	};

	editEventService = async (postData: Omit<PostEntity, "user_id">, eventData: EventEntity, user_id: string): Promise<void> => {
		const newPost = postFactory(postData, user_id);
		const newEvent = eventFactory(eventData, newPost.id);
		await this._eventRepository.editEvent(newPost, newEvent);
	};

	joinEventService = async (user_id: string, event_id: string): Promise<void> => {
		await this._eventRepository.joinEvent(user_id, event_id);
	};

	leaveEventService = async (user_id: string, event_id: string): Promise<void> => {
		await this._eventRepository.leaveEvent(user_id, event_id);
	};

	deleteEventService = async (user_id: string, event_id: string): Promise<void> => {
		await this._eventRepository.deleteEvent(user_id, event_id);
	};

	loadEventService = async (event_id: string): Promise<EventEntity> => {
		const event = await this._eventRepository.loadEvent(event_id);
		return event;
	};
}
