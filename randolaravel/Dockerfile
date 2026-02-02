FROM php:8.5.3RC1-cli

# Arguments
ARG user=rando
ARG uid=1000

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libwebp-dev \
    libxpm-dev \
    && docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        --with-webp \
        --with-xpm \
    && docker-php-ext-install \
        pdo_mysql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        zip

# Nettoyer le cache apt
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Créer un utilisateur système
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier les fichiers composer d'abord pour optimiser le cache
COPY composer*.json ./

# Installer les dépendances en tant que root
RUN composer install --optimize-autoloader --no-interaction --no-scripts

# Copier tous les fichiers de l'application
COPY . .

# Executer les scripts post-installation de Composer
RUN composer run-script post-autoload-dump

# Créer les dossiers nécessaires avec les bonnes permissions
RUN mkdir -p storage/logs \
    && mkdir -p storage/framework/{cache,sessions,views} \
    && mkdir -p bootstrap/cache \
    && chown -R $user:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    && chmod -R 775 storage \
    && chmod -R 775 bootstrap/cache

# Exposer le port
EXPOSE 8000

# Changer d'utilisateur
USER $user

# Commande par défaut (sera surchargée par docker-compose)
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]