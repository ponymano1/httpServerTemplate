import express from 'express';
import { Request, Response } from 'express';
import  userRouts  from './user';
import authRouts  from './auth';

class BaseRouter {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get('/', (req: Request, res: Response) => {
            res.status(200).json({ message: 'root' });
        });
        this.router.use('/users', userRouts);
        this.router.use('/auth', authRouts);
    }
}

export default new BaseRouter().router;