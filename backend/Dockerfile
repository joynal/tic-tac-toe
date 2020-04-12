FROM node:12-alpine3.10

# Set a working directory
WORKDIR /usr/src/app

# Copy application files
COPY . /usr/src/app

# Install packages
RUN npm i

# Expose port 3000
EXPOSE 4000

CMD ["npm", "run", "start"]