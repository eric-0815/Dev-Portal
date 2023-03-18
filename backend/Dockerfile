# Base image
FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production
RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 5000

# Run the app
CMD ["npm", "run", "dev"]