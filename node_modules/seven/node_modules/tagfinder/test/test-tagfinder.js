// test-tagfinder.js
// © Harald Rudell 2012

var tagfinder = require('../lib/tagfinder')
var assert = require('mochawrapper')
/*
// test providing empty markup
exports['Empty Markup:'] = {
	'Can parse undefined': function() {
		var html
		var expected = {
			pieces: [ 'undefined' ],
			tags: []
		}
		var actual = tagfinder.decomposeHtml(html)
		assert.deepEqual(actual, expected)
	},
	'Can parse empty string': function () {
		var html = ''
		var expected = {
			pieces: [ '' ],
			tags: []
		}
		var actual = tagfinder.decomposeHtml(html)
		assert.deepEqual(actual, expected)
	}
}

exports['Pieces Count:'] = {
	'Text is one piece': function() {
		var html = 'abc'
		var expected = {
			pieces: [ 'abc' ],
			tags: []
		}
		var actual = tagfinder.decomposeHtml(html)
		assert.deepEqual(actual, expected)
	},
	'One tag is 4 pieces': function () {
		var html = 'a<title>b</title>'
		var expected = {
			pieces: [ 'a', '<title>', 'b', '</title>' ],
			tags: [{
				t: 'title',
				i: 1,
				a: {},
				c: [],
			}],
		}
		var actual = tagfinder.decomposeHtml(html)
		assert.deepEqual(actual, expected)
	}

}
*/
exports['Tags:'] = {
	'Should find opening tags': function() {
		var html = ' <tag1></tag1> <tag2 ></tag2> <tag3/> <tag4 />'
		var expected = {
			pieces: [
				' ',
				'<tag1>', '', '</tag1> ',
				'<tag2 >', '', '</tag2> ',
				'<tag3/>', ' ', '',
				'<tag4 />', '', ''
			],
			tags: [{
				t: 'tag1', i: 1, a: {},c: []
				}, {
				t: 'tag2', i: 4, a: {}, c: []
				}, {
				t: 'tag3', i: 7, v: true, a: {}, c: []
				}, {
				t: 'tag4', i: 10, v: true, a: {}, c: []
			} ]
		}

		var tagData = tagfinder.decomposeHtml(html)
		assert.deepEqual(tagData, expected, 'html:' + assert.inspectDeep(html))
	},
	'Should find empty attributes': function() {
		var html = ' <tag a1 class>'
		var expected = {
			pieces: [
				' ',
				'<tag a1 class>', '', ''
			],
			tags: [ {
				t: 'tag', i: 1,
				a: {
					a1: '',
				},
				c: []
			} ]
		}

		var tagData = tagfinder.decomposeHtml(html)
		assert.deepEqual(tagData, expected, 'html:' + assert.inspectDeep(html))
	},
	'Should find unquoted attributes': function() {
		var html = ' <tag a1=a class = b>'
		var expected = {
			pieces: [
				' ',
				'<tag a1=a class = b>', '', ''
			],
			tags: [ {
				t: 'tag', i: 1,
				a: {
					a1: 'a',
				},
				c: [ 'b']
			} ]
		}

		var tagData = tagfinder.decomposeHtml(html)
		assert.deepEqual(tagData, expected, 'html:' + assert.inspectDeep(html))
	},
	'Should find quoted attributes': function() {
		var html = ' <tag a1=\'a\' class = "b c ">'
		var expected = {
			pieces: [
				' ',
				'<tag a1=\'a\' class = "b c ">', '', ''
			],
			tags: [ {
				t: 'tag', i: 1,
				a: {
					a1: 'a',
				},
				c: [ 'b', 'c']
			} ]
		}

		var tagData = tagfinder.decomposeHtml(html)
		assert.deepEqual(tagData, expected, 'html:' + assert.inspectDeep(html))
	},
	'Should continue after corrupt opening tag': function() {
		var html = ' <div><tag"a"><title>'
		var expected = {
			pieces: [
				' ',
				'<div>', '', '<tag"a">',
				'<title>', '', '',
			],
			tags: [{
				t: 'div',
				i: 1,
				a: {},
				c: [],
			},{
				t: 'title',
				i: 4,
				a: {},
				c: [],				
			}]
		}

		var tagData = tagfinder.decomposeHtml(html)
		assert.deepEqual(tagData, expected, 'html:' + assert.inspectDeep(html))
	},
	'Newline in attribute value': function() {
		var html = ' <div class = "a\nb"></div>'
		var expected = {
			pieces: [
				' ',
				'<div class = "a\nb">', '', '</div>',
			],
			tags: [{
				t: 'div',
				i: 1,
				a: {},
				c: ['a', 'b'],
			}]
		}

		var tagData = tagfinder.decomposeHtml(html)
		assert.deepEqual(tagData, expected, 'html:' + assert.inspectDeep(html))
	},
}

