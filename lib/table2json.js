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

	/**
	 * Detect the orientation of a table based on position of <th> cells.
	 */
	function detectOrientation(table) {
		var rows;
		rows = table.querySelectorAll('tr');
		return (rows[1].querySelectorAll('th').length === 1 && 
				rows[0].querySelectorAll('th').length === 1) ? 'horizontal' : 'vertical';
	}

	/**
	 * Extend an object
	 */
	function extend (obj) {
		var i, key, args;
		args = Array.prototype.slice.apply(arguments).slice(1).reverse();
		for(i=args.length;i--;) {
			if (args[i]) {
				for (key in args[i]) {
					obj[key] = args[i][key];
				}
			}
		}
		return obj;
	}

	// Do the actual parsing of the table.
	function parse(table, _opts) {

		var result,			// the output object
			defaults,		// default parsing options
			opts,			// passed options combined with defaults
			headings,		// the headings derived from the first row
			rows,			// the rows (tr elements) from the table
			cells,			// the cells in a row
			row,			// the row parsed into an object
			i, ii, j, jj;	// generic iterators

		defaults = {
			orientation: 'auto'
		};

		opts = extend({}, defaults, _opts);

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
		parse: parse,
		__customParseInt: customParseInt,
		__detectOrientation: detectOrientation,
		__extend: extend
	};
});