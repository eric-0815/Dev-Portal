import express, { Request, Response } from "express";
import auth from '../middleware/auth'
import { getAuth } from '../controllers/auth.controller'

const authRouter = express.Router();

authRouter.route('/')
    .get(auth, getAuth)
    .post()


export default authRouter;
