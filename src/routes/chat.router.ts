import { Request, Response, Router } from "express";

const ChatRouter = Router();

ChatRouter
    .get('/', (req: Request, res: Response) => {
        res.send("chat main")
    })