import express, { Request, Response } from "express";
import { addPost, deleteComment, deletePost, getPost, getPosts, postComment, putLike, putUnLike } from "../controllers/posts.controller";
import auth from "../middleware/auth";

const postsRoute = express.Router();


postsRoute.route('/')
    .get(auth, getPosts)
    .post(auth, addPost)

postsRoute.route('/:postId')
    .get(auth, getPost)
    .delete(auth, deletePost)

postsRoute.route('/like/:postId')
    .put(auth, putLike)

postsRoute.route('/unlike/:postId')
    .put(auth, putUnLike)

postsRoute.route('/comment/:postId')
    .post(auth, postComment)

postsRoute.route('/comment/:postId/:commentId')
    .delete(auth, deleteComment)

export default postsRoute;