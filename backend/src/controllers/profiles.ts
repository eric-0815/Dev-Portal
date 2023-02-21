import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { addOrCreateProfile, findProfile, findProfiles, removeEducation, removeExperience, removeProfile, updateEducation, updateExperience } from "../services/profiles";

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
        const result = await removeProfile(userId)
        res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }
}

export const putExperience = async (req: Request, res: Response) => {
    try {
        const result = await updateExperience(req.body)
        res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }
}

export const deleteExperience = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body
        const { expId } = req.params
        const result = await removeExperience(userId, expId)
        res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }
}

export const putEducation = async (req: Request, res: Response) => {
    try {
        const result = await updateEducation(req.body)
        res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }
}

export const deleteEducation = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body
        const { eduId } = req.params
        const result = await removeEducation(userId, eduId)
        res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }
}
