import express, { Request, Response } from "express";
import { addPost, deletePost, getPost, getPosts, putLike, putUnLike } from "../controllers/posts";
import auth from "../middleware/auth";

const postsRoute = express.Router();


postsRoute.route('/')
    .get(auth, getPosts)
    .post(auth, addPost)

postsRoute.route('/:postId')
    .get(auth, getPost)
    .delete(auth, deletePost)
export default postsRoute;

postsRoute.route('/like/:postId')
    .put(auth, putLike)

    postsRoute.route('/unlike/:postId')
    .put(auth, putUnLike)
