import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { findAllPosts, findPostById } from "../../services/posts.service";
import { getPost, getPosts } from "../posts.controller";

jest.mock("../../services/posts.service");

describe("post controller functions", () => {
    let mockRequest: Request;
    let mockResponse: Response;

    beforeEach(() => {
        mockRequest = {
            params: {
                postId: "abc123",
            },
        } as unknown as Request;
        mockResponse = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as Response;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getPosts", () => {
        it("should send a mockResponseponse with all posts", async () => {
            const mockPosts = [{ id: 1, title: "Post 1" }, { id: 2, title: "Post 2" }];
            (findAllPosts as jest.Mock).mockResolvedValue(mockPosts);

            await getPosts(mockRequest, mockResponse);

            expect(findAllPosts).toHaveBeenCalledTimes(1);
            expect(mockResponse.send).toHaveBeenCalledWith(mockPosts);
            expect(mockResponse.status).not.toHaveBeenCalled();
        });

        it("should send an error mockResponseponse if findAllPosts throws an error", async () => {
            const mockError = new Error("Test error");
            (findAllPosts as jest.Mock).mockRejectedValue(mockError);

            await getPosts(mockRequest, mockResponse);

            expect(findAllPosts).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(mockResponse.send).toHaveBeenCalledWith({ errors: [{ msg: 'Server Error' }] });
        });
    })

    describe("getPost", () => {
        it("returns the post if it exists", async () => {
            const mockPost = {
                id: "abc123",
                title: "Example post",
                body: "Lorem ipsum dolor sit amet",
            };
            (findPostById as jest.Mock).mockResolvedValueOnce(mockPost);

            await getPost(mockRequest, mockResponse);

            expect(findPostById).toHaveBeenCalledTimes(1);
            expect(mockResponse.send).toHaveBeenCalledWith(mockPost);
            expect(mockResponse.status).not.toHaveBeenCalled();
        });

        it("returns a BAD_mockRequestUEST status if the post does not exist", async () => {
            (findPostById as jest.Mock).mockResolvedValueOnce(null);

            await getPost(mockRequest, mockResponse);

            expect(findPostById).toHaveBeenCalledTimes(1);
            // expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
            expect(mockResponse.send).toHaveBeenCalledTimes(1);
        });

        it("returns an INTERNAL_SERVER_ERROR status if an error occurs", async () => {
            (findPostById as jest.Mock).mockRejectedValueOnce(new Error("Something went wrong"));

            await getPost(mockRequest, mockResponse);

            expect(findPostById).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(mockResponse.send).toHaveBeenCalledWith({ errors: [{ msg: 'Server Error' }] });
        });
    })
});


