import express, { Request, Response } from "express";

const profileRoute = express.Router();

// @router  GET api/profile
// @desc    Test route
// @access  Public
profileRoute.get('/', (req, res) => res.send('Profile route'))

export default profileRoute;
