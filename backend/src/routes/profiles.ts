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
} from "../controllers/profiles.controller";
import auth from '../middleware/auth'

const profilesRoute = express.Router();

profilesRoute.route('/')
    .get(getProfiles)
    .post(auth, postProfile)
    .delete(auth, deleteProfile)

// USER PROFILE
profilesRoute.route('/user/:userId')
    .get(auth, getProfile)

// EXP
profilesRoute.route('/experience')
    .put(auth, putExperience)

profilesRoute.route('/experience/:expId')
    .delete(auth, deleteExperience)

// EDU
profilesRoute.route('/education')
    .put(auth, putEducation)

profilesRoute.route('/education/:eduId')
    .delete(auth, deleteEducation)

// GITHUB
profilesRoute.route('/github/:userName')
    .get(getGithub)


export default profilesRoute;
