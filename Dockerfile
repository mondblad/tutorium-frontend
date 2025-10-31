# Stage 1: build stage
FROM node:20 AS build
WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем проект и собираем
COPY . .
RUN npm run build

# Stage 2: production stage
FROM nginx:stable-alpine

# Удаляем дефолтные файлы nginx
RUN rm -rf /usr/share/nginx/html/*

# Копируем собранный фронт из первого stage
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем кастомный nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
