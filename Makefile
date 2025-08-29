init-publish:
    docker context create Rando-ouest-site --docker "host=ssh://root@168.231.80.175"
    docker context use Rando-ouest
	docker context create Rando-ouest --docker "host=ssh://root@168.231.80.175"
	docker context use Rando-ouest
publish:
    docker context use Rando-ouest
    docker-compose down --rmi all --remove-orphans
    docker system prune -a
    docker login https://ghcr.io
    docker compose -f ./docker-stack.yml up -d
	docker context use Rando-ouest
	docker-compose down --rmi all --remove-orphans
	docker system prune -a
	docker login https://ghcr.io
	docker compose -f ./docker-stack.yml up -d
publish-data:
    docker exec $(docker ps --filter "name=Rando-ouest-laravel-docker" -q) sh -c "php artisan migrate:fresh --seed"
	
	docker exec $(docker ps --filter "name=Rando-ouest-laravel-docker" -q) sh -c "php artisan migrate:fresh --seed"