
#
# Binaries
#

export PATH := ./node_modules/.bin/:$(PATH)

#
# Variables
#

PORT       ?= 8080
HOST       ?= localhost
NODE_ENV   ?= development

STYLES      = $(shell find source -type f -name '*.css')
SCRIPTS     = $(shell find source -type f -name '*.js')

ASSETS      = build/index.html build/404.html build/assets/blog.css build/favicon.png build/preview.png build/assets/fonts/

BROWSERS    = "last 1 version, > 10%"
TRANSFORMS  = -t [ babelify --loose all ] -t envify

LE_ENDPOINT = OcV1dGe79X7lu_dHF7zgIyYWZyjm8tpDoBFM0QM2eDI
LE_TOKEN    = OcV1dGe79X7lu_dHF7zgIyYWZyjm8tpDoBFM0QM2eDI.4zeLYj1J00nFLUI76VfzIboqcVpJg5Npce_nxFq1qP0

DOMAIN      = rosszurowski.com
REPO        = rosszurowski/rosszurowski.github.io
BRANCH      = $(shell git rev-parse --abbrev-ref HEAD)

#
# Tasks
#

build: install assets styles scripts challenge

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

deploy:
	@echo "Deploying branch \033[0;33m$(BRANCH)\033[0m to Amazon S3..."
	# @make clean
	@NODE_ENV=production make build
	@echo "\033[0;90m"
	@aws s3 sync build s3://rosszurowski.com/ \
		--region us-east-1 \
		--acl public-read \
		--exclude '.*!.well-known' \
		--delete
	@echo "\033[0m"
	@echo "Deployed to \033[0;32mhttp://$(DOMAIN)\033[0m"

#
# These tasks were adapted from this guide to using Let's Encrypt and SSL on
# Amazon S3 and CloudFront. They could still be further automated.
#
# Currently, every few months, I'll need to boot up Docker, run `ssl:generate`
# and `ssl:upload` to renew the certificate.
#
# https://nparry.com/2015/11/14/letsencrypt-cloudfront-s3.html
#

ssl\:generate:
	@docker run -it --rm --name letsencrypt \
		-v "$SOURCE/rosszurowski/ssl/etc:/etc/letsencrypt" \
		-v "$SOURCE/rosszurowski/ssl/lib:/var/lib/letsencrypt" \
		quay.io/letsencrypt/letsencrypt:latest \
		--server https://acme-v01.api.letsencrypt.org/directory \
		-a manual auth

ssl\:upload:
	@aws iam upload-server-certificate \
		--server-certificate-name $(DOMAIN)-tmp \
		--certificate-body file://./ssl/etc/live/rosszurowski.com/cert.pem \
		--private-key file://./ssl/etc/live/rosszurowski.com/privkey.pem \
		--certificate-chain file://./ssl/etc/live/rosszurowski.com/chain.pem \
		--path /cloudfront/
	@bin/renew


ssl\:delete:
	@aws iam delete-server-certificate --server-certificate-name $(DOMAIN)

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
challenge: build/.well-known/acme-challenge/$(LE_ENDPOINT)

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
	@if [[ "$(NODE_ENV)" == "production" ]]; then uglifyjs $@ -o $@; fi

build/.well-known/acme-challenge/$(LE_ENDPOINT):
	@mkdir -p $(@D)
	@echo "$(LE_TOKEN)" > $@

#
# Phony
#

.PHONY: watch clean
