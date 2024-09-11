import { IEventEntity } from "./event.types";

export class EventEntity implements IEventEntity {
	public post_id;
	public date;
	public lat;
	public lon;
	constructor(newEvent: IEventEntity, post_id: string) {
		this.post_id = post_id;
		this.date = new Date(newEvent.date);
		this.lat = newEvent.lat;
		this.lon = newEvent.lon;
	}
}
