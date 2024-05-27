import { NextFunction, Request, Response, Router } from "express";
import { validateReq } from "../utils/validateReq/validateReq";
import { InvitationCreationSchema } from "../entities/invitation.entity/invitation.entity";
import { acceptInvitationContorller, cancelInvitationContorller, loadInvitationsController, rejectInvitationController, sendInvitationController } from "../controllers/inivitations.controller";

export const InvitationRouter = Router();
//prettier-ignore
InvitationRouter
	.post("/sentInvitation", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["invitationData"]);
		InvitationCreationSchema.parse(req.body.invitationData);
		await sendInvitationController(req, res, next);
	})
	.post("/acceptInvitaiton", async(req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["inivitation_id", "id"]);
		await acceptInvitationContorller(req, res, next);
	})
	.delete("/rejectInvitation", async(req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["inivitation_id", "id"]);
		await rejectInvitationController(req, res, next);
	})
	.delete("/cancelInvitation", async(req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["inivitation_id", "id"]);
		await cancelInvitationContorller(req, res, next);
	})
	.get("/loadInvitations", async(req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["id"]);
		await loadInvitationsController(req, res, next);
	});
