import  express  from 'express';
import {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import exp from 'constants';
import baseRourter from './routers/index';
// import cookieParser from 'cookie-parser';
// import compression from 'compression';

const app = express();
const port = 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req: Request, rsp: Response) => {
//     rsp.send('Hello World!');
// });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}).on('error', (err: any) => {
    console.error("listen error:",err);
});


app.use('/', baseRourter);