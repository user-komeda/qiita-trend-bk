FROM ghcr.io/user-komeda/docker_node:sha-0af7530@sha256:ee5ab347306dbadac11e1e1956161271344a424da18b8c7e2d3c85de91c61a14 AS builder


WORKDIR /app/

COPY ./package.json ./yarn.lock ./

COPY . .

RUN corepack enable
RUN corepack install -g yarn@stable 

RUN yarn install

RUN yarn build



FROM ghcr.io/user-komeda/docker_node:sha-0af7530@sha256:ee5ab347306dbadac11e1e1956161271344a424da18b8c7e2d3c85de91c61a14

WORKDIR /app/

RUN corepack enable
RUN corepack install -g yarn@stable 

COPY --from=builder /app/package.json /app/
COPY --from=builder  /app/node_modules/ /app/node_modules/
COPY --from=builder /app/dist/ /app/dist/

CMD ["node", "dist/main.js"]
