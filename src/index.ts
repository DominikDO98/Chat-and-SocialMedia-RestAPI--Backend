import express from "express";
import "express-async-errors";
import cookieParser from "cookie-parser";
import { UserRouter } from "./routes/user.router";
import { ChatRouter } from "./routes/chat.router";
import { PostRouter } from "./routes/post.router";
import { AuthRouter } from "./routes/auth.router";
import { handleError } from "./middleware/errorHandler";
import { handleDBErrors } from "./middleware/dbErrorHandler";
import { authorizeToken } from "./middleware/authorizeToken";
import cors from "cors";

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

app.use(handleDBErrors);
app.use(handleError);

app.listen(3000, "127.0.0.1", () => {
	console.log("server is listening on port 3000");
});
