FROM node:14-alpine
ENV NODE_ENV production
ENV PORT=3000
RUN apk --no-cache -U upgrade
RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app
WORKDIR /home/node/app
RUN npm i -g pm2
COPY package*.json ./
USER node
RUN npm i --only=production
COPY . .
EXPOSE 3000
ENTRYPOINT ["pm2-runtime", "bin/www"] 
