FROM node

WORKDIR /usr/share/app

COPY package*.json ./

RUN npm ci

COPY . . 

CMD ["node" , "backend/src/main.ts"]