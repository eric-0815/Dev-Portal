import { Request, Response } from "express";
import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from 'config'

export const getAuth = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.body.user.id).select('-password');
        res.json(user)
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}

export const PostAuth = async (req: Request, res: Response) => {


}
