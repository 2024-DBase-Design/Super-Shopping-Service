# Use the official Node.js image as the base image
FROM node:16-alpine

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install

# Compile TypeScript to JavaScript
RUN npx tsc

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["node", "dist/server.js"]
