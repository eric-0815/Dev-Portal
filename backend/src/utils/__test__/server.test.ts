import request from 'supertest';
import createServer from '../server';

describe('createServer', () => {
    let server: any;

    beforeAll(() => {
        server = createServer();
    });

    afterAll(async () => {
        // await server.close();
    });

    // it('should return 200 OK status when making a GET request', async () => {
    //     const response = await request(server).get('/');
    //     expect(response.status).toEqual(200);
    // });

    // it('should enable CORS for specified origins', async () => {
    //     const response = await request(server).get('/');
    //     expect(response.headers['access-control-allow-origin']).toMatch(/http:\/\/localhost:3000|https:\/\/developer-center-v1.netlify.app/);
    // });

    it('should allow specified methods', async () => {
        const response = await request(server).options('/');
        expect(response.headers['access-control-allow-methods']).toEqual('GET,PUT,POST,DELETE');
    });

    it('should allow specified headers', async () => {
        const response = await request(server).options('/');
        expect(response.headers['access-control-allow-headers']).toEqual('Content-Type, Authorization, x-auth-token');
    });

    // it('should set optionsSuccessStatus to 200', async () => {
    //     const response = await request(server).options('/');
    //     expect(response.headers['access-control-allow-status']).toEqual('200');
    // });
});
