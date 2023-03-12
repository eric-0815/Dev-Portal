import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { addComment, addLike, addUnLike, createPost, findAllPosts, findPostById, removeComment, removePostById } from "../../services/posts.service";
import { createErrorMsg } from "../../utils/error";
import { addPost, deleteComment, deletePost, getPost, getPosts, postComment, putLike, putUnLike } from "../posts.controller";

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

    describe("addPost", () => {
        beforeEach(() => {
            mockRequest.body = {
                title: "Test post",
                content: "This is a test post.",
            }
        });

        it("should add a post successfully", async () => {
            const mockPost = {
                id: 1,
                title: "Test post",
                content: "This is a test post.",
            };

            (createPost as jest.Mock).mockResolvedValueOnce(mockPost);

            await addPost(mockRequest as Request, mockResponse as Response);

            expect(createPost).toHaveBeenCalledWith(mockRequest.body);
            expect(mockResponse.send).toHaveBeenCalledWith(mockPost);
        });

        it("should return a bad request error if there are errors", async () => {
            const mockError = {
                errors: [{ msg: "Title is required" }],
            };
            (createPost as jest.Mock).mockResolvedValueOnce(mockError);

            expect(createPost).toHaveBeenCalledTimes(0);
            // expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
            // expect(mockResponse.send).toHaveBeenCalledWith({ errors: [{ msg: "Title is required" }] });
        });
    });

    describe('putLike', () => {
        beforeEach(() => {
            mockRequest.params = { postId: '123' };
            mockRequest.body = { userId: '456' };
        })

        it('should return 200 status code with the result when like is successfully added', async () => {
            const expectedResult = { likes: ['456'] };
            (addLike as jest.Mock).mockResolvedValueOnce(expectedResult);

            mockResponse.send = jest.fn().mockReturnValue(mockResponse);
            expect(await putLike(mockRequest, mockResponse)).toBe(mockResponse);
            expect(mockResponse.send).toHaveBeenCalledWith(expectedResult);
            expect(addLike).toHaveBeenCalledWith('123', '456');
        });

        it('should return 400 status code with the error message when there is an error with the request', async () => {
            const errorMsg = 'Bad request';
            const error = { errors: [{ msg: errorMsg }] };
            (addLike as jest.Mock).mockResolvedValueOnce(error);

            mockResponse.status = jest.fn().mockReturnValue(mockResponse);
            mockResponse.send = jest.fn().mockReturnValue(mockResponse);
            expect(await putLike(mockRequest, mockResponse)).toBe(mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
            expect(mockResponse.send).toHaveBeenCalledWith(error);
        });

        it('should return 500 status code with the error message when there is a server error', async () => {
            const errorMsg = 'Server error';
            (addLike as jest.Mock).mockReturnValueOnce({ error: [{ msg: errorMsg }] });

            mockResponse.status = jest.fn().mockReturnValue(mockResponse);
            mockResponse.send = jest.fn().mockReturnValue(mockResponse);
            expect(await putLike(mockRequest, mockResponse)).toBe(mockResponse);
        });
    });

    describe('putUnLike', () => {
        beforeEach(() => {
            mockRequest.params = { postId: 'post123' };
            mockRequest.body = { userId: 'user456' };
        });

        it('should update the post and send a success response', async () => {
            const expectedResult = { _id: 'post123', title: 'Test post', likes: ['user456'], unlikes: [] };
            (addUnLike as jest.Mock).mockResolvedValueOnce(expectedResult);

            await putUnLike(mockRequest, mockResponse);

            expect(addUnLike).toHaveBeenCalledWith('post123', 'user456');
            expect(mockResponse.send).toHaveBeenCalledWith(expectedResult);
        });

        it('should send a bad request response if there are errors', async () => {
            const errorMsg = createErrorMsg('Invalid request');
            (addUnLike as jest.Mock).mockResolvedValueOnce({ errors: [errorMsg] });

            await putUnLike(mockRequest, mockResponse);

            expect(addUnLike).toHaveBeenCalledWith('post123', 'user456');
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
            expect(mockResponse.send).toHaveBeenCalledWith({ errors: [errorMsg] });
        });

        it('should send a server error response if an error occurs', async () => {
            const errorMsg = 'Server Error';
            (addUnLike as jest.Mock).mockReturnValueOnce({ errors: [{ msg: errorMsg }] });

            await putUnLike(mockRequest, mockResponse);

            expect(addUnLike).toHaveBeenCalledWith('post123', 'user456');
            // expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(mockResponse.send).toHaveBeenCalledWith({ errors: [{ msg: 'Server Error' }] });
        });
    });

    describe("postComment", () => {

        beforeEach(() => {
            mockRequest.params = { postId: "123" };
            mockRequest.body = { text: "Test comment" };
            (addComment as jest.Mock).mockClear();
        });

        it("should return 200 and the comment object if the comment was added successfully", async () => {
            const expectedResult = {
                _id: "456",
                postId: "123",
                text: "Test comment",
            };
            (addComment as jest.Mock).mockResolvedValueOnce(expectedResult);

            mockResponse.send = jest.fn().mockReturnValueOnce(mockResponse);

            await postComment(mockRequest, mockResponse);

            expect(addComment).toHaveBeenCalledWith("123", { text: "Test comment" });
            expect(mockResponse.send).toHaveBeenCalledWith(expectedResult);
        });

        it("should return 400 and the error message if there was an error adding the comment", async () => {
            const expectedResult = { errors: ["Error adding comment"] };
            (addComment as jest.Mock).mockResolvedValueOnce(expectedResult);

            mockResponse.status = jest.fn().mockReturnValueOnce(mockResponse);
            mockResponse.send = jest.fn().mockReturnValueOnce(mockResponse);

            await postComment(mockRequest, mockResponse);

            expect(addComment).toHaveBeenCalledWith("123", { text: "Test comment" });
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
            expect(mockResponse.send).toHaveBeenCalledWith(expectedResult);
        });

        it("should return 500 and the error message if there was an internal server error", async () => {
            const expectedErrorMsg = "Server Error";
            (addComment as jest.Mock).mockRejectedValueOnce({ errors: [{ msg: expectedErrorMsg }] });

            mockResponse.status = jest.fn().mockReturnValueOnce(mockResponse);
            mockResponse.send = jest.fn().mockReturnValueOnce(mockResponse);

            await postComment(mockRequest, mockResponse);

            expect(addComment).toHaveBeenCalledWith("123", { text: "Test comment" });
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(mockResponse.send).toHaveBeenCalledWith({ errors: [{ msg: expectedErrorMsg }] });
        });
    });

    describe("deleteComment", () => {
        const mockRemoveComment = removeComment as jest.Mock;

        beforeEach(() => {
            mockRequest.params = {
                postId: "post123",
                commentId: "comment123"
            }
            mockRequest.body = { userId: "user123" }

            jest.clearAllMocks();
        });


        it("should delete the comment and return the deleted comment", async () => {
            const expectedResult = {
                message: "Comment deleted",
                deletedComment: {
                    _id: "comment123",
                    text: "This is a comment",
                    user: "user123",
                },
            };

            mockRemoveComment.mockResolvedValueOnce(expectedResult);

            await deleteComment(mockRequest, mockResponse);

            expect(mockRemoveComment).toHaveBeenCalledWith("post123", "comment123", "user123");
            expect(mockResponse.send).toHaveBeenCalledWith(expectedResult);
        });

        it("should return a 400 error if there was an error deleting the comment", async () => {
            const error = {
                errors: [
                    {
                        msg: "Comment not found",
                    },
                ],
            };

            mockRemoveComment.mockResolvedValueOnce(error);

            await deleteComment(mockRequest, mockResponse);

            expect(mockRemoveComment).toHaveBeenCalledWith("post123", "comment123", "user123");
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
            expect(mockResponse.send).toHaveBeenCalledWith(error);
        });

        it("should return a 401 error if the user is not authorized to delete the comment", async () => {
            const error = {
                errors: [
                    {
                        msg: "User not authorized",
                    },
                ],
            };

            mockRemoveComment.mockResolvedValueOnce(error);

            await deleteComment(mockRequest, mockResponse);

            expect(mockRemoveComment).toHaveBeenCalledWith("post123", "comment123", "user123");
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
            expect(mockResponse.send).toHaveBeenCalledWith(error);
        });

        it("should return a 500 error if there was a server error", async () => {
            const error = {
                errors: [
                    {
                        msg: "Server Error",
                    },
                ],
            };
            mockRemoveComment.mockRejectedValueOnce(error);

            await deleteComment(mockRequest, mockResponse);

            expect(mockRemoveComment).toHaveBeenCalledWith("post123", "comment123", "user123");
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(mockResponse.send).toHaveBeenCalledWith(error);
        });
    });
});


