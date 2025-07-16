# 🌱 Étape 1 : Compilation du projet avec Node.js
FROM node:lts-alpine AS build-stage
ARG MODE=test

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

# 🚀 Étape 2 : Serveur de production avec NGINX
FROM nginx:stable-alpine AS production-stage

# Copie du build vers le dossier HTML de NGINX
COPY --from=build-stage /app/build /usr/share/nginx/html

# Copie de la configuration NGINX (optionnelle mais recommandée)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ouverture du port 80
EXPOSE 80

# Démarrage de NGINX
CMD ["nginx", "-g", "daemon off;"]
