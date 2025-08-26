# 🧱 Étape 1 : Build de l'app avec Node.js
FROM node:20-alpine AS build-stage

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 🚀 Étape 2 : Serveur NGINX pour la prod
FROM nginx:stable-alpine AS production-stage

# Copie du build vers le dossier HTML de NGINX
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Configuration NGINX personnalisée (si nécessaire)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
