import express from 'express';
import { Request, Response } from 'express';
import authService  from '../services/auth';

class AuthController {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.put('/register', this.register);
        this.router.post('/login', this.login);

    }

    register = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        try {
            const authInfo = await authService.register(username, password);
            res.status(200).json({ email: authInfo.email, userId: authInfo.userId});
        } catch (err) {
            res.status(500).json({ error: err});
        }

    }
    
    login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            const {userId,token} = await authService.login(username, password);
            //将token放入header中
            res.setHeader('Authorization', 'Bearer' + token);
            res.status(200).json({ userId: userId});
            
        } catch (err) {
            res.status(500).json({ error: err});
        }
        
    }



}