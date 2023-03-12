import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { createUser } from "../../services/users.service";
import { createErrorMsg } from "../../utils/error";
import { register } from "../users.controller";

jest.mock("../../services/users.service");

describe("Auth Controller", () => {

    let mockRequest: Request;
    let mockResponse: Response;

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("register", () => {

        beforeEach(() => {
            mockRequest = { body: { email: "test@test.com", password: "test123" } } as Request;
            mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                send: jest.fn(),
            } as unknown as Response;
        })

        it("should return 200 status code and user object on successful registration", async () => {
            const expectedResult = { id: "123", email: "test@test.com" };
            (createUser as jest.Mock).mockResolvedValueOnce(expectedResult);

            await register(mockRequest, mockResponse);

            expect(mockResponse.send).toHaveBeenCalledWith(expectedResult);
        });

        it("should return 400 status code and error object on failed registration", async () => {
            const expectedError = { errors: [{ msg: "Email is already taken" }] };
            (createUser as jest.Mock).mockResolvedValueOnce(expectedError);

            await register(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
            expect(mockResponse.send).toHaveBeenCalledWith(expectedError);
        });

        it("should return 500 status code and error message on server error", async () => {
            const expectedError = "Server Error";
            (createUser as jest.Mock).mockRejectedValueOnce(new Error(expectedError));

            await register(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(mockResponse.send).toHaveBeenCalledWith(createErrorMsg(expectedError));
        });
    });
});