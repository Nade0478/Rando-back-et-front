# Utiliser PHP 8.3 avec Apache
FROM php:8.3-apache

# Installer les dépendances PHP nécessaires
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

# Copier les fichiers du projet Laravel
COPY . /var/www/app
WORKDIR /var/www/app

# Copier le fichier .env spécifique à Docker
COPY docker/.env /var/www/app/.env

# Copier la configuration Apache personnalisée
COPY docker/vhost.conf /etc/apache2/sites-available/000-default.conf

# Activer mod_rewrite pour Laravel
RUN a2enmod rewrite

# Appliquer les bons droits sur les fichiers Laravel
RUN chown -R www-data:www-data /var/www/app \
    && chmod -R 775 /var/www/app/storage \
    && chmod -R 775 /var/www/app/bootstrap/cache

# Installer Composer
ENV COMPOSER_ALLOW_SUPERUSER=1
COPY --from=composer:2.6.5 /usr/bin/composer /usr/local/bin/composer

# Copier composer.json et installer les dépendances PHP
COPY composer.json ./
RUN composer install --no-interaction --prefer-dist --optimize-autoloader
