import swaggerJsdoc from 'swagger-jsdoc';

const createSwaggerDoc = () => {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Dev Center',
                version: '1.0.0',
                description: `Swagger UI`
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

    // Initialize Swagger JSdoc
    return swaggerJsdoc(options);
}

export default createSwaggerDoc
