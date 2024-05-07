# Use an official Node runtime as a parent image
FROM node

RUN npm install -g bun

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) into the working directory
COPY package.json bun.lockb ./
# If you use yarn, replace the above line with:
# COPY package.json yarn.lock ./

# Install any needed packages specified in package.json
RUN bun i
# If you use yarn, replace the above line with:
# RUN yarn install

# Bundle the app source inside the Docker image
COPY . .
ENV NODE_ENV=production
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Copy the entrypoint script into the container
COPY entrypoint.sh /usr/src/app/
# Make the entrypoint script executable if not already
RUN chmod +x /usr/src/app/entrypoint.sh

# Use the script as the entrypoint
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

