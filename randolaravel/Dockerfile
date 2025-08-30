# Étape 1 : Build avec Composer
FROM composer:2.6.5 AS build

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# Étape 2 : Image finale avec Apache et PHP
FROM php:8.3-apache

# Installation des dépendances système et PHP
RUN apt-get update && apt-get install -y \
    libfreetype-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    zlib1g-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd zip mysqli pdo pdo_mysql \
    && apt-get clean

# Activation du module Apache rewrite
RUN a2enmod rewrite

# Configuration du virtual host
COPY vhost.conf /etc/apache2/sites-available/000-default.conf

# Copie du code source
COPY . /var/www/app
WORKDIR /var/www/app

# Copie de l’environnement
COPY .env.test .env

# Copie des dépendances installées depuis l’étape build
COPY --from=build /app/vendor /var/www/app/vendor

# Droits et permissions
RUN chown -R www-data:www-data /var/www/app \
    && chmod -R 775 storage bootstrap/cache

# Variables d’environnement
ENV COMPOSER_ALLOW_SUPERUSER=1

# Exposition du port Apache
EXPOSE 80
