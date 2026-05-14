# --- Stage 1: Build the React Application ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Copy your frontend env file so Vite can see it
COPY .env.production .env.production

# Compile Vite React code into static HTML/JS/CSS (creates a 'dist' folder)
RUN npm run build

# --- Stage 2: Serve the Static Files via Nginx ---
FROM nginx:alpine

# Copy the compiled React files from Stage 1 into Nginx's public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Open port 80 (the standard web port) for public internet traffic
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]