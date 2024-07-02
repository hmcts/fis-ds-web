# ---- Base image ----
FROM hmctspublic.azurecr.io/base/node:18-alpine as base

USER root
RUN corepack enable
USER hmcts

COPY --chown=hmcts:hmcts . .
RUN yarn workspaces focus --all --production \
 && yarn cache clean

# ---- Build image ----
FROM base as build

RUN PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=true yarn install && \
    yarn build:prod && \
    rm -rf webpack/ webpack.config.js

# ---- Runtime image ----
FROM base as runtime
RUN rm -rf webpack/ webpack.config.js
COPY --from=build $WORKDIR/src/main ./src/main

EXPOSE 4000
