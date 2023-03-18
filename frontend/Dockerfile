# base image
FROM node:latest

# set working directory
WORKDIR /app

# copy package.json and package-lock.json to workdir
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest of the application files to workdir
COPY . .

# build the application
RUN npm run build

# expose the port where the app will be running
EXPOSE 3000

# start the app
CMD ["npm", "start"]
