#!/bin/bash
set -e

# Attendre que la base de données soit prête
echo "Waiting for database..."
sleep 10

# Exécuter les migrations
php artisan migrate --force

# Créer le lien symbolique pour le storage
php artisan storage:link

# Démarrer PHP-FPM
exec "$@"