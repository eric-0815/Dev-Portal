import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { getAuth } from "../auth.controller";
import { getUser } from "../../services/auth.service";

jest.mock('../../services/auth.service');

describe('getAuth', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {
            body: { userId: '123' }
        };
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });

    it('should return user when getUser succeeds', async () => {
        const mockUser = { id: '123', name: 'John Doe' };
        (getUser as jest.Mock).mockResolvedValue(mockUser);

        await getAuth(mockRequest as Request, mockResponse as Response);

        expect(getUser).toHaveBeenCalledWith('123');
        expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 500 when getUser throws error', async () => {
        const mockError = new Error('getUser failed');
        (getUser as jest.Mock).mockRejectedValue(mockError);

        await getAuth(mockRequest as Request, mockResponse as Response);

        expect(getUser).toHaveBeenCalledWith('123');
        expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        //expect(mockResponse.send).toHaveBeenCalledWith('Server Error');
    });
});
