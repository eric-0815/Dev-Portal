import Profile from "../models/Profile"
import { createErrorMsg } from "../utils/error"
import { Social } from '../models/Profile'

export interface ProfileInfo {
    company: string;
    website: string;
    location: string;
    bio: string;
    status: string;
    githubusername: string;
    skills: Social,
    youtube: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    facebook: string;
    userId: string;
}

export const findProfile = async (userId: string) => {
    // use populate to work with the user table and get name and avatar 
    const profile = await Profile.findOne({ userId }).populate('user',
        ['name', 'avatar'])

    if (!profile) return createErrorMsg('There is not profile for this user')

    return profile
}

export const createProfile = async (profile: ProfileInfo) => {
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
    } = profile

    const profileFields = {} as ProfileInfo;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills.facebook = skills.facebook;
        profileFields.skills.instagram = skills.instagram;
        profileFields.skills.linkedin = skills.linkedin;
        profileFields.skills.twitter = skills.twitter;
        profileFields.skills.youtube = skills.youtube;
    }

}
