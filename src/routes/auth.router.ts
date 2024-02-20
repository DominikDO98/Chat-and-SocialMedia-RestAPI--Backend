import { Request, Response, Router } from "express";

export const AuthRouter = Router();

AuthRouter.get("/", (req: Request, res: Response) => {
	res.send("auth main");
});
