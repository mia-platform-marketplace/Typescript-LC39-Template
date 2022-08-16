FROM node:16.16.0-alpine as build

ARG COMMIT_SHA=<not-specified>
ENV NPM_CONFIG_CACHE="/tmp"

WORKDIR /build-dir

COPY package.json .
COPY package-lock.json .

# install also DEV dependencies to enable Typescript compilation
RUN npm ci --production=false

COPY . .

# compile Typescript to Javascript
RUN npm run build

# remove files not needed in the final stage
RUN rm -rf node_modules src tsconfig.tsbuildinfo tsconfig.json build.tsconfig.json

RUN echo "mia_template_service_name_placeholder: $COMMIT_SHA" >> ./commit.sha

########################################################################################################################

FROM node:16.16.0-alpine

LABEL maintainer="%CUSTOM_PLUGIN_CREATOR_USERNAME%" \
      name="mia_template_service_name_placeholder" \
      description="%CUSTOM_PLUGIN_SERVICE_DESCRIPTION%" \
      eu.mia-platform.url="https://www.mia-platform.eu" \
      eu.mia-platform.version="0.1.0"

ENV NODE_ENV=production
ENV LOG_LEVEL=info
ENV SERVICE_PREFIX=/
ENV HTTP_PORT=3000
ENV NPM_CONFIG_CACHE="/tmp"

WORKDIR /home/node/app

COPY --from=build /build-dir ./

# install only dependencies required to run the service
RUN npm ci --production

USER node

CMD ["npm", "-s", "start", "--", "--port", "${HTTP_PORT}", "--log-level", "${LOG_LEVEL}", "--prefix=${SERVICE_PREFIX}"]
