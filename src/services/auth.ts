import { dbUser}  from "../db/connection";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Path: httpServer/src/services/authService.ts

interface IRegisterInfo {
    email: string,
    userId: number
}

const JWT_SECRET = process.env.JWT_SECRET;

class AuthService {
    private db: PrismaClient;
    
    constructor() {
        this.db = dbUser;
    }
    
    async register(email: string, password: string) {

        const isExist = await this.checkExistedUser(email);
        if (isExist) {
            throw new Error("User already existed");
        }

        const authObj = await this.db.idGenerator.create({
            data: {
                seq: 1
            }
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId: number = authObj.seq;
        const regInfo = await this.db.auth.create({
            data: {
                email: email,
                password: hashedPassword,
                userId: userId
            }
        });

        await this.db.user.create({
            data: {
                id: userId,
                name: email,
                age: 0,
                grade: 0
            }
        });
        
        return { email: regInfo.email, userId: regInfo.userId};        
    }
    
    async login(email: string, password: string) {
        const user = await this.db.auth.findFirst({
            where: {
                email: email
            }
        });

        if (user === null) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Password not match");
        }

        const token = jwt.sign(
            {
                userId: user.userId,
                email: email
            },  
            JWT_SECRET? JWT_SECRET : "ABCD" , 
            {expiresIn: '1h'}
            );
            
        return {
            userId: user.userId,
            token: token
        };

    }

    // async isLogin(token: string): Promise<boolean> {
        
    // }

    async checkExistedUser(email: string): Promise<boolean> {
        const user = await this.db.auth.findFirst({
            where: {
                email: email
            }
        });
        return user !== null;
    }
}

export default new AuthService();