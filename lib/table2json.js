/*
 * table2json
 * https://github.com/drzax/table2json
 *
 * Copyright (c) 2014 Simon Elvery
 * Licensed under the MIT license.
 */

;(function (name, definition) {
	if (typeof define === 'function' && typeof define.amd === 'object') {
		define(definition);
	} else if (typeof module !== 'undefined') {
		module.exports = definition();
	} else {
		this[name] = definition();
	}
})('table2json', function () {

	'use strict';

	// A custom parse int which simply returns the string if it isn't a parsable number.
	function customParseInt(str) {
		if(/^(\-|\+)?([0-9]+|Infinity)$/.test(str)) {
			return Number(str);
		}
		return str;
	}

	// Do the actual parsing of the table.
	function parse(table) {

		var result,			// the output object
			headings,		// the headings derived from the first row
			rows,			// the rows (tr elements) from the table
			cells,			// the cells in a row
			row,			// the row parsed into an object
			i, ii, j, jj;	// generic iterators

		headings = [];
		result = [];

		rows = table.querySelectorAll('tr');

		for (i=0, ii=rows.length; i<ii; i++) {
			row = {};
			cells = rows[i].querySelectorAll('td,th');

			for (j=0, jj=cells.length; j<jj; j++) {
				if (i === 0) {
					headings.push((cells[j].textContent) ? cells[j].textContent : cells[j].innerText);
				} else {
					row[headings[j]] = customParseInt(cells[j].innerHTML);
				}
			}
			if (i !== 0) {
				result.push(row);
			}
		}
		return result;
	}

	// Return the API
	return {
		parse: parse
	};
});