import mongoose from "mongoose";
import { getUser } from "../auth.service";


jest.mock("../../models/User.model");

describe("getUser function", () => {

  const mockUser = {
    _id: "fakeUserId",
    name: "John Doe",
    email: "johndoe@example.com",
    password: "fakePassword",
    avatar: "fakeAvatarUrl",
    date: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the user with the specified ID", async () => {
    // Set up the mock User model
    const User = require("../../models/User.model").default;
    User.findById.mockReturnValueOnce({
      select: jest.fn().mockReturnValueOnce(mockUser),
    });

    // Call the getUser function with the mock user ID
    const userId = "fakeUserId";
    const result = await getUser(userId);

    // Expect the User model to have been called with the correct arguments
    expect(User.findById).toHaveBeenCalledWith(userId);

    // Expect the returned user to match the mock user
    expect(result).toEqual(mockUser);
  });

  it("should return null if no user with the specified ID is found", async () => {
    // Set up the mock User model
    const User = require("../../models/User.model").default;
    User.findById.mockReturnValueOnce({
      select: jest.fn().mockReturnValueOnce(null)
    });

    // Call the getUser function with a non-existent user ID
    const userId = "fakeNonExistentUserId";
    const result = await getUser(userId);

    // Expect the User model to have been called with the correct arguments
    expect(User.findById).toHaveBeenCalledWith(userId);

    // Expect the returned result to be null
    expect(result).toBeNull();
  });
});
