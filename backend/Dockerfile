FROM node

WORKDIR /usr/share/app

COPY package*.json ./

RUN npm ci

COPY . . 

CMD ["node" , "src/main.ts"]