import { Request, Response, Router } from "express";

export const ChatRouter = Router();

ChatRouter
    .get('/', (req: Request, res: Response) => {
        res.send("chat main")
    })