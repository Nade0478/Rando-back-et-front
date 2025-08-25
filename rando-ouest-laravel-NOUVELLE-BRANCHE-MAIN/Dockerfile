# 📌 Étape 1 : Image PHP avec Apache
FROM php:8.3-apache

# 🧩 Étape 2 : Installation des dépendances système & extensions PHP
RUN apt-get update && apt-get install -y \
  libfreetype-dev libjpeg62-turbo-dev libpng-dev zlib1g-dev libzip-dev unzip \
  libonig-dev libxml2-dev libcurl4-openssl-dev libssl-dev libicu-dev \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install -j$(nproc) gd zip mysqli pdo pdo_mysql mbstring intl \
  && a2enmod rewrite

# 🎵 Étape 3 : Installation de Composer (via image officielle)
ENV COMPOSER_ALLOW_SUPERUSER=1
COPY --from=composer:2.6.5 /usr/bin/composer /usr/local/bin/composer

# 🛠️ Étape 4 : Définir le répertoire de travail
WORKDIR /var/www/app

# 📦 Étape 5 : Préinstallation des dépendances Laravel sans scripts
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

# 📁 Étape 6 : Copie du reste de l’application
COPY . .

# 🧾 Étape 7 : Configuration Apache & environnement Laravel
COPY vhost.conf /etc/apache2/sites-available/000-default.conf
COPY .env.test /var/www/app/.env

# 🔐 Étape 8 : Permissions sur les dossiers Laravel
RUN chown -R www-data:www-data /var/www/app \
  && chmod -R 775 /var/www/app/storage /var/www/app/bootstrap/cache

# 🚀 Étape 9 : Commande de démarrage
CMD ["apache2-foreground"]
