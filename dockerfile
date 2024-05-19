# Use an official Node runtime as a parent image
FROM node:lts

RUN npm install -g bun

# Install necessary build tools
RUN apt-get update && apt-get install -y python3 make g++ 

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) into the working directory
COPY package.json bun.lockb ./
# If you use yarn, replace the above line with:

# Install any needed packages specified in package.json
RUN bun install --no-cache
# Bundle the app source inside the Docker image
COPY . .

# Concatenate .env and .env.production.local into .env
RUN cat .env.production.local >> .env

ENV NODE_ENV=production
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Copy the entrypoint script into the container
COPY entrypoint.sh /usr/src/app/
# Make the entrypoint script executable if not already
RUN chmod +x /usr/src/app/entrypoint.sh

# Use the script as the entrypoint
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

