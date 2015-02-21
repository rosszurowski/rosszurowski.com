## Makefile for rosszurowski.com

ASSETS = assets
BUILD  = public/assets

JS   = $(shell find $(ASSETS)/js -type f -name '*.js')
LIB  = $(shell find $(ASSETS)/js/libraries -type f -name '*.js')
CSS  = $(shell find $(ASSETS)/css -type f -name '*.scss' -o -name '*.sass')

# Default tasks
all: assets
	@true
# Run server
start: assets
	@iojs --harmony --harmony_arrow_functions app.io
# Run development server
develop: assets
	@nodemon --harmony --harmony_arrow_functions app.io
# Compile assets
assets: js css misc
# Test
test:
	@echo "No test specified"
	@exit 1
# Clean asset directories
clean:
	@rm -rf ./components/

node_modules: package.json
	@npm install

# Compile scripts with Duo
js: $(BUILD)/js/index.js $(BUILD)/js/libraries.js
$(BUILD)/js/index.js: $(JS)
	@mkdir -p $(@D)
	@duo $(ASSETS)/js/index.js --quiet --stdout > $@
$(BUILD)/js/libraries.js: $(LIB)
	@mkdir -p $(@D)
	@cat $^ | uglifyjs --mangle --output $@

# Compile styles with SASS
css: $(BUILD)/css/styles.css
$(BUILD)/css/styles.css: $(CSS)
	@mkdir -p $(@D)
	@sassc --sourcemap --load-path $(ASSETS)/css $(ASSETS)/css/styles.scss $@
	@autoprefixer $@ --clean --browsers "last 2 versions"
	@csso $@ $@
	
# Imagemin for images
misc:
	@true

.PHONY: all start develop test clean assets js css misc