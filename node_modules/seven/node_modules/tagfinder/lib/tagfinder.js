// tagfinder.js
// finds opening tags and their attributes in html
// © Harald Rudell 2012

/*
Due to tags dictating how text is interpreted, the first step is to find opening tags

html syntax
http://dev.w3.org/html5/markup/syntax.html

tagfinder only supports utf-8

text: only unicode
space: \u0020, \u000c, \u000a, \u000d \u0009 (ie. \u0020, \f \n \r \t)
no \u0000 - \u0008, \u000b, \u000e - \u001f, \u007f
http://dev.w3.org/html5/markup/syntax.html#text-syntax

normal: can have comments and directives
http://dev.w3.org/html5/markup/syntax.html#normal-character-data

replaceable: title, textarea: can have '<'
comments can not appear here, a comment is output like any other character
continues until </tag
http://dev.w3.org/html5/markup/syntax.html#replaceable-character-data

non-replaceable: script, style: can have '<', can not have character references
escaping text spans can appear here
ie. comments can not appear here, a comment is output like any other character
http://dev.w3.org/html5/markup/syntax.html#non-replaceable-character-data

Elements
tags starts with '<'
tag name 0-9a-zA-Z
attributes and spaces
optional '/'
'>'
http://dev.w3.org/html5/markup/syntax.html#syntax-elements

end tag: '</'
tag name
spaces
'>'

directive: '<!'
until '>'

escaping text span '<!--'
hyphens may be shared in opening and closing tags
'-->'

comments '<!--'
0 or more characters
until '-->'
http://dev.w3.org/html5/markup/syntax.html#comments

cdata: '<![CDATA['
until ']]>'

opening tags and character references
1. tag names can not contain character references
2. space characters inside tags can not be character references
3. attribute names can not contain character references
4. attribute values may contain character references
*/

