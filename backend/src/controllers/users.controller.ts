import { Request, Response } from "express";
import { createUser, authenticateUser } from "../services/users.service";
import { StatusCodes } from 'http-status-codes';
import { createErrorMsg } from "../utils/error";

export const register = async (req: Request, res: Response) => {
    try {
        const { body } = req
        const result = await createUser(body)

        if (result.errors) res.status(StatusCodes.BAD_REQUEST).send(result)
        res.status(StatusCodes.OK).send(result)

    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(createErrorMsg("Server Error"))
    }

}

export const login = async (req: Request, res: Response) => {
    try {
        const { body } = req

        const result = await authenticateUser(body)
        // @ts-ignore
        if (result?.errors) return res.status(StatusCodes.BAD_REQUEST).send(result)
        res.status(StatusCodes.OK).send(result)

    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(createErrorMsg("Server Error"))
    }
}

