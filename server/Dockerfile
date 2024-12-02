# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files (if available)
COPY package.json ./
# COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5000 but the client know him in port 4000
EXPOSE 5000

# Run the application
CMD ["node", "app.js"]


# Use the official NGINX Alpine image
# FROM nginx:alpine

# Copy files to the default directory for serving static content
# COPY . /usr/share/nginx/html/

# Expose port 88
# EXPOSE 88

# Start NGINX
# CMD ["nginx", "-g", "daemon off;"]
