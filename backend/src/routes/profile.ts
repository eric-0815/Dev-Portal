import express, { Request, Response } from "express";
import { postProfile } from "../controllers/profiles";
import auth from '../middleware/auth'

const profileRoute = express.Router();

// @router  GET api/profile
// @desc    Test route
// @access  Public
profileRoute.route('/')
    //.get(auth, getProfile)
    .post(auth, postProfile)

export default profileRoute;
