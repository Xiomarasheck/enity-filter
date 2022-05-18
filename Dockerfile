FROM node:14.2.0-alpine3.11@sha256:6de416f8c664eb6b0a28905389ecbea7ccec0d9e0651da8662ccd2e566b7cbf7

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Assignment permissions
RUN chown -R node:node /usr/src/app

# User specification
USER node

RUN npm cache clean --force
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 1500
ENTRYPOINT ["npm", "start"]