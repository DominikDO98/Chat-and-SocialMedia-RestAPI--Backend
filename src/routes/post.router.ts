import { Request, Response, Router } from "express";

const PostRouter = Router();

PostRouter
    .get('/', (req: Request, res: Response) => {
        res.send("post main")
    })