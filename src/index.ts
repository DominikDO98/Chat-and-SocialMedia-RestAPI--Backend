import express, { Request, Response } from "express";
import { UserRouter } from "./routes/user.router";
import { ChatRouter } from "./routes/chat.router";
import { PostRouter } from "./routes/post.router";
import { AuthRouter } from "./routes/auth.router";
import { handleError } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.use('/auth', AuthRouter);
app.use('/user', UserRouter);
app.use('/chat', ChatRouter);
app.use('/post', PostRouter);

app.use(handleError)

app.listen(3000, '127.0.0.1', () => {
    console.log('server is listening on port 3000');
    
})