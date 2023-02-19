import express, { Request, Response } from "express";
import auth from '../middleware/auth'
import { getAuth, PostAuth } from '../controllers/auth'

const authRouter = express.Router();

authRouter.route('/')
    .get(auth, getAuth)
    .post(auth, PostAuth)


export default authRouter;
