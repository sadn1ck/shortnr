FROM node:lts AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

RUN yarn install

RUN yarn prisma generate

COPY . .

RUN yarn run build

FROM node:lts

WORKDIR /app

COPY --from=builder /app/ /app
RUN chmod +x /app/run.sh

EXPOSE 3000
CMD ["/app/run.sh"]