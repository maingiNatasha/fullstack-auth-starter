# Use a lightweight Node.js runtime environment
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker's caching system
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of your backend source code
COPY . .

# Inform Docker that the container listens on your backend port (e.g., 5000)
EXPOSE 5000

# Start your Express server
CMD ["node", "server.js"]