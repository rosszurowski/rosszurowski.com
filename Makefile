
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

DOMAIN  = repo.rosszurowski.com
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

# For now, we're deploying to Github Pages. Amazon S3 might be an option to
# look into as well, either for the whole site, or just for static assets.
deploy:
	@echo "\033[0mDeploying branch \033[0;33m$(BRANCH)\033[0m to Github pages...\033[0;90m"
	@[ -z $(git status -s) ] && git stash -q && echo "Yo"
	@git co -q $(BRANCH)
	@make clean && make build
	@echo $(DOMAIN) > $(BUILD)/CNAME
	@(cd $(BUILD) && \
		git init -q .  && \
		git add . && \
		git commit -q -m "Deployment (auto-commit)" && \
		git push "git@github.com:$(REPO).git" master:gh-pages --force)
	@make clean
	@git stash pop -q
	@echo "\033[0mDeployed to \033[0;32mhttp://$(DOMAIN)\033[0m"

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
