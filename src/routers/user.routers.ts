import express from 'express';
import { Request, Response } from 'express';
import userController from '../controllers/user.controller';

class UserRouter {
    public router = express.Router();


    constructor() {

        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get('/', userController.getAllUsers);
        this.router.get('/:id', userController.getUser);
    }
}

export default new UserRouter().router;


