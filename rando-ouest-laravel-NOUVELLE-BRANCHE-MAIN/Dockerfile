# Dockerfile Laravel API

FROM php:8.3-apache

ARG MODE=dev
ENV MODE=${MODE}

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

RUN a2enmod rewrite

WORKDIR /var/www/app

COPY --from=composer:2.6.5 /usr/bin/composer /usr/local/bin/composer

COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

COPY . .

# Copie du bon fichier .env selon le MODE
COPY .env.${MODE} .env

COPY vhost.conf /etc/apache2/sites-available/000-default.conf
