import User from '../models/User.model'
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import { validateUserInfo } from '../utils/validator'
import { ValidateMethod } from '../constants/ValidateMethod'
import { createErrorMsg } from '../utils/error'

export interface UserRegistration {
    name: string;
    email: string;
    password: string;
    avatar: string;
}

export interface UserLogin {
    email: string;
    password: string;
}


export const createUser = async (body: UserRegistration) => {
    const isExist = await checkIfUserExists(body.email)
    if (isExist) return createErrorMsg('User already exists')

    const errors = await validateUserInfo(body, ValidateMethod.REGISTER)
    if (errors.length > 0) return ({ errors })

    const { name, email, password } = body;

    const avatar = createAvatar(email);

    const user = new User({
        name,
        email,
        avatar,
        password
    });

    user.password = await encryptPassword(password);

    await user.save();

    const token = createToken(user.id)

    return { token }
}

export const authenticateUser = async (body: UserLogin) => {
    const errors = await validateUserInfo(body, ValidateMethod.LOGIN)
    if (errors.length > 0) return ({ errors })

    const { email, password } = body
    let user = await getUserByEmail(email);
    if (!user) return createErrorMsg("Invalid Credentials");

    const isMatch = await checkPassword(password, user.password)
    if (!isMatch) return createErrorMsg("Invalid Credentials");

    const token = createToken(user.id)

    return { token }
}


const checkIfUserExists = async (email: string) => {
    const user = await User.findOne({ email });
    return user ? true : false
}

const getUserByEmail = async (email: string) => {
    const user = await User.findOne({ email });
    return user;
}

const checkPassword = async (inputPassword: string, userPassword: string) => {
    const isMatch = await bcrypt.compare(inputPassword, userPassword);
    return isMatch
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
    const jwtSecret = config.get<string>('jwtSecret');
    const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 });

    return token;
}


