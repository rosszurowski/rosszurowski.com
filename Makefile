
#
# Binaries
#

export PATH := ./node_modules/.bin/:$(PATH)
BIN := ./node_modules/.bin

#
# Variables
#

PORT      = 8080
HOST     ?= localhost
NODE_ENV ?= development

SOURCE    = ./source
BUILD     = ./build

STYLES    = $(shell find $(SOURCE) -type f -name '*.css')

ASSETS    = $(BUILD)/index.html $(BUILD)/404.html $(BUILD)/favicon.png $(BUILD)/preview.png

BROWSERS   = "last 2 versions"

DOMAIN    = rosszurowski.com
REPO      = rosszurowski/rosszurowski.com
BRANCH    = $(shell git rev-parse --abbrev-ref HEAD)

#
# Tasks
#

build: install assets styles

develop: build
	@make -j2 develop-server develop-assets

develop-server:
	@serve -p $(PORT) $(BUILD)

develop-assets:
	@watch make --silent assets styles

install: node_modules

# For now, we're deploying to Github Pages. Amazon S3 might be an option to
# look into as well, either for the whole site, or just for static assets.
deploy:
	@echo "Deploying branch \033[0;33m$(BRANCH)\033[0m to Github pages..."
	@make clean
	@NODE_ENV=production make build
	@echo $(DOMAIN) > $(BUILD)/CNAME
	@(cd $(BUILD) && \
		git init -q . && \
		git add . && \
		git commit -q -m "Deployment (auto-commit)" && \
		echo "\033[0;90m" && \
		git push "git@github.com:$(REPO).git" HEAD:gh-pages --force && \
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
styles: $(BUILD)/assets/bundle.css

#
# Targets
#

node_modules: package.json
	@npm install

$(BUILD)/%: $(SOURCE)/%
	@mkdir -p $(@D)
	@cp $< $@

$(BUILD)/assets/%: $(SOURCE)/%
	@mkdir -p $(@D)
	@cp $< $@

$(BUILD)/assets/bundle.css: $(STYLES)
	@mkdir -p $(@D)
	@cssnext --browsers $(BROWSERS) --sourcemap $(SOURCE)/css/index.css $@
	@if [[ "$(NODE_ENV)" == "production" ]]; then cleancss --s0 $@ -o $@; fi

#
# Phony
#

.PHONY: develop clean
