npm install typescript --save-dev
npm install @types/node --save-dev
npm install ts-node-dev --save-dev

npm i express express-validator bcryptjs config gravatar jsonwebtoken mongoose request email-validator http-status-codes

npm i -D nodemon concurrently

npm i @types/body-parser @types/express @types/express-validator @types/bcryptjs @types/config @types/gravatar @types/request @types/email-validator @types/jsonwebtoken @types/http-status-codes

docker notes:

1. Build the Docker image:
   docker build -t dev-center-backend .

2. Run the Docker container:
   docker run -p 80:80 dev-center-backend
   docker run -p 5000:5000 dev-center-backend

deploy docker image to docker hub

1. docker login

2. docker build -t eatzz815/dev-center-backend:1.0.0 .

3. docker push eatzz815/dev-center-backend:1.0.0
