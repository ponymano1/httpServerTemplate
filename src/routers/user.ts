import express from 'express';
import { Request, Response } from 'express';
import userController from '../controllers/user.controller';

class UserRouter {
    public readonly router = express.Router();


    constructor() {

        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get('/list', userController.getAllUsers);
        this.router.get('/:id', userController.getUser);
        //this.router.post('/:id', userController.addUser);
        this.router.put('/:id', userController.updateUser);
    }
}

export default new UserRouter().router;


