import { v4 as uuid } from "uuid";
import { EventEntity } from "./post.types";

const eventFactory = (newEvent: EventEntity) : EventEntity => {
    const event = {
        post_id: newEvent.post_id,
        date: newEvent.date,
        lat: newEvent.lat,
        lon: newEvent.lon,
    }
    return event
}