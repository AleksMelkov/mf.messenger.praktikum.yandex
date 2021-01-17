# Базовый слой
FROM node:13

# копируем исходный код
COPY ./package*.json ./
COPY ./server.js ./app/
COPY ./public ./app/public

# RUN npm install
# Если вы создаете сборку для продакшн
RUN npm i

EXPOSE 8080
CMD [ "npm", "start" ]
