import connectDB from "./utils/connectDB";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import profilesRoute from "./routes/profiles";
import postsRoute from "./routes/posts";
import createServer from "./utils/server";

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'


const app = createServer();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'My API description'
        },
        servers: [
            {
                url: 'https://dev-center-backend.onrender.com'//'http://localhost:5000'
            }
        ]
    },
    // Path to the API docs
    apis: ['./swagger.yaml']
};


connectDB();


// Initialize Swagger JSdoc
const specs = swaggerJsdoc(options);

// Serve Swagger docs using Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// app.get('/', (req: Request, res: Response) => res.send('API Running'));

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/profiles', profilesRoute);
app.use('/api/posts', postsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
