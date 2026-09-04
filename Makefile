.PHONY: install test build run docker-build docker-up

install:
	@echo "Checking project structure..."
	@test -f README.md
	@test -f .gitignore
	@test -d css
	@test -d js
	@echo "Dependencies/setup check passed."

test:
	@echo "Running tests..."
	bash scripts/test.sh

build:
	@echo "Validating application files..."
	@for file in *.html; do test -f "$$file" || exit 1; done
	@echo "Build validation passed."

run:
	@echo "Starting PlaceTrack..."
	python -m http.server 8000

# Needed from M4 onwards
docker-build:
	@echo "Docker build will be configured in MT2."

docker-up:
	docker compose up --build