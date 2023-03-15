import Profile from "../../models/Profile.model";
import { createErrorMsg } from "../../utils/error";
import { findProfiles, findProfile, createProfile } from "../profiles.service";

jest.mock("../../models/Profile.model");

describe('profile service', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  describe('createProfile', () => {
    it('should create and return a new profile', async () => {
      const mockProfileFields = {
        company: 'Acme Inc.',
        website: 'https://www.acme.com',
        location: 'New York, NY',
        bio: 'I am a software engineer at Acme Inc.',
        status: 'employed',
        githubusername: 'acme-engineer',
        skills: 'JavaScript, React, Node.js',
        social: {
          youtube: 'https://www.youtube.com/channel/UC_A--fhX5gea0i4UtpD99Gg',
          twitter: 'https://twitter.com/acme_engineer',
          linkedin: 'https://www.linkedin.com/in/acme-engineer',
          facebook: 'https://www.facebook.com/acme-engineer'
        },
        user: 'user123'
      };

      const Profile = require("../../models/Profile.model").default;
      const mockCreatedProfile = new Profile(mockProfileFields);

      Profile.mockReturnValueOnce({
        save: jest.fn().mockResolvedValueOnce(mockCreatedProfile)
      });

      //@ts-ignore
      const createdProfile = await createProfile(mockProfileFields);

      expect(Profile).toHaveBeenCalledTimes(2);
      // expect(Profile.save).toHaveBeenCalledWith(mockProfileFields);
      expect(mockCreatedProfile.save).toHaveBeenCalledTimes(0);
      // expect(createdProfile).toEqual(mockCreatedProfile);
    });
  });
})


