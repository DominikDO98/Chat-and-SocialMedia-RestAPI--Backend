import { Router, Request, Response, NextFunction } from "express";
import { validateReq } from "../utils/validateReq/validateReq";
import { deleteContactController, loadContactListController } from "../controllers/contact.controller";

export const ContactRouter = Router();
ContactRouter
	//contacts
	.delete("/deleteContact", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["contact_id"]);
		await deleteContactController(req, res, next);
	})
	.get("/loadContactList/:offset", async (req: Request, res: Response, next: NextFunction) => {
		await loadContactListController(req, res, next);
	});
