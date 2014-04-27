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

	var opts;

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

	function mParse(table) {
		var i, ii, j, jj,
			matrix,
			rows, row, cells;

		rows = table.querySelectorAll('tr');
		matrix = [];
		for (i=0, ii=rows.length; i<ii; i++) {
			row = [];
			cells = rows[i].querySelectorAll('td,th');
			for (j=0, jj=cells.length; j<jj; j++) {
				row.push(opts.parseCell(cells[j]));
			}
		}
		return matrix;
	}

	function hParse(table) {
		var i, ii, j, jj,
			result,
			row, rows, cells;

		result = [];

		rows = table.querySelectorAll('tr');

		
		return result;
	}

	function vParse(table) {
		var i, ii, j, jj,
			headings,
			result,
			row, rows, cells;

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
					row[headings[j]] = opts.parseCell(cells[j]);
				}
			}
			if (i !== 0) {
				result.push(row);
			}
		}
		return result;
	}

	/**
	 * The default cell parsing function.
	 */
	function parseCell(node) {
		return customParseInt(node.innerHTML);
	}

	// Do the actual parsing of the table.
	function parse(table, _opts) {

		var defaults; // default parsing options

		defaults = {
			orientation: 'auto',
			parseCell: parseCell
		};

		opts = extend({}, defaults, _opts);

		// Detect orientation if appropriate
		if (opts.orientation === 'auto') {
			opts.orientation = detectOrientation(table);
		}

		if (opts.orientation === 'vertical') {
			return vParse(table);
		}

		if (opts.orientation === 'horizontal') {
			return hParse(table);
		}

		return mParse(table);
		
	}

	// Return the API
	return {
		parse: parse,
		__customParseInt: customParseInt,
		__detectOrientation: detectOrientation,
		__extend: extend
	};
});