import { v4 as uuid } from "uuid";

const eventFactory = (newEvent: EventEntity) => {
    const event = {
        post_id: newEvent.post_id,
        date: newEvent.date,
        lat: newEvent.lat,
        lon: newEvent.lon,
    }
    return event
}