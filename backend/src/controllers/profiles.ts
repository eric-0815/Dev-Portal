import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { createProfile, findProfile } from "../services/profiles";



export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.body.user.id
        const result = await findProfile(userId)
        return res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }
}

export const addProfile = async (req: Request, res: Response) => {
    try {
        const { body } = req
        const result = createProfile(body)
        res.send(body)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }

}
