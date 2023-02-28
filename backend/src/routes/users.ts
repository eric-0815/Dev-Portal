import express, { Request, Response } from "express";
import { register, login } from "../controllers/users.controller";

const usersRouter = express.Router();

usersRouter.route('/register')
    .get()
    .post(register)

usersRouter.route('/login')
    .post(login)

export default usersRouter;
