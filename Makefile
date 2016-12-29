
#
# Variables
#

BIN = ./node_modules/.bin

PORT       ?= 8080
HOST       ?= localhost
NODE_ENV   ?= development

STYLES      = $(shell find source -type f -name '*.css')
SCRIPTS     = $(shell find source -type f -name '*.js')

ASSETS      = build/index.html build/clippings/index.html build/404.html build/assets/blog.css build/favicon.ico build/preview.png build/assets/fonts/

BROWSERS    = "last 1 version, > 10%"
TRANSFORMS  = -t [ babelify --loose all ] -t envify

DOMAIN      = rosszurowski.com
REPO        = rosszurowski/rosszurowski.github.io
BRANCH      = $(shell git rev-parse --abbrev-ref HEAD)

#
# Tasks
#

build: install assets styles scripts

watch: install build
	@$(BIN)/onchange 'source/**/*.html' -- make content & \
		$(BIN)/cssnext --watch source/css/index.css build/assets/bundle.css & \
		$(BIN)/budo source/js/index.js:assets/bundle.js \
			--port $(PORT) \
			--dir build \
			--css build/assets/bundle.css \
			-- $(TRANSFORMS)

install: node_modules

deploy:
	@echo "Deploying branch \033[0;33m$(BRANCH)\033[0m to Github pages..."
	@make clean
	@NODE_ENV=production make build
	@(cd build && \
		echo "$(DOMAIN)" > CNAME && \
		git init -q . && \
		git add . && \
		git commit -q -m "Deployment (auto-commit)" && \
		echo "\033[0;90m" && \
		git push "git@github.com:$(REPO).git" HEAD:master --force && \
		echo "\033[0m")
	@make clean
	@echo "Deployed to \033[0;32mhttps://$(DOMAIN)/\033[0m"

lint:
	@xo

clean:
	@rm -rf build/

#
# Shorthands
#

assets: $(ASSETS)
content: build/index.html build/clippings/index.html
styles: build/assets/bundle.css
scripts: build/assets/bundle.js

#
# Targets
#

node_modules: package.json
	@npm install

build/%: source/%
	@mkdir -p $(@D)
	@cp -r $< $@

build/%: source/pages/%
	@mkdir -p $(@D)
	@cp -r $< $@

build/index.html: source/index.html build/assets/bundle.css
	@mkdir -p $(@D)
	@cp -r $< $@
	@if [[ "$(NODE_ENV)" == "production" ]]; then bin/inline-css $@ $@; fi

build/assets/%: source/%
	@mkdir -p $(@D)
	@cp -r $< $@

build/assets/bundle.css: $(STYLES)
	@mkdir -p $(@D)
	@$(BIN)/cssnext --browsers $(BROWSERS) --sourcemap source/css/index.css $@
	@if [[ "$(NODE_ENV)" == "production" ]]; then $(BIN)/cleancss --s0 $@ -o $@; fi

build/assets/bundle.js: $(SCRIPTS)
	@mkdir -p $(@D)
	@$(BIN)/browserify $(TRANSFORMS) source/js/index.js -o $@
	@if [[ "$(NODE_ENV)" == "production" ]]; then $(BIN)/uglifyjs $@ -o $@; fi

#
# Phony
#

.PHONY: watch clean
