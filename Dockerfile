# Стадия сборки
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Стадия production
FROM nginx:alpine

# Копируем собранные файлы из стадии сборки
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем кастомный nginx конфиг для SPA (важно для роутинга)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]