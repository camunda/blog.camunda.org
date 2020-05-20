.SHELLFLAGS := -eu -o pipefail -c
MAKEFLAGS += --warn-undefined-variables
SHELL = /bin/bash
.SUFFIXES:

# This makefile is for local development only and is not used by the live site
# it uses docker so you don't need to install anything
# @afirth 2019/07

# Create a new post:
# make new TITLE="my-post-title"

# Serve everything, including drafts, at localhost:1313
# make

DOCKER_IMAGE := klakegg/hugo:0.50

DOCKER_CMD := docker run --user $$(id -u):$$(id -g) --rm -it -v $(CURDIR):/src
DATE_STRING := $(shell date '+%Y/%m')
POST_PATH := post/$(DATE_STRING)/$(TITLE).md

.PHONY: all
all: open serve

# serve hugo on localhost:1313
.PHONY: serve
serve: check-docker
	$(DOCKER_CMD) -p 1313:1313 $(DOCKER_IMAGE) server -D

# create a new blank post
.PHONY: new
new: check-docker check-title
	$(DOCKER_CMD) $(DOCKER_IMAGE) new -v $(POST_PATH)
	@printf "#Edit your post at created at\n\t./content/$(POST_PATH)\n"

# check docker is available
.PHONY: check-docker
check-docker:
	@which docker 1>/dev/null || (echo Docker not found; exit 21)

# check title is set
.PHONY: check-title
check-title:
	@[ "$(TITLE)" ] || (echo "TITLE is not set. make new TITLE=my-title"; exit 22)

# open browser (osx/linux) or print local browser link
.PHONY: open
open:
	@case $$OSTYPE in \
	linux-gnu) \
		sleep 1 && xdg-open http://localhost:1313 & \
		;; \
	darwin|darwin19) \
		sleep 1 && open http://localhost:1313 & \
		;; \
	*) \
		sleep 1 && printf "# Open your browser to localhost:1313\n" \
		;; \
	esac
