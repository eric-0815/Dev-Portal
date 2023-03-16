import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { RootState } from "../../store/configureStore";
import { getPostsAsync, postSlice, getPostAsync, deletePostAsync } from "../postSlice";
import Post from "../../components/Posts/components/Post";

// @ts-ignore
const mockPost: Post = {
  _id: "1",
  user: {
    _id: "1",
    name: "John",
    email: "john@example.com",
  },
  text: "This is a test post",
  likes: [],
  comments: [],
  date: new Date(),
};

const mockComment: Comment = {
  // @ts-ignore
  _id: "1",
  user: {
    _id: "1",
    name: "John",
    email: "john@example.com",
  },
  text: "This is a test comment",
  date: new Date(),
};

describe("postSlice", () => {
  let dispatch: ThunkDispatch<RootState, undefined, AnyAction>;
  let getState: () => RootState;

  beforeEach(() => {
    dispatch = jest.fn();
    // @ts-ignore
    getState = jest.fn(() => ({
      post: {
        posts: [],
        post: null,
        loading: false,
        error: {},
      },
    }));
  });

  describe("getPostsAsync", () => {
    it("should dispatch getPostsSuccess with the correct payload on success", async () => {
      // Arrange
      jest.spyOn(agent.Post, "getPosts").mockResolvedValue([mockPost]);

      // Act
      await getPostsAsync()(dispatch, getState, undefined);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        postSlice.actions.getPostsSuccess([mockPost])
      );
    });

    it("should dispatch postError with the error message on failure", async () => {
      // Arrange
      const errorMessage = "Unable to get posts";
      jest.spyOn(agent.Post, "getPosts").mockRejectedValue(errorMessage);

      // Act
      await getPostsAsync()(dispatch, getState, undefined);

      // Assert
      expect(dispatch).toHaveBeenCalledTimes(2)
    });
  });

  describe("getPostAsync", () => {
    it("should dispatch getPostSuccess with the correct payload on success", async () => {
      // Arrange
      jest.spyOn(agent.Post, "getPost").mockResolvedValue(mockPost);

      // Act
      await getPostAsync("1")(dispatch, getState, undefined);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        postSlice.actions.getPostSuccess(mockPost)
      );
    });

    it("should dispatch postError with the error message on failure", async () => {
      // Arrange
      const errorMessage = "Unable to get post";
      jest.spyOn(agent.Post, "getPost").mockRejectedValue(errorMessage);

      // Act
      await getPostAsync("1")(dispatch, getState, undefined);

      // Assert
      expect(dispatch).toHaveBeenCalledTimes(2)
    });
  });

  describe("deletePostAsync", () => {
    it("should dispatch deletePost with the correct payload on success", async () => {
      // Arrange
      jest.spyOn(agent.Post, "deletePost").mockResolvedValue("1");

      // Act
      await deletePostAsync("1")(dispatch, getState, undefined);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        postSlice.actions.deletePost("1")
      );
    });
  })
})