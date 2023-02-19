import express, { Request, Response } from "express";
import { registerUser } from "../controllers/users";

const usersRouter = express.Router();

usersRouter.route('/')
    .get()
    .post(registerUser)


export default usersRouter;
