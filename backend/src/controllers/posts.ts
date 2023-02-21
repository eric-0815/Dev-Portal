import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { createPost, findAllPosts, findPostById, removePostById } from "../services/posts";

export const getPosts = async (req: Request, res: Response) => {
    try {
        const result = await findAllPosts()
        return res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }
}

export const getPost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params
        const result = await findPostById(postId)
        if (!result) return res.status(StatusCodes.BAD_REQUEST).send(result)
        return res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params
        const { userId } = req.body
        const result = await removePostById(postId, userId)
        // @ts-ignore
        if (result?.errors) {
            // @ts-ignore
            if (result?.errors[0].msg === 'User not authorized') return res.status(StatusCodes.UNAUTHORIZED).send(result)
            return res.status(StatusCodes.BAD_REQUEST).send(result)
        }
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