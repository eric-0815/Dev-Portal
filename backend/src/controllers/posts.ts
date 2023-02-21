import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { createPost } from "../services/posts";

export const addPost = async (req: Request, res: Response) => {
    try {
        const result = await createPost(req.body)
        return res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }
}