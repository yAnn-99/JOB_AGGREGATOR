FROM node

WORKDIR /usr/share/app

COPY package*.json ./

RUN npm install

COPY . . 

CMD ["npx", "tsx", "src/main.ts"]