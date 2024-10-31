import { NextFunction, Request, Response, Router } from "express";
import { InvitationController } from "../controllers/inivitations.controller";
import { InvitationCreationSchema } from "../entities/invitation.entity/invitation.schema";
import { validateReq } from "../utils/validateReq/validateReq";

export const InvitationRouter = Router();
const invitationController = new InvitationController();
InvitationRouter
	//prettier-ignore
	.post("/sentInvitation", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["toUserID"]);
		InvitationCreationSchema.parse(req.body.toUserID);
		await invitationController.sendInvitation(req, res, next);
	})
	.post("/acceptInvitation", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["invitationId", "id"]);
		await invitationController.acceptInvitation(req, res, next);
	})
	.delete("/rejectInvitation", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["invitationId", "id"]);
		await invitationController.rejectInvitation(req, res, next);
	})
	.delete("/cancelInvitation", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["invitationId", "id"]);
		await invitationController.cancelInvitation(req, res, next);
	})
	.get("/loadInvitations", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["id"]);
		await invitationController.loadInvitations(req, res, next);
	});
