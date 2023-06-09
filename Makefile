.DEFAULT_GOAL := help

help:
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

init: ## Configure the project for the first time
	@echo "⚙️ Initialling project..."
	@npm install

start: ## Execute project on local environment
	@echo "🏃‍♀️ Running project..."
	@npm start

test: ## Run test
	@echo "🧪 Running test..."
	@npm test

test-watch: ## Run test watch mode
	@echo "🧪 Running test watch mode..."
	@npm test-watch

clean: ## Remove `build` folder
	@echo "🧹 Cleaning..."
	@rm -rf build

clean_all: clean ## Remove `node_modules` and `dist` folders
	@echo "🧨 Cleaning all..."
	@rm -rf node_modules
