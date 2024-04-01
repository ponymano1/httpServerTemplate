import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : "ABCD";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (token == null) return res.status(403).json(
        {
            message: "Unauthorized"
        }
    
    ); // 如果没有 token，返回 401

    jwt.verify(token, JWT_SECRET, (err: any, authInfo: any) => {
        if (err) return res.status(403).json(
            {
                message: "Unauthorized"
            }
        ); // 如果 token 不合法，返回 403

        req.body.authInfo = authInfo; // 将解码后的信息存储在 req.body.authInfo 中

        next(); // 继续处理请求
    });
}