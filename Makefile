PORT ?= 4000

dev: node_modules ## Run a local dev server
	@PORT=$(PORT) ./node_modules/.bin/next dev
.PHONY: dev

build: node_modules .next ## Build site for production
.PHONY: build

.next: node_modules next.config.js src public
	@./node_modules/.bin/next build

lint: node_modules
	@./node_modules/.bin/next lint
.PHONY: lint

format: node_modules
	@./node_modules/.bin/prettier --write 'src/**/*.{js,jsx,ts,tsx}'
.PHONY: format

node_modules: yarn.lock
	@yarn install --frozen-lockfile --network-timeout=10000
	@yarn check --verify-tree --integrity

help: ## Show this help
	@echo "\nSpecify a command. The choices are:\n"
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[0;36m%-12s\033[m %s\n", $$1, $$2}'
	@echo ""
.PHONY: help

.DEFAULT_GOAL := build
