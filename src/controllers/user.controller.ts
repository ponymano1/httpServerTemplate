import express from 'express';
import { Request, Response } from 'express';

class UserController {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        
    }

    getAllUsers = async (req: Request, res: Response) => {
        try {
            res.status(200).json({
                users: [
                    {
                        id: 1,
                        name: 'John Doe 1',
                    },
                    {
                        id: 2,
                        name: 'John Doe 2',
                    },
                    {
                        id: 3,
                        name: 'John Doe 3',
                    },
                ]
            });

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
}

export default new UserController();