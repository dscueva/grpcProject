# client/Dockerfile

# Stage 1: Build the React app
FROM node:16-alpine as build

WORKDIR /app

# Copy package.json and yarn.lock (or package-lock.json if using npm)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the React app
RUN yarn build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the build output from Stage 1 to Nginx's default HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Optional: Copy custom Nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the outside world
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]