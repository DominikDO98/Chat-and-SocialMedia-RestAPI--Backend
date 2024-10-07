import { IEventEntity, TEventCreate, TEventEdit } from "./event";

export class EventEntity implements IEventEntity {
	public post_id;
	public date;
	public lat;
	public lon;
	constructor(newEvent: TEventCreate | TEventEdit, post_id: string) {
		this.post_id = post_id;
		this.date = newEvent.date;
		this.lat = newEvent.lat;
		this.lon = newEvent.lon;
	}
}
