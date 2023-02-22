import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { addComment, addLike, addUnLike, createPost, findAllPosts, findPostById, removeComment, removePostById } from "../services/posts";

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

export const putLike = async (req: Request, res: Response) => {
    try {
        const {postId} = req.params
        const {userId} = req.body
        const result = await addLike(postId, userId)
        // @ts-ignore
        if (result?.errors) return res.status(StatusCodes.BAD_REQUEST).send(result)
        return res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }
}

export const putUnLike = async (req: Request, res: Response) => {
    try {
        const {postId} = req.params
        const {userId} = req.body
        const result = await addUnLike(postId, userId)
        // @ts-ignore
        if (result?.errors) return res.status(StatusCodes.BAD_REQUEST).send(result)
        return res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }
}

export const postComment = async (req: Request, res: Response) => {
    try {
        const {postId} = req.params

        const result = await addComment(postId, req.body)
        // @ts-ignore
        if (result?.errors) return res.status(StatusCodes.BAD_REQUEST).send(result)
        return res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const {postId, commentId} = req.params
        const {userId} = req.body

        const result = await removeComment(postId, commentId, userId)
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