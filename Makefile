.PHONY: build up down logs

build:
	docker compose build --no-cache

up:
	docker image prune -f
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f
