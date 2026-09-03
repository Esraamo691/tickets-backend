FROM node:22-alpine

WORKDIR /app

# Copy package definition files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source files
COPY . .

# Expose application port
EXPOSE 3016

# Run production server
CMD ["npm", "start"]
