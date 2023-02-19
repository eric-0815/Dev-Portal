import { Request, Response } from "express";
import { createUser, validateUserInfo, checkIfUserExist } from "../services/users";


export async function registerUser(req: Request, res: Response) {
    const { body } = req

    const isExist = await checkIfUserExist(body.email)
    if (isExist) return res.status(400).send({ errors: [{ msg: 'User already exists' }] })

    const errors = await validateUserInfo(body)
    if (errors.length > 0) return res.status(400).send({ errors })

    const result = await createUser(body)
    res.send(result)
}
