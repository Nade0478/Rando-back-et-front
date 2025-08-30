# 🐘 PHP 8.3 avec Apache
FROM php:8.3-apache

# 📦 Dépendances système
RUN apt-get update && apt-get install -y \
    libfreetype-dev libjpeg62-turbo-dev libpng-dev \
    zlib1g-dev libzip-dev unzip git curl libonig-dev libxml2-dev zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd zip pdo pdo_mysql mysqli

# ⚙️ Activer mod_rewrite
RUN a2enmod rewrite

# 🧰 Installer Composer
ENV COMPOSER_ALLOW_SUPERUSER=1
COPY --from=composer:2.6.5 /usr/bin/composer /usr/local/bin/composer

# 📁 Définir le répertoire de travail
WORKDIR /var/www/app

# 📁 Copier le code source Laravel
COPY . /var/www/app

# ⚙️ Copier les fichiers de config Apache
COPY docker/vhost.conf /etc/apache2/sites-available/000-default.conf

# ✅ Copier le fichier .env depuis le bon emplacement
COPY .env /var/www/app/.env

# 🔐 Créer les dossiers critiques si absents
RUN mkdir -p /var/www/app/storage \
    && mkdir -p /var/www/app/bootstrap/cache

# 🔐 Droits sur les fichiers Laravel
RUN chown -R www-data:www-data /var/www/app \
    && chmod -R 775 /var/www/app/storage \
    && chmod -R 775 /var/www/app/bootstrap/cache

# 📦 Installer les dépendances Laravel
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# 🔗 Créer le lien symbolique vers le dossier public
RUN php artisan storage:link || echo "Lien symbolique non créé (artisan indisponible)"

# 🌐 Exposer le port Apache
EXPOSE 80
