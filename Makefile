
#
# Binaries
#

export PATH := ./node_modules/.bin/:$(PATH)
BIN := ./node_modules/.bin

#
# Variables
#

PORT    = 8080
SOURCE  = ./source
BUILD   = ./build
SCRIPTS = $(shell find $(SOURCE)/js -type f -name '*.js')
STYLES  = $(shell find $(SOURCE)/css -type f -name '*.scss')

REPO    = rosszurowski/rosszurowski.com
BRANCH  = $(shell git rev-parse --abbrev-ref HEAD)

#
# Tasks
#

default: build
	@true

build: assets scripts styles

develop:
	@budo $(SOURCE)/js/index.js:assets/index.js \
		--dir $(BUILD) \
		--port $(PORT) \
		--transform babelify \
		--live | garnish & watch make --silent assets styles

install: node_modules

deploy:
	@echo "\033[0;32mDeploying \033[0;33m$(BRANCH)\033[0;32m to Github pages...\033[0m"
	@make clean && make build
	@(cd $(BUILD) && \
		git init . && \
		git add . && \
		git commit -m "Deployment (auto-commit)" && \
		git push "git@github.com:$(REPO).git" master:gh-pages --force)

lint: $(SCRIPTS)
	@standard $^

clean:
	@rm -rf build/

clean-deps:	
	@rm -rf node_modules/

#
# Shorthands
#

assets: $(BUILD)/index.html
scripts: $(BUILD)/assets/index.js
styles: $(BUILD)/assets/styles.css

#
# Targets
#

node_modules: package.json
	@npm install

$(BUILD)/%: $(SOURCE)/%
	@mkdir -p $(@D)
	@cp $< $@

$(BUILD)/assets/index.js: $(SCRIPTS)
	@mkdir -p $(@D)
	@browserify $(SOURCE)/js/index.js -t babelify -o $@

$(BUILD)/assets/styles.css: $(STYLES)
	@mkdir -p $(@D)
	@sassc --sourcemap --load-path $(SOURCE)/css/ $(SOURCE)/css/styles.scss $@
	@autoprefixer $@ --clean --map --browsers "last 2 versions"

#
# Phony
#

.PHONY: develop clean
