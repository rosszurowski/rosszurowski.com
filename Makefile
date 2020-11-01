build:
	hugo

clean:
	trash ./resources
	trash ./public
	trash ./node_modules

node_modules: package.json
	yarn install

dev:
	@hugo server -DF
.PHONY: dev

.DEFAULT_GOAL := build
