import express, { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import config from 'config';

import authMiddleware from '../../middleware/auth';
import { createErrorMsg } from "../../utils/error";

describe('auth middleware', () => {
  let mockRequest: Request;
  let mockResponse: Response;
  let next: NextFunction;
  const jwtSecret = process.env.jwtSecret || config.get('jwtSecret');

  beforeEach(() => {
    mockRequest = {
      body: {
        userId: 'abc123',
      },
      header: {

      }
    } as Request;

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;

    next = jest.fn();

    const user = {
      id: 'abc123',
      name: 'John Doe',
      email: 'johndoe@example.com'
    };
    const token = jwt.sign({ user }, 'jwtSecret');

    mockRequest.header = jest.fn().mockReturnValue(token);
  });

  it('should return 401 if the token is not valid', async () => {


    await authMiddleware(mockRequest, mockResponse, next);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(mockResponse.send).toHaveBeenCalledWith(createErrorMsg('Token is not valid'));
    expect(next).not.toHaveBeenCalled();
  });

  it('should add userId to req.body if token is valid', async () => {
    await authMiddleware(mockRequest, mockResponse, next);

    expect(mockRequest.body.userId).toEqual('abc123');
    // expect(next).toHaveBeenCalled();
  });
});
