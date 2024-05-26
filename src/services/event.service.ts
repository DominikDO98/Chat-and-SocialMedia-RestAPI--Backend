import { eventFactory } from "../entities/event.entity/event.entity";
import { EventEntity } from "../entities/event.entity/event.type";
import { postFactory } from "../entities/post.entity/post.entity";
import { PostEntity } from "../entities/post.entity/post.types";
import { createEventRepo, deleteEventRepo, editEventRepo, joinEventRepo, leaveEventRepo } from "../repositories/event.repository";

//events
export const createEventService = async (postData: Omit<PostEntity, "user_id">, eventData: EventEntity, user_id: string): Promise<void> => {
	const newPost = postFactory(postData, user_id);
	const newEvent = eventFactory(eventData, newPost.id);
	await createEventRepo(newPost, newEvent);
};

export const editEventService = async (postData: Omit<PostEntity, "user_id">, eventData: EventEntity, user_id: string): Promise<void> => {
	const newPost = postFactory(postData, user_id);
	const newEvent = eventFactory(eventData, newPost.id);
	await editEventRepo(newPost, newEvent);
};

export const joinEventService = async (user_id: string, event_id: string): Promise<void> => {
	await joinEventRepo(user_id, event_id);
};

export const leaveEventService = async (user_id: string, event_id: string): Promise<void> => {
	await leaveEventRepo(user_id, event_id);
};

export const deleteEventService = async (user_id: string, event_id: string): Promise<void> => {
	await deleteEventRepo(user_id, event_id);
};
