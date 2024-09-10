import { IEvent } from "./event.type";

// export const eventFactory = (newevent: ievent, post_id: string): IEvent => {
// 	const event = {
// 		post_id: post_id,
// 		date: new Date(newEvent.date),
// 		lat: newEvent.lat,
// 		lon: newEvent.lon,
// 	};
// 	return event;
// };

export class Event implements IEvent {
	post_id;
	date;
	lat;
	lon;
	constructor(newEvent: IEvent, post_id: string) {
		this.post_id = post_id;
		this.date = new Date(newEvent.date);
		this.lat = newEvent.lat;
		this.lon = newEvent.lon;
	}
}
