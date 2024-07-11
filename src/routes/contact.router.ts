import { NextFunction, Request, Response, Router } from "express";
import { ContactController } from "../controllers/contact.controller";
import { validateReq } from "../utils/validateReq/validateReq";

export const ContactRouter = Router();
const contactController = new ContactController();
ContactRouter
	//prettier-ignore
	.delete("/deleteContact", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["contact_id"]);
		await contactController.deleteContact(req, res, next);
	})
	.get("/loadContactList", async (req: Request, res: Response, next: NextFunction) => {
		await contactController.loadContactList(req, res, next);
	});
