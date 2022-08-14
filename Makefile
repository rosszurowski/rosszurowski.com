PATH  := $(PWD)/node_modules/.bin:$(PATH)
SHELL := env PATH=$(PATH) /bin/sh

PORT  ?= 4000

dev: yarn.lock ## Run a local dev server
	@PORT=$(PORT) next dev
.PHONY: dev

build: yarn.lock .next ## Build site for production
.PHONY: build

lint: yarn.lock ## Lint files for code quality
	@next lint
.PHONY: lint

format: yarn.lock ## Format code to a standard style
	@eslint --fix 'src/**/*.{js,jsx,ts,tsx}'
	@prettier --write 'src/**/*.{js,jsx,ts,tsx}'
.PHONY: format

clean: ## Clear all caches
	@trash node_modules
	@trash .next
	@trash .contentlayer
.PHONY: clean

.next: yarn.lock next.config.js src public
	@next build

yarn.lock: node_modules package.json
	@yarn install --frozen-lockfile --check-files --network-timeout=10000
	@touch -mr $(shell ls -Atd $? | head -1) $@

node_modules:
	@mkdir -p $@

help: ## Show this help
	@echo "\nSpecify a command. The choices are:\n"
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[0;36m%-12s\033[m %s\n", $$1, $$2}'
	@echo ""
.PHONY: help

.DEFAULT_GOAL := help
