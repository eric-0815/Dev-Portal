import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { authenticateUser, createUser } from "../../services/users.service";
import { createErrorMsg } from "../../utils/error";
import { login, register } from "../users.controller";

jest.mock("../../services/users.service");

describe("Auth Controller", () => {

    let mockRequest: Request;
    let mockResponse: Response;

    beforeEach(() => {
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        } as unknown as Response;
    })

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("register", () => {

        beforeEach(() => {
            mockRequest = { body: { email: "test@test.com", password: "test123" } } as Request;
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

    describe("login", () => {
        beforeEach(() => {
            mockRequest = { body: { email: "john@test.com", password: "password" } } as Request;
        });

        it("should call authenticateUser with request body and return 200 OK response with user data on successful login", async () => {
            // Arrange
            const user = {
                _id: "abc123",
                name: "John",
                email: "john@test.com",
                password: "password",
            };
            const token = "test_token";
            const expectedResponse = { user, token };
            (authenticateUser as jest.Mock).mockResolvedValueOnce(expectedResponse);

            // Act
            await login(mockRequest, mockResponse);

            // Assert
            expect(authenticateUser).toHaveBeenCalledWith(mockRequest.body);
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(mockResponse.send).toHaveBeenCalledWith(expectedResponse);
        });

        it("should return 400 Bad Request response with error message when authentication fails", async () => {
            // Arrange
            const errorMessage = "Invalid email or password";
            const expectedResponse = { errors: [{ msg: errorMessage }] };
            (authenticateUser as jest.Mock).mockResolvedValueOnce(expectedResponse);


            // Act
            await login(mockRequest, mockResponse);

            // Assert
            expect(authenticateUser).toHaveBeenCalledWith(mockRequest.body);
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
            expect(mockResponse.send).toHaveBeenCalledWith(expectedResponse);
        });

        it("should return 500 Internal Server Error response with error message when authenticateUser throws an error", async () => {
            // Arrange
            const errorMessage = "Something went wrong";
            (authenticateUser as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

            // Act
            await login(mockRequest, mockResponse);

            // Assert
            expect(authenticateUser).toHaveBeenCalledWith(mockRequest.body);
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(mockResponse.send).toHaveBeenCalledWith({ errors: [{ msg: "Server Error" }] });
        });
    });
});