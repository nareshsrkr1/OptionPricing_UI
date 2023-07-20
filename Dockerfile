# Use the official Node.js image as the base image
FROM node:14 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight server to serve the production-ready React app
FROM nginx:alpine

# Copy the built React app from the previous stage to the NGINX image
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to access the app
EXPOSE 80

# Start NGINX to serve the React app
CMD ["nginx", "-g", "daemon off;"]
