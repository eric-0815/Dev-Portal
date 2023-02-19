import { Request, Response } from "express";
import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from 'config'
import { ValidateMethod } from "../constants/ValidateMethod";
import { validateUserInfo } from "../utils/validator";
import { StatusCodes } from 'http-status-codes';
import { getUser } from "../services/auth";

export const getAuth = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req.body.user.id)
        res.json(user)
    } catch (err: any) {
        console.error(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server Error')
    }
}

export const PostAuth = async (req: Request, res: Response) => {
    const errors = await validateUserInfo(req.body, ValidateMethod.LOGIN)
    if (errors.length > 0) return res.status(StatusCodes.BAD_REQUEST).send({ errors })

    const isExist = await checkIfUserExists(body.email)
    if (isExist) return res.status(StatusCodes.BAD_REQUEST).send({ errors: [{ msg: 'User already exists' }] })

    res.send(req.body)
}
