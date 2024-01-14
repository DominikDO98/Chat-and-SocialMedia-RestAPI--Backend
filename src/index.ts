import express, { Request, Response} from "express";

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hello, World!</h1>')
});

app.listen(3000, '127.0.0.1', () => {
    console.log('server is listening on port 3000');
    
})