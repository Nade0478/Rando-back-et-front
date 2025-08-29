# Choix de l'image PHP avec Apache
FROM php:8.3-apache

# Déclaration de la variable MODE (par défaut : dev)
ARG MODE=dev
ENV MODE=${MODE}

# Installation des dépendances système et extensions PHP
RUN apt-get update && apt-get install -y --no-install-recommends \
    libfreetype-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    zlib1g-dev \
    libzip-dev \
    unzip \
    curl \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd zip mysqli pdo pdo_mysql \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Activation du module Apache rewrite
RUN a2enmod rewrite

# Définir le dossier de travail
WORKDIR /var/www/app

# Copier Composer depuis l'image officielle
COPY --from=composer:2.6.5 /usr/bin/composer /usr/local/bin/composer

# Copier les fichiers nécessaires
COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Copier tous les fichiers du projet
COPY . .

# Copier le bon fichier .env selon le MODE
# Cette ligne va copier .env.dev, .env.test ou .env.prod vers .env
COPY .env.${MODE} .env

# Copier la configuration Apache
COPY vhost.conf /etc/apache2/sites-available/000-default.conf
