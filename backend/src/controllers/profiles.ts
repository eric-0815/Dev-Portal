import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { addOrCreateProfile, findProfile, findProfiles, removeProfile } from "../services/profiles";

export const getProfiles = async (req: Request, res: Response) => {
    try {
        // const userId = req.body.user.id
        const result = await findProfiles()
        return res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }
}

export const getProfile = async (req: Request, res: Response) => {
    try {
        // const userId = req.body.user.id
        const result = await findProfile(req.params.userId)
        return res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }
}

export const postProfile = async (req: Request, res: Response) => {
    try {
        const { body } = req
        const result = await addOrCreateProfile(body)
        res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }

}

export const deleteProfile = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body
        console.log(`userId: ${userId}`)
        const result = await removeProfile(userId)
        res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }

}
