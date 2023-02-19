import * as EmailValidator from 'email-validator';
import User from '../models/User'
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
export interface UserInfo {
    name: string;
    email: string;
    password: string;
    avatar: string;
}

export const createUser = async (body: UserInfo) => {
    const { name, email, password } = body;
    try {
        const avatar = createAvatar(email);

        const user = new User({
            name,
            email,
            avatar,
            password
        });

        user.password = await encryptPassword(password);

        // await user.save();

        const token = createToken(user.id)

        return { token }

    } catch (err: any) {
        console.error(err.message)
        throw new Error(`Server error ${err.message}`)
    }
}

export const validateUserInfo = (body: any) => {
    const errors = []
    const { name, email, password } = body
    if (!name) errors.push('Name is required');
    if (!email || !EmailValidator.validate(email)) errors.push('Please include a valid email');
    if (!password || password?.length < 6) errors.push('Please enter a password with 6 or more characters')
    return errors
}

export const checkIfUserExist = async (email: string) => {
    const user = await User.findOne({ email });
    return user ? true : false
}

const createAvatar = (email: string) => {
    return gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })
}

const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt)
    return encryptedPassword
}

const createToken = (userId: string) => {
    const payload = {
        user: {
            id: userId
        }
    };

    const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 });

    return token;
}
