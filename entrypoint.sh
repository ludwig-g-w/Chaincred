#!/bin/bash

# Ensure the database is ready
./wait-for-it.sh postgresdb:5432 --timeout=60 --strict -- echo "Database is ready."

# Execute complex build script from package.json
echo "Starting the build process..."
if bun run build:docker; then
    echo "Build succeeded, starting the server."
    exec node server.js
else
    echo "Build failed, exiting."
    exit 1
fi


