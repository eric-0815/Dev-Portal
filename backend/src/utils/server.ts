import express from "express";

const createServer = () => {
    const app = express();

    // Init Middleware
    app.use(express.json())

    return app
}

export default createServer