
#
# Binaries
#

export PATH := ./node_modules/.bin/:$(PATH)
BIN := ./node_modules/.bin

#
# Variables
#

PORT      = 8080
SOURCE    = ./source
BUILD     = ./build
STYLES    = $(shell find $(SOURCE)/css -type f -name '*.scss')
SCRIPTS   = $(shell find $(SOURCE)/js -type f -name '*.js')
# $(shell find $(SOURCE)/js -type f -name '*.js' ! -path "$(SOURCE)/js/sketches/*")

ARGS      = -t [ babelify --loose all ] -t envify -t uglifyify

ASSETS    = $(BUILD)/index.html $(BUILD)/favicon.png
FONTS     = $(patsubst $(SOURCE)/%, $(BUILD)/assets/%, $(wildcard $(SOURCE)/fonts/*))
SKETCHES  = $(patsubst $(SOURCE)/js/sketches/%, $(BUILD)/sketches/%, $(wildcard $(SOURCE)/js/sketches/*))

DOMAIN    = repo.rosszurowski.com
REPO      = rosszurowski/rosszurowski.com
BRANCH    = $(shell git rev-parse --abbrev-ref HEAD)

NODE_ENV ?= development

#
# Tasks
#

default: build
	@true

build: assets scripts styles

develop:
	@budo $(SOURCE)/js/index.js:assets/bundle.js \
		--dir $(BUILD) \
		--port $(PORT) \
		--live \
		-- $(ARGS)| garnish & watch make --silent assets styles

install: node_modules

# For now, we're deploying to Github Pages. Amazon S3 might be an option to
# look into as well, either for the whole site, or just for static assets.
deploy:
	@echo "Deploying branch \033[0;33m$(BRANCH)\033[0m to Github pages..."
	@make clean
	@NODE_ENV=production make build
	@echo $(DOMAIN) > $(BUILD)/CNAME
	@(cd $(BUILD) && \
		git init -q .  && \
		git add . && \
		git commit -q -m "Deployment (auto-commit)" && \
		echo "\033[0;90m" && \
		git push "git@github.com:$(REPO).git" HEAD:gh-pages --force && \
		echo "\033[0m")
	@make clean
	@echo "Deployed to \033[0;32mhttp://$(DOMAIN)\033[0m"

lint: $(SCRIPTS)
	@standard $^

clean:
	@rm -rf build/

clean-deps:
	@rm -rf node_modules/

#
# Shorthands
#

assets: $(ASSETS) $(FONTS)
scripts: $(BUILD)/assets/bundle.js
styles: $(BUILD)/assets/styles.css
sketches: $(SKETCHES)

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

$(BUILD)/sketches/%: $(SOURCE)/js/sketches/%
	@mkdir -p $(@D)
	@browserify $(ARGS) $< -o $@
	@if [[ "$(NODE_ENV)" == "production" ]]; then uglifyjs -o $@ $@; fi

$(BUILD)/assets/bundle.js: $(SCRIPTS)
	@mkdir -p $(@D)
	@browserify $(ARGS) $(SOURCE)/js/index.js -o $@
	@if [[ "$(NODE_ENV)" == "production" ]]; then uglifyjs -o $@ $@; fi

$(BUILD)/assets/styles.css: $(STYLES)
	@mkdir -p $(@D)
	@sassc --sourcemap --load-path $(SOURCE)/css/ $(SOURCE)/css/styles.scss $@
	@autoprefixer $@ --clean --map --browsers "last 2 versions"

#
# Phony
#

.PHONY: develop clean
