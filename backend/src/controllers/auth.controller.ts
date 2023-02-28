import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { getUser } from "../services/auth.service";
import { createErrorMsg } from "../utils/error";

export const getAuth = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req.body.userId)
        res.status(StatusCodes.OK).json(user)
    } catch (err: any) {
        console.error(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(createErrorMsg('Server Error'))
    }
}
