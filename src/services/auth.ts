import { dbUser}  from "../db/connection";
import { PrismaClient } from "@prisma/client";

// Path: httpServer/src/services/authService.ts

interface IRegisterInfo {
    email: string,
    userId: number
}


class AuthService {
    private db: PrismaClient;
    
    constructor() {
        this.db = dbUser;
    }
    
    async registerUser(email: string, password: string): Promise<IRegisterInfo> {
       const authObj = await this.db.idGenerator.create({
            data: {
                seq: 1
            }
        });
        const userId: number = authObj.seq;
        
        const regInfo = await this.db.auth.create({
            data: {
                email: email,
                password: password,
                userId: userId
            }
        });

        return {
            email: regInfo.email,
            userId: regInfo.userId
        };
        
    }
    
    // async loginUser(user: User): Promise<User> {
    //     return this.db.user.findFirst({
    //         where: {
    //             email: user.email,
    //             password: user.password
    //         }
    //     });
    // }

    // async isLogin(token: string): Promise<boolean> {
        
    // }
}