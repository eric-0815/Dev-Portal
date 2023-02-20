import express from "express";
import {
    postProfile,
    getProfiles,
    getProfile,
    deleteProfile,
    putExperience,
    deleteExperience
} from "../controllers/profiles";
import auth from '../middleware/auth'

const profileRoute = express.Router();

profileRoute.route('/')
    .get(auth, getProfiles)
    .post(auth, postProfile)
    .delete(auth, deleteProfile)

profileRoute.route('/user/:userId')
    .get(auth, getProfile)

profileRoute.route('/experience/:expId')
    .put(auth, putExperience)
    .delete(auth, deleteExperience)



export default profileRoute;
