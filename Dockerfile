FROM ghcr.io/user-komeda/docker_node:sha-0af7530@sha256:ede1e29ccff48c7fe157c876e1db7b59471c93bd572ce20fd98a9ab48efb04c8 AS builder


WORKDIR /app/

COPY ./package.json ./yarn.lock ./

COPY . .

RUN corepack enable
RUN corepack install -g yarn@stable 

RUN yarn install

RUN yarn build



FROM ghcr.io/user-komeda/docker_node:sha-0af7530@sha256:ede1e29ccff48c7fe157c876e1db7b59471c93bd572ce20fd98a9ab48efb04c8

WORKDIR /app/

RUN corepack enable
RUN corepack install -g yarn@stable 

COPY --from=builder /app/package.json /app/
COPY --from=builder  /app/node_modules/ /app/node_modules/
COPY --from=builder /app/dist/ /app/dist/

CMD ["node", "dist/main.js"]
