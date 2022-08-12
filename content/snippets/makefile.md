---
title: Makefiles for front-end development
slug: makefile
date: 2022-08-12
---

I love Make (aka GNU Make). Like SQLite, it's underrated software.

A few things that make it so great:

- **It's everywhere**. Most systems come pre-installed with Make. There's rarely an extra step to get working.
- **It's compatible with anything**. Whether you're working on a Go server, a PHP site, a Node app, Make works for all of them. That consistency means you can follow conventions like running `make dev` to install dependencies and start a dev server in any project.
- **It's fast**. People [routinely point out](https://twitter.com/jarredsumner/status/1557694790359085057?s=20&t=R7w-EaxCLuhMhVVaFg_M1g) that npm/yarn scripts are [shockingly slow to run](https://gist.github.com/rosszurowski/1b7971ab2eaf150c5039f3f7ef5e76a0). Make runs commands in milliseconds, which is nice, because [fast software is good software](https://craigmod.com/essays/fast_software/).

And because it's so ubiquitous, fast, and light, it doesn't require an all-in commitment. You can stitch together npm/yarn scripts, shell scripts, and Makefiles together in whatever way makes sense for you. It's just another handy tool for your toolbelt.

I'll mostly be writing from the context of web tooling, which focuses on dev servers for fast local iteration, and dependencies managed by external tools like npm/yarn.

### Basics

The `make` command reads instructions from a Makefile in the current directory. Makefiles express relationships between targets (output you want to build) and some dependencies (inputs).

For example, using esbuild to build some JS scripts:

```makefile
build/index.js:
	@esbuild --bundle src/index.ts -o build/index.js
```

(Tip: putting `@` before the command skips showing the command in the output. For most cases, I'd recommend always using it.)

You can abstract the input/output relationship by using a few special tokens too:

```makefile
build/assets/%.js: src/%.ts
	@esbuild $< --bundle --outdir=assets/bundle --minify --sourcemap
```

You can also declare "scripts" that don't have any dependencies or should always re-run by marking them as "phony" (ie. not a real target).

```makefile
clean:
	@rm -rf node_modules
	@rm -rf build
.PHONY := clean
```

### Hermetic Setups

When working with npm/yarn scripts, I'll frequently run into (or run into teammates) errors like this:

```shell
$ yarn start
$ run-p start:*
/bin/sh: run-p: command not found
error Command failed with exit code 127.
```

This error means they tried running `yarn start` without first running `yarn install`, but it's not terribly clear that's what it's asking for.

If you're working on a project all the time (or very rarely), it's nice to express all these relationships in advance so you never need to think about it again.

In Make we can use dependencies to express chains of tasks that need to run. For example, if we create a task to build node_modules when yarn.lock changes, we can leverage that in all the other scripts.

Take a Makefile like this:

```makefile
dev: node_modules
	@./node_modules/.bin/next dev --port=3050

build: node_modules
	@./node_modules/.bin/next build

node_modules: yarn.lock
	@yarn install --frozen-lockfile --check-files --network-timeout=10000
```

Now, running `make dev` will install node_modules, then run the dev command.

You can get really fancy and use this technique to download cached local versions of your toolchain, and build your way to a hermetic build environment, which removes "works on my machine" errors and subtle version mismatches.

```makefile
NODE_VERSION := 16.13.1
YARN_VERSION := 1.22.19

dev: node_modules
	@./node_modules/.bin/next dev

format: node_modules
	@./node_modules/.bin/eslint --fix 'src/**/*.{ts,tsx}'
	@./node_modules/.bin/prettier --write 'src/**/*.{ts,tsx}'

node_modules: tool/yarn tool/node yarn.lock
	@tool/yarn install --frozen-lockfile --check-files --network-timeout=10000

tool/node: node.version
	@curl -o node.version https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt
	@sha256sum -c node.version
	@curl -o node.tar.gz https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz
	@tar -xzf node.tar.gz
	@mv node-v$NODE_VERSION-linux-x64 node
	@rm node.tar.gz node.version

tool/yarn: yarn.version
	@curl -o yarn.tar.gz https://yarnpkg.com/downloads/${YARN_VERSION}/yarn-v${YARN_VERSION}.tar.gz
```

### Documentation

Makefiles can grow complex over time. One trick I've seen is to use this `make help` script to document top-level scripts:

```makefile
help: ## Show this help
	@echo Please specify a build target. The choices are:
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "$(INFO_COLOR)%-30s$(NO_COLOR) %s\n", $$1, $$2}'
.PHONY: help

.DEFAULT_GOAL := help
```

You can document commands with a `## comment` at the end of a line. For example:

```makefile
dev: node_modules ## Start a local development server
	@./node_modules/.bin/next dev
```

Running `make` or `make help` will list all the commands with the `## comment`.
Use this to call out important commands for yourself or your teammates.

### Reference Makefiles

- The [stripe-cli](https://github.com/stripe/stripe-cli/blob/master/Makefile) has some great snippets, including a `// TODO:` comment finder, a Git tag generator, and a trick to add local tools to the Makefile's `$PATH`.

### When not to use Make

While I think Make is a great tool for a lot of projects, it's not always the right thing to reach for. A few cases where you should avoid it:

**If you're working with Windows users.** It's been a while since I tested, but unless you use [WSL2](https://docs.microsoft.com/en-us/windows/wsl/about), using Make results in a lot of fighting against the system. Makefiles usually rely on a lot of UNIX tools and conventions. While it's possible to make Windows-compatible Makefiles, it may feel like more effort than it's worth.

**If you're working with a lot of parallel tasks**, like concurrent dev servers. You _can_ express concurrency using parallel Make instances like this, but it gets a little fiddly:

```makefile
dev: ## Start a local dev server
	@$(MAKE) -j3 dev-www dev-js dev-css

dev-www:
	@php -S localhost:8080 path/to/router.php
dev-js: node_modules
	@./node_modules/.bin/esbuild src/*.ts --bundle --outdir=build --watch
dev-css: node_modules
	@./node_modules/.bin/tailwindcss -i src/index.css -o build/index.css --watch
```

One of the biggest issues with this is that if one subprocess fails (eg. a syntax error stops the Tailwind dev server), the others keep on going. You'll lose your live-updating changes without noticing until later.

You can get proper parallel tasks by using separate shell scripts and exit traps and whatnot but it all gets to be a bit much for me. In these cases, I usually just rely on other tools: a custom Go script in Go projects, or [npm-run-all](https://www.npmjs.com/package/npm-run-all) for Node projects.

**If you already have a setup you're happy with**. For simple projects, npm/yarn scripts can be enough. Don't change if what you have is working. That said, if you're getting a little frustrated with how long they get, or cramming things into `pre:` and `post:` scripts, give Make a try.
