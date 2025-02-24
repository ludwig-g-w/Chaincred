#!/bin/bash

# Get the local IP address
LOCAL_IP=$(ipconfig getifaddr en0)

# Update the .env file with the local IP address
sed -i '' "s|EXPO_PUBLIC_SERVER_URL=.*|EXPO_PUBLIC_SERVER_URL=\"http://$LOCAL_IP:8081\"|" .env
