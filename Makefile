
#
# Binaries
#

export PATH := ./node_modules/.bin/:$(PATH)

#
# Variables
#

PORT      ?= 8080
HOST      ?= localhost
NODE_ENV  ?= development

STYLES     = $(shell find source -type f -name '*.css')
SCRIPTS    = $(shell find source -type f -name '*.js')

ASSETS     = build/index.html build/404.html build/css/blog.css build/favicon.png build/preview.png build/fonts/

BROWSERS   = "last 1 version, > 10%"
TRANSFORMS = -t [ babelify --loose all ] -t envify

DOMAIN     = rosszurowski.com
REPO       = rosszurowski/rosszurowski.github.io
BRANCH     = $(shell git rev-parse --abbrev-ref HEAD)

#
# Tasks
#

build: install assets styles scripts

watch: build
	@make -j4 watch-server watch-css watch-js watch-assets
watch-server:
	@serve -p $(PORT) build | wtch -d build | garnish
watch-css:
	@cssnext --watch source/css/index.css build/assets/bundle.css
watch-js:
	@watchify $(TRANSFORMS) source/js/index.js -o build/assets/bundle.js
watch-assets:
	@chokidar "source/**/*.html" -c "make assets" --silent

install: node_modules

# For now, we're deploying to Github Pages. Amazon S3 might be an option to
# look into as well, either for the whole site, or just for static assets.
deploy:
	@echo "Deploying branch \033[0;33m$(BRANCH)\033[0m to Github pages..."
	@make clean
	@NODE_ENV=production make build
	@echo $(DOMAIN) > build/CNAME
	@(cd build && \
		git init -q . && \
		git add . && \
		git commit -q -m "Deployment (auto-commit)" && \
		echo "\033[0;90m" && \
		git push "git@github.com:$(REPO).git" HEAD:master --force && \
		echo "\033[0m")
	@make clean
	@echo "Deployed to \033[0;32mhttp://$(DOMAIN)\033[0m"

lint:
	@xo

clean:
	@rm -rf build/

#
# Shorthands
#

assets: $(ASSETS)
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

build/assets/%: source/%
	@mkdir -p $(@D)
	@cp -r $< $@

build/assets/bundle.css: $(STYLES)
	@mkdir -p $(@D)
	@cssnext --browsers $(BROWSERS) --sourcemap source/css/index.css $@
	@if [[ "$(NODE_ENV)" == "production" ]]; then cleancss --s0 $@ -o $@; fi

build/assets/bundle.js: $(SCRIPTS)
	@mkdir -p $(@D)
	@browserify $(TRANSFORMS) source/js/index.js -o $@
	@if [[ "$(NODE_ENV)" == "production" ]]; then $(BIN)/uglifyjs $@ -o $@; fi

#
# Phony
#

.PHONY: watch clean
