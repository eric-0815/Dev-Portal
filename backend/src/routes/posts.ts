import express, { Request, Response } from "express";
import { addPost, getPosts } from "../controllers/posts";
import auth from "../middleware/auth";

const postsRoute = express.Router();

// @router  GET api/posts
// @desc    Test route
// @access  Public
postsRoute.route('/')
    .get(auth, getPosts)
    .post(auth, addPost)

export default postsRoute;
