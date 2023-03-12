import * as EmailValidator from 'email-validator';
import { ValidateMethod } from '../constants/ValidateMethod';
import { Education, Experience } from '../models/Profile.model';
import { CommentInput, PostInput } from '../services/posts.service';
import { ProfileInfo } from '../services/profiles.service';

export const validateUserInfo = (userInput: any, method: string) => {
    const errors = []

    if (method !== ValidateMethod.LOGIN && !userInput.name) errors.push({ msg: 'Name is required' });
    if (!userInput.email || !EmailValidator.validate(userInput.email)) errors.push({ msg: 'Please include a valid email' });
    if (!userInput.password || userInput.password?.length < 6) errors.push({ msg: 'Please enter a password with 6 or more characters' })
    return errors
}

export const validateExperienceInput = (experience: Experience) => {
    const errors = []

    if (!experience.title) errors.push({ msg: 'Title is required' });
    if (!experience.company) errors.push({ msg: 'Company is required' });
    if (!experience.from) errors.push({ msg: 'From date is required' });
    return errors
}

export const validateEducationInput = (education: Education) => {
    const errors = []

    if (!education.school) errors.push({ msg: 'School is required' });
    if (!education.degree) errors.push({ msg: 'Degree is required' });
    if (!education.fieldofstudy) errors.push({ msg: 'Field of study is required' });
    if (!education.from) errors.push({ msg: 'From date is required' });
    return errors
}

export const validatePostOrCommentInput = (postOrComment: PostInput | CommentInput) => {
    const errors = []
    if (!postOrComment.text) errors.push({ msg: 'Text is required' });
    return errors
}

export const validateProfile = (profileInfo: ProfileInfo) => {
    const errors = []

    if (!profileInfo.company) errors.push({ msg: 'Company is required' });
    if (!profileInfo.website) errors.push({ msg: 'Website is required' });
    if (!profileInfo.location) errors.push({ msg: 'Location of study is required' });
    if (!profileInfo.status) errors.push({ msg: 'Status date is required' });
    if (!profileInfo.skills) errors.push({ msg: 'Skills date is required' });
    return errors
}
