import  express  from 'express';
import {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import exp from 'constants';
import baseRourter from './routers/index';
import dotenv from 'dotenv';


// import cookieParser from 'cookie-parser';
// import compression from 'compression';

const app = express();

const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFile });

const port = process.env.PORT;


const logger = require('./utils/logger').logger;

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
    logger.info(`Server is running at http://localhost:${port}`);
}).on('error', (err: any) => {
    logger.error("listen error:",err);
});


app.use('/', baseRourter);