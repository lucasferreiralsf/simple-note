FROM node:10-alpine
# RUN apk update && apk upgrade && apk --no-cache add --virtual builds-deps build-base python
# RUN npm i -g npm
# Setting working directory. All the path will be relative to WORKDIR
RUN mkdir -p /opt/simplenote_frontend/frontend
WORKDIR /opt/simplenote_frontend/frontend

# Installing dependencies
COPY ./frontend/package.json /opt/simplenote_frontend/frontend/package.json
RUN npm --unsafe-perm install

# Copying source files
COPY ./frontend /opt/simplenote_frontend/frontend

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start" ]