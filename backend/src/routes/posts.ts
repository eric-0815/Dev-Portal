import express, { Request, Response } from "express";

const postsRoute = express.Router();

// @router  GET api/posts
// @desc    Test route
// @access  Public
postsRoute.get('/', (req, res) => res.send('Posts route'))

export default postsRoute;
