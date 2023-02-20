import express, { Request, Response } from "express";
import { postProfile, getProfiles, getProfile } from "../controllers/profiles";
import auth from '../middleware/auth'

const profileRoute = express.Router();

// @router  GET api/profile
// @desc    Test route
// @access  Public
profileRoute.route('/')
    .get(auth, getProfiles)
    .post(auth, postProfile)

profileRoute.route('/user/:userId')
    .get(auth, getProfile)


export default profileRoute;
