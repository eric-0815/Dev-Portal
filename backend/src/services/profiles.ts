import Profile, { ProfileType, Social } from "../models/Profile"

import { createErrorMsg } from "../utils/error"
import mongoose from "mongoose";

export interface ProfileInfo {
    company: string;
    website: string;
    location: string;
    bio: string;
    status: string;
    githubusername: string;
    skills: string,
    youtube: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    facebook: string;
    userId: string;
}

// export const findProfileByUserId = async (userId: string) => {
//     // use populate to work with the user table and get name and avatar 
//     const profile = await Profile.findOne({ userId }).populate('user',
//         ['name', 'avatar'])

//     if (!profile) return createErrorMsg('There is not profile for this user')

//     return profile
// }

export const addOrCreateProfile = async (profileInfo: ProfileInfo) => {
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        userId
    } = profileInfo

    const profileFields = {} as ProfileType;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) profileFields.skills = skills.split(",").map((skill) => skill.trim());

    // Build social object
    profileFields.social = {} as Social;
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (facebook) profileFields.social.facebook = facebook;
    if (userId) profileFields.userId = userId;

    const profile = await findProfileByUserId(userId);
    if (profile) {
        const updatedProfile = await updateProfile(profileFields);
        return updatedProfile;
    }

    // Create
    const createdProfile = await createProfile(profileFields)
    return createdProfile
}

const createProfile = async (profileFields: ProfileType) => {
    const createdProfile = new Profile(profileFields);
    await createdProfile.save();
    return createdProfile;
}

const updateProfile = async (profileFields: ProfileType) => {
    const { userId } = profileFields
    // Update
    const updatedProfile = await Profile.findOneAndUpdate(
        { userId },
        { $set: profileFields },
        { new: true }
    )
    return updatedProfile
}

const findProfileByUserId = async (userId: string) => {
    const profile = await Profile.findOne({ userId })
    return profile
}
