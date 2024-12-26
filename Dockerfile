# Stage 1: Build Stage
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
#RUN npm install --frozen-lockfile

# RUN npm install -g npm@latest
RUN npm install -g pnpm@latest
RUN pnpm i

# Copy the rest of the application code
COPY . .

# Build the Next.js application
#RUN npm run build
RUN pnpm run build
# Stage 2: Production Stage
FROM nginx:stable-alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy the built static files from the builder stage
COPY --from=builder /app/out .

# Copy custom Nginx configuration if necessary
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
