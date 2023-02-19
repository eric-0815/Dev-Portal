import express, { Request, Response } from "express";

const authRouter = express.Router();

// @router  GET api/auth
// @desc    Test route
// @access  Public
authRouter.get('/', (req, res) => res.send('Auth route'))

export default authRouter;
