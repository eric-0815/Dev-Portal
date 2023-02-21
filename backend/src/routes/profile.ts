import express from "express";
import {
    postProfile,
    getProfiles,
    getProfile,
    deleteProfile,
    putExperience,
    deleteExperience,
    putEducation,
    deleteEducation,
    getGithub
} from "../controllers/profiles";
import auth from '../middleware/auth'

const profileRoute = express.Router();

profileRoute.route('/')
    .get(auth, getProfiles)
    .post(auth, postProfile)
    .delete(auth, deleteProfile)

// USER PROFILE
profileRoute.route('/user/:userId')
    .get(auth, getProfile)

// EXP
profileRoute.route('/experience')
    .put(auth, putExperience)

profileRoute.route('/experience/:expId')
    .delete(auth, deleteExperience)


// EDU
profileRoute.route('/education')
    .put(auth, putEducation)

profileRoute.route('/education/:eduId')
    .delete(auth, deleteEducation)

// GITHUB
profileRoute.route('/github/:userName')
    .get(getGithub)


export default profileRoute;
