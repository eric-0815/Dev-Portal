import request from 'supertest';
import createServer from '../utils/server'
import connectDB from '../utils/connectDB';
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose';

const app = createServer()

connectDB();

// Init Middleware

// API endpoint unit tests
describe('API endpoints', () => {

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();

        await mongoose.createConnection(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    // Test the root endpoint
    // it('GET / should return 200', async () => {
    //     const res = await request(app).get('/');
    //     console.log(res.body)
    //     // expect(res.statusCode).toEqual(200);
    // });

    // // Test the users endpoint
    it('GET /api/users should return 200', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toEqual(404);
    });

    // // Test the auth endpoint
    // it.only('GET /api/auth should return 200', async () => {
    //     const res = await request(app).get('/api/auth');
    //     expect(res.statusCode).toEqual(200);
    // });

    // // Test the profiles endpoint
    // it.only('GET /api/profiles should return 200', async () => {
    //     const res = await request(app).get('/api/profiles');
    //     expect(res.statusCode).toEqual(200);
    // });

    // // Test the posts endpoint
    // it.only('GET /api/posts should return 200', async () => {
    //     const res = await request(app).get('/api/posts');
    //     expect(res.statusCode).toEqual(200);
    // });
});
