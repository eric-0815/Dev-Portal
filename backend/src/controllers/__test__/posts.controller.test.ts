import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { findAllPosts, findPostById, removePostById } from "../../services/posts.service";
import { createErrorMsg } from "../../utils/error";
import { deletePost, getPost, getPosts } from "../posts.controller";

jest.mock("../../services/posts.service");

describe("post controller functions", () => {
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
        beforeEach(() => {
            mockRequest.params = {
                postId: "abc123",
            }
        });

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

    describe("deletePost", () => {

        beforeEach(() => {
            mockRequest.params = {
                postId: "postId123",
            }
            mockRequest.body = {
                userId: "userId123",
            }
        });

        it("should return a 200 status code when the post is deleted successfully", async () => {
            (removePostById as jest.Mock).mockResolvedValueOnce("post deleted");

            await deletePost(mockRequest, mockResponse);

            expect(removePostById).toHaveBeenCalledTimes(1);
            expect(mockResponse.send).toHaveBeenCalledWith("post deleted");
        });

        it("should return a 401 status code when the user is not authorized", async () => {
            (removePostById as jest.Mock).mockResolvedValueOnce({
                errors: [{ msg: "User not authorized" }],
            });

            await deletePost(mockRequest, mockResponse);

            expect(removePostById).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
            expect(mockResponse.send).toHaveBeenCalledWith({
                errors: [{ msg: "User not authorized" }],
            });
        });

        it("should return a 400 status code when there are errors deleting the post", async () => {
            (removePostById as jest.Mock).mockResolvedValueOnce({
                errors: [{ msg: "Server Error" }],
            });

            await deletePost(mockRequest, mockResponse);

            expect(removePostById).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
            expect(mockResponse.send).toHaveBeenCalledWith({
                errors: [{ msg: "Server Error" }],
            });
        });

        it("should return a 500 status code when an internal server error occurs", async () => {
            (removePostById as jest.Mock).mockRejectedValueOnce("Internal server error");

            await deletePost(mockRequest, mockResponse);

            expect(removePostById).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(mockResponse.send).toHaveBeenCalledWith({ errors: [{ msg: "Server Error" }] });
        });
    });
});