var tagRegExp = /^<([a-zA-Z\d]+)((?:[ \t\n\f\r]+[^ \t\n\f\r\u0000-\u001f\u007f'"=<>\u0000\/]+(?:|[ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r'"=<>`]+|'[^']*'|"[^"]*")))*)[ \t\n\f\r]*(\/)?>/m
var attributeRegExp = /^[ \t\n\f\r]*([^ \t\n\f\r\u0000-\u001f\u007f'"=<>\u0000\/]+)(?:[ \t\n\f\r]*=[ \t\n\f\r]*([^ \t\n\f\r'"=<>`]+|'[^']*'|"[^"]*"))/m
var emptyAttributeRegExp = /^[ \t\n\f\r]*([^ \t\n\f\r\u0000-\u001f\u007f'"=<>\u0000\/]+)/
var classRegExp = /[^ \t\n\f\r]+/gm

/*
decompose html markup into its parts
html: html string data
return value: object
.pieces: array of string: input split in pieces and comments removed
- [0]: markup prior to first tag, may be empty string
- then 3 elements per opening tag
- +0: the tag '<h1 id=a class=b>' starting and ending with angle bracket
- +1: the inital element content that is character text, may be empty string
- +2: any remaining markup that is not another opening tag
.tags: array of object describing each opening tag in order of appearance

tags:
.t tag name string 'h1'
.i index in .pieces for the string containing the tag markup. index+1 is leading element text, index+2 is remaining element content
.v voidElement flag, optional boolean: true if element is a void element
.a: attributes key: attribute name, value: attribute values, string
- enclosing quotes removed
- leading and trailing whitespace remains
.c: classes array of string: each word found in class attribute
- words are separated by html space characters
note: character references (eg. &#x20) are not expanded. If you whitespace entities in attribute names and values, results may be unexpected
*/
exports.decomposeHtml = function decomposeHtml(html) {
	var pieces = []
	var tags = []
	var htmlContentEnd = 0
	var subPieces = []
	var saveInitialText

	html = String(html)
	for (;;) {

		if (scanForOpeningTag()) break

		/*
		find the next opening tag in the html markup
		null if not found
		match[0] the matched opening tag '<p class=a id=b>'
		match[1] the matched tag 'p'
		match[2] the attribute data 'class=a id=b', trimmed from html space characters
		match[3] if a void tag '/', otherwise undefined
		match.index: index of match in the input string
		match.input: the input string
		*/
		var match = html.match(tagRegExp)
		if (!match || match.index != 0) { // a tag that could not be parsed: treat as content
			// skip past the initial less than
			htmlContentEnd++
			continue
		}
		outputPiece() // output content up to this tag

		// extract data for this opening tag
		var tagData = {
			t: match[1],
			i: pieces.length,
			a: {},
			c: [],
		}
		if (match[3]) tagData.v = 1

		// parse possible attributes
		if (match[2]) {
			parseAttributes(match[2])
			parseClassNames()
		}

		// save the tag markup
		tags.push(tagData)
		htmlContentEnd = match[0].length
		outputPiece() // the tag markup
		saveInitialText = true

		// skip some special tag content
		var htmlTag = !tagData.v ? tagData.t : ''
		switch (htmlTag) {
		case 'script':
		case 'style':
			// honor <!-- --> segments, data is until end tag
			for (;;) {
				var htmlEscaping = getIndex('<!--', htmlContentEnd)
				var htmlContentEnd = getIndex('</' + htmlTag, htmlContentEnd)
				if (htmlContentEnd < htmlEscaping) break
				htmlContentEnd = getIndex('-->', htmlEscaping + 1)
				if (htmlContentEnd == html.length) break
			}
			break
		case 'title': // content is literal until </title
		case 'textarea': // textarea can not have comments
			// literal text until end tag
			var htmlContentEnd = getIndex('</' + htmlTag)
			break				
		}
	}
	outputPiece() // markup after the final closing tag

	return {
		pieces: pieces,
		tags: tags,
	}

	/*
	find markup in html
	markup: string to search for
	pos: number: the first position to svan
	skipChars: true if found markup should be skipped
	return value:
	number no higher than html.text
	html.length if markup not found
	*/
	function getIndex(markup, pos, skipChars) {
		var result = html.indexOf(markup, pos)
		if (result == -1) result = html.length
		else if (skipChars) result += markup.length
		return result
	}

	/*
	scan html until the next opening tag or end
	if saveInitialText true: output initial plain text as one piece
	honor CDATA segments and skip comments text
	return value: true if end of text
	*/
	function scanForOpeningTag() {
		var result

		for (;;) {

			// find the next tag (or comment or cdata)
			htmlContentEnd = getIndex('<', htmlContentEnd)
			if (htmlContentEnd == html.length) {
				result = true
				break
			}

			// we know there is something, which one is it?
			if (html.substring(htmlContentEnd, htmlContentEnd + 4) == '<!--') {

				// skip comment
				saveToSubpieces()
				html = html.substring(getIndex('-->', htmlContentEnd + 4, true))
				htmlContentEnd = 0
			} else {
				if (saveInitialText) outputPiece()

				if (html.substring(htmlContentEnd, htmlContentEnd + 9) == '<![CDATA[') {

					// accept cdata segment as output
					htmlContentEnd = getIndex(']]>', htmlContentEnd + 9, true)
				} else {
					var ch = html[htmlContentEnd + 1]
					if (!(ch >= '0' &&ch <= '9') &&
						!(ch >= 'a' && ch <= 'z') &&
						!(ch >= 'A' && ch <= 'Z')) {
						/*
						it's not an opening tag, could be:
						'/' closing tag
						'!' directive
						garbage
						*/
						htmlContentEnd ++
					} else { // first two characters looks like an opening tag
						saveToSubpieces()
						break 
					}
				}
			}
		}
		if (saveInitialText) outputPiece()
		return result
	}

	// save html until htmlContentEnd into subpieces
	function saveToSubpieces() {
		if (htmlContentEnd) {
			subPieces.push(html.substring(0, htmlContentEnd))
			html = html.substring(htmlContentEnd)
			htmlContentEnd = 0
		}
	}

	// save scanned content as one piece
	function outputPiece() {
		if (htmlContentEnd) saveToSubpieces()
		pieces.push(subPieces.join(''))
		subPieces = []
		if (saveInitialText) saveInitialText = false
	}

	/*
	attributes: string attribute markup from inside tag
	updates tagData.attributes object
	*/
	function parseAttributes(attributes) {
		var attributes = match[2]
		for (;;) {

			// find an attribute name and value
			var attMatch = attributeRegExp.exec(attributes)
			if (!attMatch) attMatch = emptyAttributeRegExp.exec(attributes)
			if (!attMatch) break

			// extract attribute data
			var name = attMatch[1]
			var value = attMatch[2]
			if (value == null) value = ''
			else if (value[0] == '"' || value[0] == '\'') value = value.substring(1, value.length - 1)
			tagData.a[name] = value

			// get remaining attribute markup
			attributes = attributes.substring(attMatch.index + attMatch[0].length)
			if (!attributes) break
		}
	}

	/*
	extracts class name words in tagData
	updates tagData.classes
	*/
	function parseClassNames() {
		// add array of class names
		var match
		var classValue = tagData.a['class']
		delete tagData.a.class
		if (classValue) match = classValue.match(classRegExp)
		if (match) tagData.c = match
	}
}