import Profile, { Experience, ProfileType, Social } from "../models/Profile"
import User from "../models/User";
import { createErrorMsg } from "../utils/error"
import mongoose from "mongoose";
import { validateExperienceInput } from "../utils/validator";


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

interface ExperienceInfo {
    title: string;
    company: string;
    location: string;
    from: Date;
    to: Date;
    current: boolean;
    description: string;
    userId: string;
}


export const findProfiles = async () => {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    return profiles
}

export const findProfile = async (userId: string) => {
    // use populate to work with the user table and get name and avatar 
    const profile = await Profile.findOne({ user: userId }).populate('user', ['name', 'avatar'])

    if (!profile) return createErrorMsg('There is not profile for this user')

    return profile
}

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
    // @ts-ignore
    if (userId) profileFields.user = new mongoose.Types.ObjectId(userId);
    // @ts-ignore
    const profile = await findProfileByUserId(profileFields.user);
    if (profile) {
        const updatedProfile = await updateProfile(profileFields);
        console.log(`updatedProfile`)
        return updatedProfile;
    }

    // Create
    const createdProfile = await createProfile(profileFields)
    console.log(`createdProfile`)
    return createdProfile
}

const createProfile = async (profileFields: ProfileType) => {
    const createdProfile = new Profile(profileFields);
    await createdProfile.save();
    return createdProfile;
}

const updateProfile = async (profileFields: ProfileType) => {
    const { user } = profileFields
    // Update
    const updatedProfile = await Profile.findOneAndUpdate(
        { userId: user },
        { $set: profileFields },
        { new: true }
    )
    return updatedProfile
}

const findProfileByUserId = async (userId: mongoose.Types.ObjectId | string) => {
    const profile = await Profile.findOne({ user: userId })
    return profile
}

export const removeProfile = async (userId: string) => {
    await Profile.findOneAndRemove({ user: userId })

    await User.findOneAndRemove({ _id: userId })

    return ({ msg: 'User deleted' })
}

export const updateExperience = async (experience: ExperienceInfo) => {
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
        userId
    } = experience;

    const errors = await validateExperienceInput(experience);
    if (errors.length > 0) return ({ errors })

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
    } as Experience;

    const profile = await findProfileByUserId(userId);
    profile?.experience?.unshift(newExp);
    profile?.save();

    return profile
}
