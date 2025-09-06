events {
    worker_connections 1024;
}

http {
    upstream laravel_backend {
        server laravel:9000;
    }

    upstream react_frontend {
        server react:3000;
    }

    server {
        listen 80;
        server_name localhost;

        # Route pour l'API Laravel
        location /api/ {
            proxy_pass http://laravel_backend/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        # Route pour React (par défaut)
        location / {
            proxy_pass http://react_frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}


