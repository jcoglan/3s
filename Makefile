export SHELL := /bin/bash
export PATH  := node_modules/.bin:$(PATH)

.PHONY: test

lib/lisp_parser.js: lib/lisp_parser.peg
	canopy $<

test: lib/lisp_parser.js
	./bin/lisp test.scm
