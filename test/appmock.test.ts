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
import { describe, test, it ,expect, beforeAll, beforeEach, afterEach, jest } from '@jest/globals'; // Add this line
import auth from '../src/services/auth';



//import jest

// Add this line


const app = express();
const port = 3000;

dotenv.config();
const PrismaCl = new PrismaClient();

jest.mock('../src/services/auth', () => (
    {
        register: jest.fn(),
        login: jest.fn(),
    }
));

const mockAuthService = authService as jest.Mocked<typeof authService>;

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
    jest.clearAllMocks();

    mockAuthService.register.mockImplementation(async (email: string, password: string) => {
        return { email: email, userId: 666};
    });

    mockAuthService.login.mockImplementation(async (email: string, password: string) => {
        return { 
            userId: 666,
            token: 'token'
        };
    });

});

afterEach(async () => {

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
            email: 'mockUser',
            password: 'password4'
        });
        expect(response.status).toBe(200);
        expect(response.body.email).toEqual('mockUser');
        expect(response.body.userId).not.toBeNull();
        expect(response.body.userId).not.toBeUndefined();
        expect(Number(response.body.userId)).toEqual(666);
    });

    it ('It should login a user', async () => {
        const response = await request(app).post('/auth/login').send({
            email: 'mockUser',
            password: 'password1'
        });
        expect(response.status).toBe(200);
        //console.log(response.header);
        expect(response.header.authorization).toBeTruthy();
        expect(response.header.authorization).toEqual('Bearer token');
        expect(response.body.userId).not.toBeNull();
        expect(response.body.userId).not.toBeUndefined();
        expect(Number(response.body.userId)).toEqual(666);
    });


});


