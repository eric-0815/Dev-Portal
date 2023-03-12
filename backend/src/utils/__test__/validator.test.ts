import { Experience } from '../../models/Profile.model';
import { validateUserInfo, validateExperienceInput, validateEducationInput, validatePostOrCommentInput, validateProfile } from '../validator';


describe('validateUserInfo', () => {
    it('should return an error message if name is not provided for method other than login', () => {
        const userInput = { email: 'test@test.com', password: 'password' };
        const result = validateUserInfo(userInput, 'register');
        expect(result).toContainEqual({ msg: 'Name is required' });
    });

    it('should return an error message if email is not provided or is invalid', () => {
        const userInput = { name: 'test user', email: '', password: 'password' };
        const result = validateUserInfo(userInput, 'register');
        expect(result).toContainEqual({ msg: 'Please include a valid email' });
    });

    it('should return an error message if password is not provided or is less than 6 characters long', () => {
        const userInput = { name: 'test user', email: 'test@test.com', password: 'abc' };
        const result = validateUserInfo(userInput, 'register');
        expect(result).toContainEqual({ msg: 'Please enter a password with 6 or more characters' });
    });
});

describe('validateExperienceInput', () => {
    it('should return an error message if experience input is not provided', () => {
        const experience = {}
        // @ts-ignore
        const result = validateExperienceInput(experience);
        expect(result).toContainEqual({ msg: 'Title is required' });
        expect(result).toContainEqual({ msg: 'Company is required' });
        expect(result).toContainEqual({ msg: 'From date is required' });
    });
});

describe('validateEducationInput', () => {
    it('should return an error message if education input is not provided', () => {
        const education = {};
        // @ts-ignore
        const result = validateEducationInput(education);
        expect(result).toContainEqual({ msg: 'School is required' });
        expect(result).toContainEqual({ msg: 'Degree is required' });
        expect(result).toContainEqual({ msg: 'Field of study is required' });
        expect(result).toContainEqual({ msg: 'From date is required' });
    });
})

describe('validatePostOrCommentInput', () => {
    test('should return an array if text is provided', () => {
        const post = {};
        // @ts-ignore
        const errors = validatePostOrCommentInput(post);
        expect(errors).toEqual([{ msg: 'Text is required' }]);
    });
});

describe('validateProfile', () => {
    it('should return errors when profile input is missing', () => {
        const profileInfo = {};
        // @ts-ignore
        const result = validateProfile(profileInfo);
        expect(result).toContainEqual({ msg: 'Company is required' });
        expect(result).toContainEqual({ msg: 'Website is required' });
        expect(result).toContainEqual({ msg: 'Location of study is required' });
        expect(result).toContainEqual({ msg: 'Status date is required' });
        expect(result).toContainEqual({ msg: 'Skills date is required' });
    });
});
