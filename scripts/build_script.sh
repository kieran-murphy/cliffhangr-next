#!/bin/bash
# This script is used to build the project and run tests.

# Remove the previous build
rm -rf ../.next

# Get the latest version of the code
git pull

# Build the project
npm run build

# Run the latest build
npm start
