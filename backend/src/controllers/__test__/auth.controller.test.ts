import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { getAuth } from "../auth.controller";
import { getUser } from "../../services/auth.service";

jest.mock('../../services/auth.service');

describe('getAuth', () => {
    let mockRequest: Request;
    let mockResponse: Response;

    const mockUser = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
    };

    beforeEach(() => {
        mockRequest = {
            body: {
                userId: mockUser.id,
            },
        } as Request;

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        } as unknown as Response;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the user with the given ID', async () => {
        // @ts-ignore
        (getUser as jest.MockedFunction<typeof getUser>).mockResolvedValueOnce(mockUser);

        await getAuth(mockRequest, mockResponse);

        expect(getUser).toHaveBeenCalledWith(mockUser.id);
        expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return user when getUser succeeds', async () => {
        (getUser as jest.Mock).mockResolvedValue(mockUser);

        await getAuth(mockRequest, mockResponse);

        expect(getUser).toHaveBeenCalledWith('123');
        expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 500 when getUser throws error', async () => {
        const mockError = new Error('getUser failed');
        (getUser as jest.Mock).mockRejectedValue(mockError);

        await getAuth(mockRequest, mockResponse);

        expect(getUser).toHaveBeenCalledWith('123');
        expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(mockResponse.send).toHaveBeenCalledWith({ errors: [{ msg: 'Server Error' }] });
    });
});
