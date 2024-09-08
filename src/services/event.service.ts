import { eventFactory } from "../entities/event.entity/event.entity";
import { TEvent } from "../entities/event.entity/event.type";
import { postFactory } from "../entities/post.entity/post.entity";
import { TPost } from "../entities/post.entity/post.types";
import { EventRepository } from "../repositories/event.repository";

export class EventService {
	private _eventRepository = EventRepository;
	constructor() {
		this._eventRepository;
	}
	createEvent = async (postData: Omit<TPost, "user_id">, eventData: TEvent, user_id: string): Promise<void> => {
		const newPost = postFactory(postData, user_id);
		const newEvent = eventFactory(eventData, newPost.id);
		await this._eventRepository.createEvent(newPost, newEvent);
	};

	editEvent = async (postData: Omit<TPost, "user_id">, eventData: TEvent, user_id: string): Promise<void> => {
		const newPost = postFactory(postData, user_id);
		const newEvent = eventFactory(eventData, newPost.id);
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

	loadEvent = async (event_id: string): Promise<TEvent> => {
		const event = await this._eventRepository.loadEvent(event_id);
		return event;
	};
}
