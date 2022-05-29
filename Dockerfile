FROM node:16-alpine as build

ARG COMMIT_SHA=<not-specified>
ARG CI=1

WORKDIR /build-dir

# import scripts to allow packages installation succeed
COPY scripts ./scripts

COPY package.json .
COPY package-lock.json .

# install also DEV dependencies to enable Typescript compilation
RUN npm ci --production=false

COPY . .

# compile Typescript to Javascript
RUN npm run build

# remove unneeded files
RUN rm -rf node_modules src tsconfig.json .swcrc

RUN echo "mia_template_service_name_placeholder: $COMMIT_SHA" >> ./commit.sha

########################################################################################################################

FROM node:16-alpine

ARG CI=1

LABEL maintainer="%CUSTOM_PLUGIN_CREATOR_USERNAME%" \
      name="mia_template_service_name_placeholder" \
      description="%CUSTOM_PLUGIN_SERVICE_DESCRIPTION%" \
      eu.mia-platform.url="https://www.mia-platform.eu" \
      eu.mia-platform.version="0.1.0"

ENV NODE_ENV=production
ENV LOG_LEVEL=info
ENV SERVICE_PREFIX=/
ENV HTTP_PORT=3000

WORKDIR /home/node/app

COPY --from=build /build-dir ./

# install only dependencies required to run the service
RUN npm ci --production

# post-install remove scripts
RUN rm -r scripts

USER node

CMD ["npm", "-s", "start", "--", "--port", "${HTTP_PORT}", "--log-level", "${LOG_LEVEL}", "--prefix=${SERVICE_PREFIX}"]
