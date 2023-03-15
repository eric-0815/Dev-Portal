import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { addOrCreateProfile, findProfile, findProfiles, getGitHubResponse, removeEducation, removeExperience, removeProfile, updateEducation, updateExperience } from "../../services/profiles.service";
import { createErrorMsg } from "../../utils/error";
import config from "config";
import request, { Response as GithubResponse } from 'request';
import { deleteEducation, deleteExperience, deleteProfile, getProfile, getProfiles, postProfile, putEducation } from "../profiles.controller";

jest.mock('../../services/profiles.service');

describe('profiles controller', () => {
  let mockRequest: Request;
  let mockResponse: Response;

  beforeEach(() => {
    mockRequest = {

    } as unknown as Request;

    mockResponse = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProfiles', () => {
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

  describe("getProfile", () => {
    beforeEach(() => {
      mockRequest.params = {
        userId: "123"
      }
    });

    it("should return the user profile", async () => {
      const mockProfile = {
        name: "John",
        email: "john@example.com",
      };

      (findProfile as jest.Mock).mockResolvedValue(mockProfile);

      await getProfile(mockRequest, mockResponse);

      expect(findProfile).toHaveBeenCalledWith("123");
      // expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponse.send).toHaveBeenCalledWith({
        name: "John",
        email: "john@example.com"
      });
    });

    it("should return an error if the user profile cannot be found", async () => {
      (findProfile as jest.Mock).mockResolvedValue({
        errors: ["User profile not found"]
      });

      await getProfile(mockRequest, mockResponse);

      expect(findProfile).toHaveBeenCalledWith("123");
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(mockResponse.send).toHaveBeenCalledWith({
        errors: ["User profile not found"]
      });
    });

    it("should return a server error if there is an exception", async () => {
      (findProfile as jest.Mock).mockRejectedValue(new Error("Database error"));

      await getProfile(mockRequest, mockResponse);

      expect(findProfile).toHaveBeenCalledWith("123");
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(mockResponse.send).toHaveBeenCalledWith(createErrorMsg("Server Error"));
    });
  });

  describe('postProfile', () => {

    beforeEach(() => {
      mockRequest.body = {
        name: 'John Doe',
        age: 30,
        email: 'johndoe@example.com'
      };
    })

    const mockAddOrCreateProfile = addOrCreateProfile as jest.MockedFunction<typeof addOrCreateProfile>;

    it('should create a new profile', async () => {
      // @ts-ignore
      mockAddOrCreateProfile.mockResolvedValueOnce({ name: 'John Doe', age: 30, email: 'johndoe@example.com' });
      await postProfile(mockRequest, mockResponse);
      expect(mockAddOrCreateProfile).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.send).toHaveBeenCalledWith({ name: 'John Doe', age: 30, email: 'johndoe@example.com' });
    });

    it('should return a bad request status when there are errors', async () => {
      mockAddOrCreateProfile.mockResolvedValueOnce(createErrorMsg('Invalid email'));
      await postProfile(mockRequest, mockResponse);
      expect(mockAddOrCreateProfile).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith(createErrorMsg('Invalid email'));
    });

    it('should return an internal server error status when an error occurs', async () => {
      mockAddOrCreateProfile.mockRejectedValueOnce(new Error('Database connection failed'));
      await postProfile(mockRequest, mockResponse);
      expect(mockAddOrCreateProfile).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith(createErrorMsg('Server Error'));
    });
  });

  describe('deleteProfile', () => {

    beforeEach(() => {
      mockRequest.body = {
        userId: '123'
      }
    })

    const mockRemoveProfile = removeProfile as jest.MockedFunction<typeof removeProfile>;

    it('should remove a profile', async () => {
      // @ts-ignore
      mockRemoveProfile.mockResolvedValueOnce({ success: true });
      await deleteProfile(mockRequest, mockResponse);
      expect(mockRemoveProfile).toHaveBeenCalledWith('123');
      expect(mockResponse.send).toHaveBeenCalledWith({ success: true });
    });

    it('should return an internal server error status when an error occurs', async () => {
      mockRemoveProfile.mockRejectedValueOnce(new Error('Database connection failed'));
      await deleteProfile(mockRequest, mockResponse);
      expect(mockRemoveProfile).toHaveBeenCalledWith('123');
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith(createErrorMsg('Server Error'));
    });
  });

  describe('deleteProfile', () => {
    beforeEach(() => {
      mockRequest.body = {
        userId: '123'
      }
    })

    const mockRemoveProfile = removeProfile as jest.MockedFunction<typeof removeProfile>;

    it('should remove a profile', async () => {
      // @ts-ignore
      mockRemoveProfile.mockResolvedValueOnce({ success: true });
      await deleteProfile(mockRequest, mockResponse);
      expect(mockRemoveProfile).toHaveBeenCalledWith('123');
      expect(mockResponse.send).toHaveBeenCalledWith({ success: true });
    });

    it('should return an internal server error status when an error occurs', async () => {
      mockRemoveProfile.mockRejectedValueOnce(new Error('Database connection failed'));
      await deleteProfile(mockRequest, mockResponse);
      expect(mockRemoveProfile).toHaveBeenCalledWith('123');
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith(createErrorMsg('Server Error'));
    });
  });

  describe('deleteExperience', () => {

    beforeEach(() => {
      mockRequest.body = {
        userId: 123,
      }
      mockRequest.params = {
        expId: '456'
      }
    })

    const mockRemoveExperience = removeExperience as jest.MockedFunction<typeof removeExperience>;

    it('should remove an experience', async () => {
      // @ts-ignore
      mockRemoveExperience.mockResolvedValueOnce({ success: true });
      await deleteExperience(mockRequest, mockResponse);
      expect(mockRemoveExperience).toHaveBeenCalledWith(mockRequest.body.userId, mockRequest.params.expId);
      expect(mockResponse.send).toHaveBeenCalledWith({ success: true });
    });

    it('should return an internal server error status when an error occurs', async () => {
      mockRemoveExperience.mockRejectedValueOnce(new Error('Database connection failed'));
      await deleteExperience(mockRequest, mockResponse);
      expect(mockRemoveExperience).toHaveBeenCalledWith(mockRequest.body.userId, mockRequest.params.expId);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith(createErrorMsg('Server Error'));
    });
  });

  describe('putEducation', () => {
    beforeEach(() => {
      mockRequest.body = {
        userId: '123',
        educationId: '456',
      }
    })

    const mockUpdateEducation = updateEducation as jest.MockedFunction<typeof updateEducation>;

    it('should update an education', async () => {
      // @ts-ignore
      mockUpdateEducation.mockResolvedValueOnce({ success: true });
      await putEducation(mockRequest, mockResponse);
      expect(mockUpdateEducation).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.send).toHaveBeenCalledWith({ success: true });
    });

    it('should return a bad request status when validation errors occur', async () => {
      mockUpdateEducation.mockResolvedValueOnce({ errors: [{ msg: 'Title is required' }] });
      await putEducation(mockRequest, mockResponse);
      expect(mockUpdateEducation).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith(createErrorMsg('Title is required'));
    });

    it('should return an internal server error status when an error occurs', async () => {
      mockUpdateEducation.mockRejectedValueOnce(new Error('Database connection failed'));
      await putEducation(mockRequest, mockResponse);
      expect(mockUpdateEducation).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith(createErrorMsg('Server Error'));
    });
  });

  describe('deleteEducation', () => {

    beforeEach(() => {
      mockRequest.body = {
        userId: '123',
      }
      mockRequest.params = {
        eduId: '456',
      }
    })

    const mockRemoveEducation = removeEducation as jest.MockedFunction<typeof removeEducation>;

    it('should remove an education', async () => {
      // @ts-ignore
      mockRemoveEducation.mockResolvedValueOnce({ success: true });
      await deleteEducation(mockRequest, mockResponse);
      expect(mockRemoveEducation).toHaveBeenCalledWith('123', '456');
      expect(mockResponse.send).toHaveBeenCalledWith({ success: true });
    });

    it('should return an internal server error status when an error occurs', async () => {
      mockRemoveEducation.mockRejectedValueOnce(new Error('Database connection failed'));
      await deleteEducation(mockRequest, mockResponse);
      expect(mockRemoveEducation).toHaveBeenCalledWith('123', '456');
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith(createErrorMsg('Server Error'));
    });
  });
});
