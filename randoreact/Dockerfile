# Phase de build
FROM node:18-alpine as build

# Définir le répertoire de travail
WORKDIR /app

# Arguments de build
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copier les fichiers package
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le code source
COPY . .

# Build de l'application
RUN npm run build

# Phase de production
FROM nginx:alpine

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés depuis la phase de build
COPY --from=build /app/build /usr/share/nginx/html

# Copier le script d'entrée
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Exposer le port 80
EXPOSE 80

# Point d'entrée
ENTRYPOINT ["/docker-entrypoint.sh"]

# Commande par défaut
CMD ["nginx", "-g", "daemon off;"]