exports['Comments:'] = {
	'Should remove html comments': function() {
		var html = '<!doctype html> <!-- hey < > - --> <title> <!-- --> </title> z'
		var expected = {
			pieces: [
				'<!doctype html>  ',
				'<title>',
				' <!-- --> ',
				'</title> z',
			],
			tags: [{
				t: 'title',
				i: 1,
				a: {},
				c: [],
			}],
		}
		var actual = tagfinder.decomposeHtml(html)
		assert.deepEqual(actual, expected, 'html:' + assert.inspectDeep(html))
	},
	'Should ignore tags inside comments': function() {
		var html = '<!doctype html>a<!--b<div>c-->d'
		var expected = {
			pieces: [
				'<!doctype html>ad',
			],
			tags: [],
		}
		var actual = tagfinder.decomposeHtml(html)
		assert.deepEqual(actual, expected, 'html:' + assert.inspectDeep(html))
	},
	'Should detect comments after closing tags': function () {
		var html = '<!doctype html>a</div><!--b<div>c-->d<title>e'
		var expected = {
			pieces: [
				'<!doctype html>a</div>d',
				'<title>', 'e', ''
			],
			tags: [{
				t: 'title',
				i: 1,
				a: {},
				c: [],
			}],
		}
		var actual = tagfinder.decomposeHtml(html)
		assert.deepEqual(actual, expected, 'html:' + assert.inspectDeep(html))
	},
	'Removed comments does not affect subsequent positions': function () {
		var html = '<!-- views/unauthorized.ejs --><!doctype html>\n' +
			'<title> - Unauthorized</title>'
		var bindings = {
			title: ['ABC']
		}
		var expected = {
			pieces: [
				'<!doctype html>\n',
				'<title>', ' - Unauthorized', '</title>'
			],
			tags: [{
				t: 'title',
				i: 1,
				a: {},
				c: [],
			}],
		}
		var actual = tagfinder.decomposeHtml(html)
		assert.deepEqual(actual, expected, 'html:' + assert.inspectDeep(html))
	},
}

exports['Character Data:'] = {
	'Should parse cdata as text': function () {
		var html = ' <div><![CDATA[ & </div><br/> ]]></div>'
		var expected = {
			pieces: [
				' ',
				'<div>', '', '<![CDATA[ & </div><br/> ]]></div>'],
			tags: [{
				t: 'div',
				i: 1,
				a: {},
				c: [],
			}]
		}
		var tagData = tagfinder.decomposeHtml(html)
		assert.deepEqual(tagData, expected, 'html:' + assert.inspectDeep(html))
	},
	'Should ignore tags inside cdata': function () {
		var html = ' <div><![CDATA[ & <div><br/> ]]></div>'
		var expected = {
			pieces: [
				' ',
				'<div>', '', '<![CDATA[ & <div><br/> ]]></div>'
			],
			tags: [{
				t: 'div',
				i: 1,
				a: {},
				c: [],
			}]
		}
		var tagData = tagfinder.decomposeHtml(html)
		assert.deepEqual(tagData, expected, 'html:' + assert.inspectDeep(html))
	},
}

