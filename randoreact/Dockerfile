# Étape 1 : Build Vue.js
FROM node:lts-alpine AS build-stage

WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit --progress=false
COPY . .
COPY .env.production .env
RUN npm run build && rm -rf node_modules

# Étape 2 : Serveur Nginx
FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
