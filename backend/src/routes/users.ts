import express, { Request, Response } from "express";
import { register, login } from "../controllers/users";
import auth from '../middleware/auth'

const usersRouter = express.Router();

usersRouter.route('/register')
    .get()
    .post(register)

usersRouter.route('/login')
    .post(auth, login)

export default usersRouter;
