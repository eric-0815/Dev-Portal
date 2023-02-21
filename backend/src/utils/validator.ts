import * as EmailValidator from 'email-validator';
import { ValidateMethod } from '../constants/ValidateMethod';
import { Education, Experience } from '../models/Profile';

export const validateUserInfo = (userInput: any, method: string) => {
    const errors = []

    if (method !== ValidateMethod.LOGIN && !userInput.name) errors.push('Name is required');
    if (!userInput.email || !EmailValidator.validate(userInput.email)) errors.push('Please include a valid email');
    if (!userInput.password || userInput.password?.length < 6) errors.push('Please enter a password with 6 or more characters')
    return errors
}

export const validateExperienceInput = (experience: Experience) => {
    const errors = []

    if (!experience.title) errors.push('Title is required');
    if (!experience.company) errors.push('Company is required');
    if (!experience.from) errors.push('From date is required');
    return errors
}

export const validateEducationInput = (education: Education) => {
    const errors = []

    if (!education.school) errors.push('School is required');
    if (!education.degree) errors.push('Degree is required');
    if (!education.fieldofstudy) errors.push('Field of study is required');
    if (!education.from) errors.push('From date is required');
    return errors
}