exports['Unescaped Content:'] = {
	'Should retain ampersand and less than': function () {
		var html = ' <script>a<!--b&<c-->d</script>'
		var expected = {
			pieces: [' ', '<script>', 'a<!--b&<c-->d', '</script>'],
			tags: [{
				t: 'script', i: 1, a: {}, c: []
			}]
		}
		var tagData = tagfinder.decomposeHtml(html)
		assert.deepEqual(tagData, expected, 'html:' + assert.inspectDeep(html))
	},
	'Should retain enclosed closing tags': function () {
		var html = ' <script>a<!--b</script>c-->d<!--e-->f</script>'
		var expected = {
			pieces: [' ', '<script>', 'a<!--b</script>c-->d<!--e-->f', '</script>'],
			tags: [{
				t: 'script', i: 1, a: {}, c: []
			}]
		}
		var tagData = tagfinder.decomposeHtml(html)
		assert.deepEqual(tagData, expected)
	},
	'Should retain enclosed opening tags': function () {
		var html = ' <script>a<!--b<div>c-->d<!--e-->f</script>'
		var expected = {
			pieces: [
				' ',
				'<script>', 'a<!--b<div>c-->d<!--e-->f', '</script>'],
			tags: [{
				t: 'script',
				i: 1,
				a: {},
				c: []
			}]
		}
		var tagData = tagfinder.decomposeHtml(html)
		assert.deepEqual(tagData, expected, 'html:' + assert.inspectDeep(html))
	},
}

exports['Foreign Content:'] = {
	'Should parse MathML': function () {
		var html = '<math xmlns="http://www.w3.org/1998/Math/MathML">' +
			'<mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow>' +
			'</math>'
		var expected = {
			pieces: [ '', '<math xmlns="http://www.w3.org/1998/Math/MathML">',
					'', '', '<mrow>', '', '', '<mi>', 'a', '</mi>', '<mo>', '+', '</mo>', '<mi>',
					'b', '</mi></mrow></math>' ],
		tags: [{
			t: 'math', i: 1, a: {xmlns: "http://www.w3.org/1998/Math/MathML"}, c: []},
			{ t: 'mrow', i: 4, a: {}, c: []},
			{ t: 'mi', i: 7, a: {}, c: []},
			{ t: 'mo', i: 10, a: {}, c: []},
			{ t: 'mi', i: 13, a: {}, c: []}
		]}
		var tagData = tagfinder.decomposeHtml(html)
		assert.deepEqual(tagData, expected)
	},
	'Should parse svg': function () {
		var html = '<div><svg xmlns="http://www.w3.org/2000/svg" ' +
		'version="1.1" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" ' +
		'style="width:100%; height:100%; position:absolute; top:0; left:0; z-index:-1;">' +
		'<linearGradient id="gradient">' +
		'<stop class="begin" offset="0%"/>' +
		'<stop class="end" offset="100%"/>' +
		'</linearGradient>' +
		'<rect x="0" y="0" width="100" height="100" style="fill:url(#gradient)" />' +
		'<circle cx="50" cy="50" r="30" style="fill:url(#gradient)" />' +
		'</svg></div>'
		var expected = {
			pieces: ['', '<div>', '', '',
				'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style="width:100%; height:100%; position:absolute; top:0; left:0; z-index:-1;">',
				'', '', '<linearGradient id="gradient">', '', '',
				'<stop class="begin" offset="0%"/>', '', '',
				'<stop class="end" offset="100%"/>', '', '</linearGradient>',
				'<rect x="0" y="0" width="100" height="100" style="fill:url(#gradient)" />',
				'', '',
				'<circle cx="50" cy="50" r="30" style="fill:url(#gradient)" />',
				'', '</svg></div>' ],
			tags: [
				{t: 'div', i: 1, a: {}, c: []},
				{t: 'svg', i: 4, a: {
					xmlns: "http://www.w3.org/2000/svg",
					version: "1.1",
					viewBox: "0 0 100 100",
					preserveAspectRatio: "xMidYMid slice",
					style: "width:100%; height:100%; position:absolute; top:0; left:0; z-index:-1;"},
					c: []},
				{t: 'linearGradient', i: 7, a: {id: "gradient"}, c: []},
				{t: 'stop', i: 10, a: {offset: "0%"}, c: ['begin'], v: 1},
				{t: 'stop', i: 13, a: {offset: "100%"}, c: ['end'], v: 1},
				{t: 'rect', i: 16, a: {x: "0", y: "0", width: "100", height: "100", style: "fill:url(#gradient)"}, c: [], v: 1},
				{t: 'circle', i: 19, a: {cx: "50", cy: "50", r: "30", style: "fill:url(#gradient)"}, c: [], v: 1 }
			]
		}
		var tagData = tagfinder.decomposeHtml(html)
		assert.deepEqual(JSON.stringify(tagData), JSON.stringify(expected))
	},
}