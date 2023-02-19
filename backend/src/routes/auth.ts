import express, { Request, Response } from "express";
import auth from '../middleware/auth'
const authRouter = express.Router();

// @router  GET api/auth
// @desc    Test route
// @access  Public
authRouter.get('/', auth, (req: Request, res: Response) => res.send('Auth route'))
authRouter.route('/')
    .get()
    .post()


export default authRouter;
