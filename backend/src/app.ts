import connectDB from "./utils/connectDB";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import profilesRoute from "./routes/profiles";
import postsRoute from "./routes/posts";
import createServer from "./utils/server";

import swaggerUi from 'swagger-ui-express'
import createSwaggerDoc from "./utils/swaggerJsdoc";


const app = createServer();

const swaggerDoc = createSwaggerDoc();

connectDB();

// Serve Swagger docs using Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// app.get('/', (req: Request, res: Response) => res.send('API Running'));

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/profiles', profilesRoute);
app.use('/api/posts', postsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
