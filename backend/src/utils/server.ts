import express from "express";
import cors from 'cors'

const createServer = () => {
    const app = express();

    // Init Middleware
    app.use(express.json())

    app.use(
        cors({
          allowedHeaders: ["x-auth-token", "Content-Type"], // you can change the headers
          exposedHeaders: ["x-auth-token"], // you can change the headers
          origin: "*",
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
          preflightContinue: false
        })
      );

    return app
}

export default createServer