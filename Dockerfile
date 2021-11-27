FROM node:carbon-slim

# Create app directory
WORKDIR /cyberplace_api

# Install app dependencies
COPY package.json /cyberplace_api/
RUN npm install

# Bundle app source
COPY . /cyberplace_api/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
