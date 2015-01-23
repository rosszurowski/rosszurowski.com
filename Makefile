
# Default tasks
all: build
	@true
build: assets scripts styles
assets: build/index.html build/favicon.png
scripts: build/assets/index.js
styles: build/assets/styles.css


# Copy assets
build/%.png: source/%.png
	@mkdir -p $(@D)
	@cp $< $@
build/%.html: source/%.html
	@mkdir -p $(@D)
	@cp $< $@

# Compile scripts with Duo
build/assets/index.js: $(wildcard ./source/js/**/*.js)
	@mkdir -p $(@D)
	@duo ./source/js/index.js --quiet --stdout > $@


# Compile styles with sass
build/assets/styles.css: $(wildcard ./source/css/**/*.scss)
	@mkdir -p $(@D)
	@sassc --sourcemap --load-path ./source/css/ source/css/styles.scss $@
	@autoprefixer $@ --clean --browsers "last 2 versions"

# Clean built directories
clean:
	@rm -rf ./build/
	@rm -rf ./components/

.PHONY: all build clean assets scripts styles