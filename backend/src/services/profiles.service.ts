import Profile, { Experience, ProfileType, Social } from "../models/Profile.model"
import User from "../models/User.model";
import { createErrorMsg } from "../utils/error"
import mongoose from "mongoose";
import { validateEducationInput, validateExperienceInput, validateProfile } from "../utils/validator";
import config from "config";
import request, { Response } from 'request';


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

interface EducationInfo {
    school: string;
    degree: string;
    fieldofstudy: string;
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

    const errors = validateProfile(profileInfo);
    if (errors.length > 0) return ({ errors })

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
        { user },
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

    const errors = validateExperienceInput(experience);
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

export const removeExperience = async (userId: string, expId: string) => {
    const profile = await findProfileByUserId(userId);

    const removeIndex = profile?.experience
        .map((item: any) => item.id)
        .indexOf(expId)

    if (removeIndex) {
        console.log(`before: ${profile}`)
        profile?.experience.splice(removeIndex, 1)
        await profile?.save();
        console.log(`after: ${profile}`)
        return profile
    }
}

export const updateEducation = async (education: EducationInfo) => {
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
        userId
    } = education;

    const errors = validateEducationInput(education);
    if (errors.length > 0) return ({ errors })

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    };

    const profile = await findProfileByUserId(userId);
    profile?.education?.unshift(newEdu);
    profile?.save();

    return profile
}

export const removeEducation = async (userId: string, eduId: string) => {
    const profile = await findProfileByUserId(userId);

    const removeIndex = profile?.education
        .map((item: any) => item.id)
        .indexOf(eduId)

    if (removeIndex) {
        profile?.education.splice(removeIndex, 1)
        await profile?.save();
        return profile
    }
}

export const getGitHubResponse = async (userName: string) => {
    const options = {
        uri: `https://api.github.com/users/${userName
            }/repos?per_page=5&sort=created:asc&client_id=${config.get(
                "githubClientId"
            )}&client_secret=${config.get("githubSecret")}`,
        method: "GET",
        headers: { "user-agent": "node.js" },
    };

    request(options, (error: any, response: Response, body: string) => {
        if (error) console.error(error);
        if (response.statusCode !== 200) {
            return ({ msg: "No GitHub profile found" });
        }
        console.log(JSON.parse(body))
        return JSON.parse(body)
    });
}

