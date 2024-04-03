import request from 'supertest';
import  express  from 'express';
import {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import exp from 'constants';
import baseRourter from '../src/routers/index';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authService from '../src/services/auth';
import { describe, test, it ,expect, beforeAll, beforeEach, afterEach } from '@jest/globals'; // Add this line



//import jest

// Add this line


const app = express();
const port = 3000;

dotenv.config();
const PrismaCl = new PrismaClient();



beforeAll(async () => {
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        //allowedHeaders: ['Content-Type', 'Authorization']
    }));
    
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/', baseRourter);

});


beforeEach(async () => {
    await clearAll();
    await addUsers();
});

afterEach(async () => {
    await clearAll();
});


describe('Test the root path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'root' });
    });
});


describe('Test register and login', () => {
    test ('It should register a user', async () => {
        const response = await request(app).post('/auth/register').send({
            email: 'testUser4',
            password: 'password4'
        });
        expect(response.status).toBe(200);
        expect(response.body.email).toEqual('testUser4');
        expect(response.body.userId).not.toBeNull();
        expect(response.body.userId).not.toBeUndefined();
        expect(Number(response.body.userId)).toBeTruthy();
    });

    it ('It should login a user', async () => {
        const response = await request(app).post('/auth/login').send({
            email: 'testUser1',
            password: 'password1'
        });
        expect(response.status).toBe(200);
        //console.log(response.header);
        expect(response.header.authorization).toBeTruthy();
        expect(response.body.userId).not.toBeNull();
        expect(response.body.userId).not.toBeUndefined();
        expect(Number(response.body.userId)).toBeTruthy();
    });

    it ('It should not login a user with wrong password', async () => {
        const response = await request(app).post('/auth/login').send({
            email: 'testUser1',
            password: 'wrongPassword'
        });
        expect(response.status).toBe(500);
    });
});


describe('Test auth middleware', () => {
    it ('It should return 403 when no token is provided', async () => {
        const response = await request(app).get('/users/list');
        expect(response.status).toBe(403);
    });

    it ('It should return 403 when a wrong token is provided', async () => {
        const response = await request(app).get('/users/list').set('Authorization', 'Bearer wrongToken');
        expect(response.status).toBe(403);
    });

    it ('It should return 200 when a correct token is provided', async () => {
        const response = await request(app).post('/auth/login').send({
            email: 'testUser1',
            password: 'password1'
        });
        const token = response.header.authorization;
        const response2 = await request(app).get('/users/list').set('Authorization', token).query({startPos: 0, limits: 10});
        console.log(response2);
        expect(response2.status).toBe(200);
    });

    it ('It should return 403 when a differnt token is provided', async () => {
        const response = await request(app).post('/auth/login').send({
            email: 'testUser1',
            password: 'password1'
        });
        const token = response.header.authorization;
        const response2 = await request(app).get('/users/2').set('Authorization', token);
        console.log(response2);
        expect(response2.status).toBe(403);
    });
});


const clearAll = async () => {
    await PrismaCl.idGenerator.deleteMany({});
    await PrismaCl.auth.deleteMany({});
    await PrismaCl.user.deleteMany({});
};


const addUsers = async () => {
    await authService.register("testUser1", "password1");
    await authService.register("testUser2", "password2");
    await authService.register("testUser3", "password3");
};
