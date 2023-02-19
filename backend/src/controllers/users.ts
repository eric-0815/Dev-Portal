import { Request, Response } from "express";
import { ValidateMethod } from "../constants/ValidateMethod";
import { createUser, checkIfUserExist } from "../services/users";
import { validateUserInfo } from "../utils/validator";


export const registerUser = async (req: Request, res: Response) => {
    const { body } = req

    const isExist = await checkIfUserExist(body.email)
    if (isExist) return res.status(400).send({ errors: [{ msg: 'User already exists' }] })

    const errors = await validateUserInfo(body, ValidateMethod.REGISTER)
    if (errors.length > 0) return res.status(400).send({ errors })

    const result = await createUser(body)
    res.send(result)
}

