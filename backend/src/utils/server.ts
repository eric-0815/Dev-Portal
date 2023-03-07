import express from "express";
import cors from 'cors'

const createServer = () => {
    const app = express();

    // Init Middleware
    app.use(express.json())

    // Set up CORS options
    const corsOptions = {
        origin: ['http://localhost:3000', 'https://developer-center-v1.netlify.app'], // Replace with your React.js client URL
        methods: 'GET,PUT,POST,DELETE',
        optionsSuccessStatus: 200,
        credentials: true,
        allowedHeaders: 'Content-Type, Authorization, x-auth-token',
    };
  
    app.use(cors(corsOptions));

    return app
}

export default createServer