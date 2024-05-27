import { z } from "zod";
import { EventEntity } from "./event.type";

export const EventSchema = z.object({
	post_id: z.string().uuid().optional(),
	date: z.string().optional(),
	lat: z.number().max(90).multipleOf(0.000001).optional(),
	lon: z.number().max(180).multipleOf(0.000001).optional(),
});

export const eventFactory = (newEvent: EventEntity, post_id: string): EventEntity => {
	const event = {
		post_id: post_id,
		date: new Date(newEvent.date),
		lat: newEvent.lat,
		lon: newEvent.lon,
	};
	return event;
};