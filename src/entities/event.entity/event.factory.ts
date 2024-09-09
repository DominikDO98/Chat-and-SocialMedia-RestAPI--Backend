import { TEvent } from "./event.type";

export const eventFactory = (newEvent: TEvent, post_id: string): TEvent => {
	const event = {
		post_id: post_id,
		date: new Date(newEvent.date),
		lat: newEvent.lat,
		lon: newEvent.lon,
	};
	return event;
};
