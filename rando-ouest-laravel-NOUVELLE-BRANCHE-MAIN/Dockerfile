# Dockerfile Laravel API

# 🐘 Base PHP avec Apache
FROM php:8.3-apache

# 📦 Définition du mode (dev/prod) si besoin
ARG MODE=dev
ENV MODE=${MODE}

# 🔧 Installation des dépendances système
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

# 📁 Définition du dossier de travail
WORKDIR /var/www/app

# 🎼 Ajout de Composer depuis l'image officielle
COPY --from=composer:2.6.5 /usr/bin/composer /usr/local/bin/composer

# 📦 Installation des dépendances PHP
COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# 📂 Copie du code source Laravel
COPY . .

# ⚙️ Copie du fichier .env (assuré d’être présent dans le contexte de build)
COPY .env .env

# 🌐 Configuration Apache personnalisée
COPY vhost.conf /etc/apache2/sites-available/000-default.conf
