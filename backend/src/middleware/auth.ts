import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken'
import config from 'config'

// a custom middle ware
const auth = (req: any, res: Response, next: NextFunction) => {
    // Get token from header
    const token = req.header("x-auth-token");
    // Check if not token
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "No token, authorization denied" });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        console.log(decoded)
        next(); // Calling next() with no arguments tells express to continue to the next matching middleware or route handler
    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Token is not valid" });
    }
};

export default auth
