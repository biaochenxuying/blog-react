FROM node:10.13

WORKDIR /usr/src/app/
RUN npm config set registry  https://registry.npm.taobao.org/

COPY package.json ./
RUN npm install --silent --no-cache

COPY ./ ./

CMD ["npm", "run", "build"]
