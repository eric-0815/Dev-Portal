import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { createPost, findAllPosts } from "../services/posts";

export const getPosts = async (req: Request, res: Response) => {
    try {
        const result = await findAllPosts()
        return res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }
}

export const addPost = async (req: Request, res: Response) => {
    try {
        const result = await createPost(req.body)
        if (result?.errors) return res.status(StatusCodes.BAD_REQUEST).send(result)
        return res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }
}