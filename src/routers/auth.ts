import express from 'express';
import { Request, Response } from 'express';
import authController from '../controllers/auth.controller';

class AuthRouter {
    public readonly router = express.Router();

    constructor() {

    }

    public initializeRoutes() {
        this.router.put('/register', authController.register);
        this.router.post('/login', authController.login);
    }
}

export default new AuthRouter().router;