import express from 'express';
import { Request, Response } from 'express';
import  userRouts  from './user';

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
    }
}

export default new BaseRouter().router;