# charge une image de base; Ici un linux avec apache et PHP 8.3
FROM php:8.3-apache
ARG MODE=test

# Installation des d�pendances PHP
RUN apt-get update && apt-get install -y \
    libfreetype-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    zlib1g-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install zip \
    && docker-php-ext-install mysqli pdo pdo_mysql

# Copie des fichiers locaux vers le conteneur
COPY . /var/www/app
# Ce dossier devient notre repertoire courant
WORKDIR /var/www/app

# Copie de l'environnement
COPY .env.${MODE} .env
COPY vhost.conf /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite

RUN chown -R www-data:www-data /var/www/app \
    && chmod -R 775 /var/www/app/storage

# Installation de composer droit d'écrire dans le dossier storage
    RUN chown -R www-data:www-data /var/www/app/storage

# Installation de composer
# Configurer la variable d'environnement
ENV COMPOSER_ALLOW_SUPERUSER=1
COPY --from=composer:2.6.5 /usr/bin/composer /usr/local/bin/composer

# Installation des dependences
COPY composer.json ./
RUN composer install

RUN php artisan storage:link || true
