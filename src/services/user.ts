import { dbUser}  from "../db/connection";
import { PrismaClient } from "@prisma/client";

class UserService {
    private db: PrismaClient;
    
    constructor() {
        console.log("construct UserService");
        this.db = dbUser;
    }
    
    async getUserInfo(userId: number) {
        return this.db.user.findFirst({
            select: {
                id: true,
                name: true,
                age: true,
            },
            where: {
                id: userId
            }
        });
    }
    
    async updateUser(user : {id:number,[key:string]:any}) {
        return this.db.user.update({
            where: {
                id: user.id
            },
            data: {
                ...user
            }
        });
    }

    async findAllUsers(startPos: number, limits: number) {
        return this.db.user.findMany({  
            select: {
                id: true,
                name: true,
                age: true,
            },
            where: {
                id: {
                    gt: startPos
                }
            },
            take: limits
        });
    }

    async addUser(user: any) {
        return this.db.user.create({
            data: {
                ...user
            }
        });
    }
}

export default new UserService();