import * as EmailValidator from 'email-validator';
import { ValidateMethod } from '../constants/ValidateMethod';

export const validateUserInfo = (body: any, method: string) => {
    const errors = []

    if (method !== ValidateMethod.LOGIN && !body.name) errors.push('Name is required');
    if (!body.email || !EmailValidator.validate(body.email)) errors.push('Please include a valid email');
    if (!body.password || body.password?.length < 6) errors.push('Please enter a password with 6 or more characters')
    return errors
}