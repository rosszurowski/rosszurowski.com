PATH  := $(PWD)/node_modules/.bin:$(PATH)
SHELL := env PATH=$(PATH) /bin/sh

PORT  ?= 4000

dev: bun.lock ## Run a local dev server
	@PORT=$(PORT) next dev --turbo
.PHONY: dev

build: bun.lock ## Build site for production
	@next build
.PHONY: build

lint: bun.lock ## Lint files for code quality
	@next lint
.PHONY: lint

format: bun.lock ## Format code to a standard style
	@eslint --fix 'src/**/*.{js,jsx,ts,tsx}'
	@prettier --write 'src/**/*.{js,jsx,ts,tsx}'
.PHONY: format

clean: ## Clear all caches
	@trash ./node_modules
	@trash ./.next
	@trash ./.content-collections
.PHONY: clean

.next: bun.lock next.config.js $(shell fd -g '**/*.{ts,tsx,css}' .) public
	@next build

bun.lock: node_modules package.json
	@bun install --frozen-lockfile
	@touch -mr $(shell ls -Atd $? | head -1) $@

node_modules:
	@mkdir -p $@

help: ## Show this help
	@echo "\nSpecify a command. The choices are:\n"
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[0;36m%-12s\033[m %s\n", $$1, $$2}'
	@echo ""
.PHONY: help

.DEFAULT_GOAL := help
