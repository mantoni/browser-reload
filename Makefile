PATH := node_modules/.bin:${PATH}

version = `node -e "console.log(require('./package.json').version)"`
name    = "reload"

default:
	@autolint --once
	@uglifyjs ${name}.js -m -c > ${name}.min.js

release:
ifeq (v${version},$(shell git tag -l v${version}))
	@echo "Version ${version} already released!"
endif
	@make
	@echo "Creating tag v${version}"
	@git tag -a -m "Release ${version}" v${version}
	@git push --tags
	@echo "Publishing to NPM"
	npm publish
