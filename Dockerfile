# --------------> The build image
FROM node:14-alpine AS build
ENV NODE_ENV production
ENV PORT=3000
RUN apk --no-cache -U upgrade

RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm ci --only=production

# --------------> The production image
FROM node:14-alpine

RUN apk add dumb-init
ENV NODE_ENV production
USER node
WORKDIR /home/node/app
COPY --chown=node:node --from=build /home/node/app/node_modules /home/node/app/node_modules
COPY --chown=node:node . /home/node/app
EXPOSE 3000
CMD ["dumb-init", "node", "bin/www"]
