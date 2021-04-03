FROM node:lts
WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install
COPY . .
RUN yarn prisma generate
RUN yarn run build
RUN chmod +x run.sh
EXPOSE 3000
CMD ["/app/run.sh"]