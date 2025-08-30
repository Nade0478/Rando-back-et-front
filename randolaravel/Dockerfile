# 🐘 Utiliser PHP 8.3 avec Apache
FROM php:8.3-apache

# 📦 Installer les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    libfreetype-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    zlib1g-dev \
    libzip-dev \
    unzip \
    git \
    curl \
    libonig-dev \
    libxml2-dev \
    zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd zip pdo pdo_mysql mysqli

# 🧱 Définir le répertoire de travail
WORKDIR /var/www/app

# 📁 Copier le code source Laravel
COPY . /var/www/app

# ⚙️ Copier le fichier de configuration Apache
COPY docker/vhost.conf /etc/apache2/sites-available/000-default.conf

# ⚙️ Activer mod_rewrite pour Laravel
RUN a2enmod rewrite

# 🔐 Droits sur les fichiers Laravel
RUN chown -R www-data:www-data /var/www/app \
    && chmod -R 775 /var/www/app/storage \
    && chmod -R 775 /var/www/app/bootstrap/cache

# 🧰 Installer Composer
ENV COMPOSER_ALLOW_SUPERUSER=1
COPY --from=composer:2.6.5 /usr/bin/composer /usr/local/bin/composer

# 📦 Installer les dépendances Laravel
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# 🧪 Copier le fichier .env
COPY ../docker/.env /var/www/app/.env
COPY ../docker/vhost.conf /etc/apache2/sites-available/000-default.conf

# 🌐 Exposer le port Apache
EXPOSE 80
