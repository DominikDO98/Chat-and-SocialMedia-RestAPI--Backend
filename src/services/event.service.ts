import { IEventDTO, TEventCreate } from "../entities/event.entity/event";
import { EventDTO } from "../entities/event.entity/event.dto";
import { EventEntity } from "../entities/event.entity/event.entity";
import { TCretePost, TEditPost } from "../entities/post.entity/post";
import { EventRepository } from "../repositories/event.repository";
import { PostService } from "./post.service";

export class EventService {
	private _eventRepository = EventRepository;
	private _postService = new PostService();

	createEvent = async (postData: TCretePost, eventData: TEventCreate, userId: string): Promise<EventDTO> => {
		const postDto = await this._postService.createPost(postData, userId);
		const newEvent = new EventEntity(eventData, postDto.id);
		const event = await this._eventRepository.createEvent(newEvent);
		const particiants = await this._eventRepository.countParticipants(event.post_id);

		const dto = EventDTO.createDTO(event, particiants, postDto);
		return dto;
	};

	editEvent = async (postData: TEditPost, eventData: TEventCreate, userId: string): Promise<IEventDTO> => {
		const postDto = await this._postService.editPost(postData, userId);
		const newEvent = new EventEntity(eventData, postData.id);
		const event = await this._eventRepository.editEvent(newEvent);
		console.log(event);

		const particiants = await this._eventRepository.countParticipants(postData.id);
		const dto = EventDTO.createDTO(event, particiants, postDto);
		return dto;
	};

	joinEvent = async (userId: string, eventId: string): Promise<void> => {
		await this._eventRepository.joinEvent(userId, eventId);
	};

	leaveEvent = async (userId: string, eventId: string): Promise<void> => {
		await this._eventRepository.leaveEvent(userId, eventId);
	};

	deleteEvent = async (userId: string, eventId: string): Promise<void> => {
		await this._eventRepository.deleteEvent(userId, eventId);
	};

	loadEvent = async (userId: string, eventId: string): Promise<IEventDTO> => {
		const postDto = await this._postService.loadPost(userId, eventId);
		const event = await this._eventRepository.loadEvent(eventId);
		const participants = await this._eventRepository.countParticipants(event.post_id);
		const dto = new EventDTO(event, participants, postDto);
		return dto;
	};
}
