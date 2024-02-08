import { z } from "zod";
import { EventEntity } from "./post.types";

const newEventSchema = z.object({
    post_id: z.string().uuid(),
    date: z.string().datetime(),
    lat: z.number().max(90).multipleOf(0.000001),
    lot: z.number().max(180).multipleOf(0.000001),
})

const eventFactory = (newEvent: EventEntity) : EventEntity => {
    const event = {
        post_id: newEvent.post_id,
        date: newEvent.date,
        lat: newEvent.lat,
        lon: newEvent.lon,
    }
    return event
}