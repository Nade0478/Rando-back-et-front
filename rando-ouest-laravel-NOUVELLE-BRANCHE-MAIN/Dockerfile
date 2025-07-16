# 📌 Étape 1 : Image PHP avec Apache
FROM php:8.3-apache

# 🧩 Étape 2 : Installation des dépendances système & extensions PHP
RUN apt-get update && apt-get install -y \
  libfreetype-dev libjpeg62-turbo-dev libpng-dev zlib1g-dev libzip-dev unzip \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install -j$(nproc) gd zip mysqli pdo pdo_mysql \
  && a2enmod rewrite

# 🎵 Étape 3 : Installation de Composer (avec image officielle en source)
ENV COMPOSER_ALLOW_SUPERUSER=1
COPY --from=composer:2.6.5 /usr/bin/composer /usr/local/bin/composer

# 🛠️ Étape 4 : Configuration du projet Laravel
WORKDIR /var/www/app

# Préinstallation des dépendances Laravel avec cache Docker
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# 📦 Étape 5 : Copie du reste de l’application
COPY . .

# 🧾 Étape 6 : Configuration Apache & Laravel
COPY vhost.conf /etc/apache2/sites-available/000-default.conf
COPY .env.test /var/www/app/.env

# 🔐 Étape 7 : Permissions sur les dossiers Laravel
RUN chown -R www-data:www-data /var/www/app \
  && chmod -R 775 /var/www/app/storage
