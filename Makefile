## Makefile for rosszurowski.com

#
# Variables
#

ASSETS = assets
BUILD  = public/assets

JS   = $(shell find $(ASSETS)/js -type f -name '*.js')
LIB  = $(shell find $(ASSETS)/js/libraries -type f -name '*.js')
CSS  = $(shell find $(ASSETS)/css -type f -name '*.scss' -o -name '*.sass')
MAIN = $(ASSETS)/js/index.js

#
# Tasks
#

all: install assets server
	
js: $(BUILD)/js/index.js $(BUILD)/js/libraries.js
css: $(BUILD)/css/styles.css

assets: js css misc

install: node_modules
server: assets
	@iojs --harmony --harmony_arrow_functions app.io
develop: assets
	@nodemon --harmony --harmony_arrow_functions app.io
test: lint
lint: $(MAIN)
	@standard
clean:
	@rm -rf ./components/

#
# Targets
#

node_modules: package.json
	@npm install

$(BUILD)/js/index.js: node_modules $(JS)
	@mkdir -p $(@D)
	@browserify $(MAIN) -o $@
$(BUILD)/js/libraries.js: $(LIB)
	@mkdir -p $(@D)
	@cat $^ | uglifyjs --mangle --output $@

$(BUILD)/css/styles.css: $(CSS)
	@mkdir -p $(@D)
	@sassc --sourcemap --load-path $(ASSETS)/css $(ASSETS)/css/styles.scss $@
	@autoprefixer $@ --clean --browsers "last 2 versions"
	@csso $@ $@


.PHONY: all start develop test clean assets js css misc