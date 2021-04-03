# shortnr - URL shortener and customizer

## Description

[shortnr](https://github.com/sadn1ck/shortnr) is a URL shortener written in Nest, Typescript, Postgres and Prisma, containerised with Docker


## Running the app

```bash

# setup environment variables, specifically DATABASE_URL
$ cp sample.env .env
$ vim .env

# in docker
$ docker-compose up

# OR locally
# have postgres installed

# install dependencies
$ yarn install

# development
$ yarn run start


# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
