import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "express-async-errors";
import { authorizeToken } from "./middleware/authorizeToken";
import { handleDBErrors } from "./middleware/dbErrorHandler";
import { handleError } from "./middleware/errorHandler";
import { AuthRouter } from "./routes/auth.router";
import { ChatRouter } from "./routes/chat.router";
import { CommentRouter } from "./routes/comment.router";
import { ContactRouter } from "./routes/contact.router";
import { EventRouter } from "./routes/event.router";
import { InvitationRouter } from "./routes/invitations.router";
import { LikeRouter } from "./routes/like.router";
import { PostRouter } from "./routes/post.router";
import { UserRouter } from "./routes/user.router";
import { MessageRouter } from "./routes/messages.router";
import { config } from "dotenv";
config();

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);
app.use(cookieParser());
app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/user", authorizeToken, UserRouter);
app.use("/chat", authorizeToken, ChatRouter);
app.use("/post", authorizeToken, PostRouter);
app.use("/like", authorizeToken, LikeRouter);
app.use("/comment", authorizeToken, CommentRouter);
app.use("/event", authorizeToken, EventRouter);
app.use("/invitation", authorizeToken, InvitationRouter);
app.use("/contact", authorizeToken, ContactRouter);
app.use("/chat", authorizeToken, ChatRouter);
app.use("/message", authorizeToken, MessageRouter);

app.use(handleDBErrors);
// app.use(handleError);

app.listen(process.env.DOCKER_APP_PORT ? Number(process.env.DOCKER_APP_PORT) : 3000, process.env.DOCKER_APP_HOST || "127.0.0.1", () => {
	console.log(`server is listening on port ${process.env.DOCKER_APP_PORT ? Number(process.env.DOCKER_APP_PORT) : 3000}`);
});
