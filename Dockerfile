# Use an official Node.js runtime as the base image
FROM node:19

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Generate prisma 
RUN npx prisma generate

# Copy the entire project to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port your Next.js app is running on (default is 3000)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
