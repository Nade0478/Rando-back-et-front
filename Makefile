# Initialisation et configuration du contexte Docker
init-publish:
    docker context create Rando-ouest --docker "host=ssh://deploy-user@168.231.80.175"
    docker context use Rando-ouest

# Déploiement des services
publish:
    docker context use Rando-ouest
    docker-compose down --rmi all --remove-orphans
    docker volume prune -f
    docker network prune -f
    docker login https://ghcr.io
    docker compose -f ./docker-stack.yml up -d

# Migration des bases de données avec vérification du conteneur
publish-data:
    CONTAINER_ID=$(docker ps --filter "name=Rando-ouest-laravel-docker" -q)
if [ -n "$CONTAINER_ID" ]; then
    docker exec "$CONTAINER_ID" sh -c "php artisan migrate:fresh --seed"
else
    echo "Erreur : Le conteneur Laravel n'est pas trouvé."
    exit 1
fi

