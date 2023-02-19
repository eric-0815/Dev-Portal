import express, { Request, Response } from "express";
import { check, validationResult } from 'express-validator/check'
import { registerUser } from "../controllers/users";

const usersRouter = express.Router();

// @router  GET api/users
// @desc    Test route
// @access  Public
usersRouter.get('/', (req: Request, res: Response) => res.send('User route'))

// @router  POST api/users
// @desc    Register user
// @access  Public
usersRouter.route('/')
    .get()
    .post(registerUser)


// usersRouter.post('/',
//     [
//         check('name', 'Name is required')
//             .not()
//             .isEmpty(),
//         check('email', 'Please include a valid email')
//             .isEmail(),
//         check('password', 'Please enter a password with 6 or more characters').
//             isLength({ min: 6 })
//     ],
//     (req: Request, res: Response) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
//         res.send(req.body)
//     });

export default usersRouter;
