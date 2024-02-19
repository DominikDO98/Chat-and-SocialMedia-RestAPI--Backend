import { Request, Response, Router } from "express";

export const UserRouter = Router();

UserRouter
	.get("/", (req: Request, res: Response) => {
		res.send("user main");
	});