# 📦 Image de base avec Apache et PHP 8.3
FROM php:8.3-apache

# 🔧 Argument pour choisir l'environnement (.env.test, .env.prod, etc.)
ARG MODE=test

# 🔧 Installation des dépendances système et extensions PHP
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

# 🔁 Activation du module Apache rewrite
RUN a2enmod rewrite

# 📁 Définition du répertoire de travail
WORKDIR /var/www/app

# 📦 Installation de Composer
COPY --from=composer:2.6.5 /usr/bin/composer /usr/local/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1

# 📄 Copie des fichiers de dépendances Laravel
COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# 📄 Copie du reste de l'application
COPY . .

# ⚙️ Copie du fichier d’environnement et du virtual host Apache
COPY .env.${MODE} .env
COPY vhost.conf /etc/apache2/sites-available/000-default.conf

# 🔐 Permissions sur les dossiers Laravel
RUN chown -R www-data:www-data /var/www/app \
    && chmod -R 775 storage bootstrap/cache

# 👤 Création d’un utilisateur non privilégié
RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup \
    && chown -R appuser:appgroup /var/www/app

# 👤 Utilisation de l’utilisateur sécurisé
USER appuser

# 🔗 Création du lien symbolique vers le dossier storage
RUN php artisan storage:link || true

# ❤️ Ajout d’un Healthcheck pour surveiller le conteneur
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost || exit 1
