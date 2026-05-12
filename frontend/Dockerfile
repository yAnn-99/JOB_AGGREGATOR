FROM node

WORKDIR /usr/share/app

COPY . .

RUN npm ci

EXPOSE 8080

CMD ["npm", "run", "dev", "--", "-p", "8080"]
