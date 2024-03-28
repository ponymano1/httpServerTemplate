import express from 'express';
import { Request, Response } from 'express';
import userService  from '../services/user';
interface IUser {
    id: number,
    name?: string,
    age?: number

}

class UserController {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        
    }
    
    
    getAllUsers = async (req: Request, res: Response) => {
        try {
            const {startPos, limits} = req.query;
            const users = await userService.findAllUsers(Number(startPos), Number(limits));
            res.status(200).json({ startPos: startPos, size: users.length, users: users});

        } catch (err) {
            res.status(500).json({ error: err});
        }
        
    }

    getUser = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            res.status(200).json({ 
                id: id,
                name: 'John Doe 1',
            });
        } catch (err) {
            res.status(500).json({ error: err});
        }
    }

    addUser = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const { name, age }= req.body;
            const user : IUser = await userService.addUser({id: Number(id), name: name, age: Number(age)});
            res.status(200).json({ 
                user
            });
        } catch (err) {
            res.status(500).json({ error: err});
        }

    }

    updadeUser = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const { name, age }= req.body;
            const user: IUser = await userService.updateUser({id: Number(id), name: name, ...(age? {age: Number(age)}});
            res.status(200).json({ 
                user
            });
        } catch (err) {
                res.status(500).json({ error: err});
        }
    }
}

export default new UserController();