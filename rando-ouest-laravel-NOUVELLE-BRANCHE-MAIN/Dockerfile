# Image de base avec Apache et PHP 8.3
FROM php:8.3-apache
ARG MODE=test
ENV MODE=${MODE}

# Installation des dépendances PHP
RUN apt-get update && apt-get install -y \
    libfreetype-dev libjpeg62-turbo-dev libpng-dev \
    zlib1g-dev libzip-dev unzip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Installation des extensions PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd zip mysqli pdo pdo_mysql

# Copie des fichiers locaux vers le conteneur
COPY . /var/www/app
WORKDIR /var/www/app

# Copie de l'environnement
COPY .env.${MODE} .env
COPY vhost.conf /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite

# Gestion des permissions
RUN chown -R www-data:www-data /var/www/app/storage \
    && chmod -R 775 /var/www/app/storage

# Installation de Composer
ENV COMPOSER_ALLOW_SUPERUSER=1
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
COPY composer.json ./
RUN composer install --no-dev --optimize-autoloader \
    && rm -rf /root/.composer/cache

# Création du lien storage Laravel
RUN php artisan storage:link || true

# Déclaration du volume pour le stockage
VOLUME /var/www/app/storage

# Démarrage du serveur Apache
CMD ["apache2-foreground"]
