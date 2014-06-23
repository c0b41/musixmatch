// examples.js

demonstrate(tagFinderExample, '../../lib/tagfinder')

function tagFinderExample(require) {
console.log(require('tagfinder').decomposeHtml(
  '<!doctype html><title class="c1 c2" id=p>x</title>'))
}

// utility

function demonstrate(func, relative) {
	console.log('\n===== ' + func.name + '\n')
	console.log(getSource(func))
	console.log()
	func(myRequire(relative))
}

function getSource(func) {
	var match = func.toString().match(/[\s\S]*\{([\s\S]*)\}/m)
	var source = match ? match[1].trim() : ''
	return source
}

// mock require
function myRequire(relative) {
	return function requireWrapper(module) {
		return require(relative)
	}
}