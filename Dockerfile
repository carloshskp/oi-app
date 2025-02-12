FROM node:10.23.0-alpine

ENV APPLICATION_DIR .
ENV APPLICATION_LOG_DIR /logs
ENV NODE_ENV production
ENV PORT 80

RUN mkdir -p \
	$APPLICATION_LOG_DIR

ADD package.json $APPLICATION_DIR/package.json

ADD . $APPLICATION_DIR

WORKDIR $APPLICATION_DIR

RUN yarn

RUN yarn build

EXPOSE $PORT

CMD ["yarn", "start"]
