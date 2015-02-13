## Makefile for rosszurowski.com

ASSETS = assets
BUILD  = public/assets

JS   = $(shell find $(ASSETS)/js -type f -name '*.js')
LIB  = $(shell find $(ASSETS)/js/libraries -type f -name '*.js')
CSS  = $(shell find $(ASSETS)/css -type f -name '*.scss' -o -name '*.sass')

# Default tasks
all: build
	@true
# Run server
server:
	@iojs app.js
# Compile assets
assets: js css misc
# Test
test:
	@echo "No test specified"
	@exit 1
# Clean asset directories
clean:
	@rm -rf ./build/
	@rm -rf ./components/


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

.PHONY: all server build clean assets js css