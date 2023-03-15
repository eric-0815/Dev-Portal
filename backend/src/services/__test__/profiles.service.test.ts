import Profile from "../../models/Profile.model";
import { createErrorMsg } from "../../utils/error";
import { findProfiles, findProfile } from "../profiles.service";

jest.mock("../../models/Profile.model");

describe('profile service', () => {
  describe("findProfiles function", () => {
    it("should return an array of profiles", async () => {
      const profiles = [{ name: "John" }, { name: "Jane" }];

      const Profile = require("../../models/Profile.model").default;
      Profile.find.mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce(profiles)
      });

      const result = await findProfiles();

      expect(result).toEqual(profiles);
    });
  });

  describe("findProfile function", () => {
    it("should return a profile for a valid user ID", async () => {
      const userId = "123";
      const profile = { name: "John", user: userId };

      const Profile = require("../../models/Profile.model").default;
      Profile.findOne.mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce(profile)
      });

      const result = await findProfile(userId);

      expect(result).toEqual(profile);
    });

    it("should return an error message for an invalid user ID", async () => {
      const userId = "456";

      const Profile = require("../../models/Profile.model").default;
      Profile.findOne.mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce(null)
      });

      const result = await findProfile(userId);

      expect(result).toEqual(createErrorMsg('There is not profile for this user'));
    });
  });
})


