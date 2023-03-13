import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { addOrCreateProfile, findProfile, findProfiles, getGitHubResponse, removeEducation, removeExperience, removeProfile, updateEducation, updateExperience } from "../../services/profiles.service";
import { createErrorMsg } from "../../utils/error";
import config from "config";
import request, { Response as GithubResponse } from 'request';
import { getProfile, getProfiles } from "../profiles.controller";

jest.mock('../../services/profiles.service');

describe('profiles controller', () => {
  let mockRequest: Request;
  let mockResponse: Response;

  beforeEach(() => {
    mockResponse = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProfiles', () => {
    mockRequest = {} as Request;
    it("should return all profiles", async () => {
      const mockProfiles = [
        { id: 1, name: "John" },
        { id: 2, name: "Jane" },
      ];
      (findProfiles as jest.Mock).mockResolvedValue(mockProfiles);

      await getProfiles(mockRequest, mockResponse);

      expect(findProfiles).toHaveBeenCalled();
      expect(mockResponse.send).toHaveBeenCalledWith(mockProfiles);
    });

    it("should handle errors", async () => {
      const mockError = new Error("Oops");
      (findProfiles as jest.Mock).mockRejectedValue(mockError);

      await getProfiles(mockRequest, mockResponse);

      expect(findProfiles).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(mockResponse.send).toHaveBeenCalledWith(
        createErrorMsg("Server Error")
      );
    });
  });

  // describe("getProfile", () => {
  //   beforeEach(() => {
  //     mockRequest.params = { userId: "123" }
  //   });

  //   it("should return the user profile", async () => {
  //     (findProfile as jest.Mock).mockResolvedValue({
  //       name: "John",
  //       email: "john@example.com"
  //     });

  //     await getProfile(mockRequest, mockResponse);

  //     expect(findProfile).toHaveBeenCalledWith("123");
  //     expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
  //     expect(mockResponse.send).toHaveBeenCalledWith({
  //       name: "John",
  //       email: "john@example.com"
  //     });
  //   });

  //   it("should return an error if the user profile cannot be found", async () => {
  //     (findProfile as jest.Mock).mockResolvedValue({
  //       errors: ["User profile not found"]
  //     });

  //     await getProfile(mockRequest, mockResponse);

  //     expect(findProfile).toHaveBeenCalledWith("123");
  //     expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
  //     expect(mockResponse.send).toHaveBeenCalledWith({
  //       errors: ["User profile not found"]
  //     });
  //   });

  // it("should return a server error if there is an exception", async () => {
  //   (findProfile as jest.Mock).mockRejectedValue(new Error("Database error"));

  //   await getProfile(mockRequest, mockResponse);

  //   expect(findProfile).toHaveBeenCalledWith("123");
  //   expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
  //   expect(mockResponse.send).toHaveBeenCalledWith({
  //     error: "Server Error"
  //   });
  // });
  // });
});

