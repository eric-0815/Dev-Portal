import mongoose from "mongoose";
import Post, { PostType } from "../../models/Post.model";
import User from "../../models/User.model";
import { findAllPosts, findPostById, findUserByIdWithoutPassword } from "../posts.service";

jest.mock("../../models/Post.model");

describe('post service', () => {
  describe("Post service", () => {
    describe("findAllPosts", () => {
      it("should return all posts", async () => {
        const mockPosts = [
          // @ts-ignore
          { _id: "1", text: "post 1", date: new Date() },
          { _id: "2", text: "post 2", date: new Date() },
          { _id: "3", text: "post 3", date: new Date() },
        ] as PostType[];

        (Post.find as jest.Mock).mockReturnValueOnce({
          sort: jest.fn().mockResolvedValueOnce(mockPosts),
        });

        const posts = await findAllPosts();

        expect(posts).toEqual(mockPosts);
        expect(Post.find).toHaveBeenCalled();
      });
    });

    describe("findPostById", () => {
      it("should return the post with the given ID", async () => {
        // @ts-ignore
        const mockPost = { _id: "1", text: "test post", date: new Date() } as PostType;

        (Post.findById as jest.Mock).mockResolvedValueOnce(mockPost);

        const postId = "1";
        const post = await findPostById(postId);

        expect(post).toEqual(mockPost);
        expect(Post.findById).toHaveBeenCalledWith(postId);
      });
    });
  });

  describe("findUserByIdWithoutPassword", () => {
    it("should return the user object without the password field", async () => {
      const userId = "123";
      const expectedUser = { _id: userId, name: "John Doe" };
      const selectMock = jest.fn().mockReturnValue(expectedUser);
      const findByIdMock = jest.spyOn(User, "findById").mockReturnValue({ select: selectMock } as any);

      const user = await findUserByIdWithoutPassword(userId);

      expect(findByIdMock).toHaveBeenCalledWith(userId);
      expect(selectMock).toHaveBeenCalledWith("-password");
      expect(user).toEqual(expectedUser);
    });
  });
})


