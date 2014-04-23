/*
 * table2json
 * https://github.com/drzax/table2json
 *
 * Copyright (c) 2014 Simon Elvery
 * Licensed under the MIT license.
 */

'use strict';

function customParseInt(str) {
	if(/^(\-|\+)?([0-9]+|Infinity)$/.test(str)) {
		return Number(str);
	}
	return str;
}

exports.parse = function(table) {

	var result,			// the output object
		headings,		// the headings derived from the first row
		rows,			// the rows (tr elements) from the table
		cells,			// the cells in a row
		row,			// the row parsed into an object
		parsedInt,		// a cells contents parsed as an integer
		i, ii, j, jj;	// generic iterators

	headings = [];
	result = [];

	rows = table.querySelectorAll('tr')

	for (i=0, ii=rows.length; i<ii; i++) {
		row = {};
		cells = rows[i].querySelectorAll('td,th');

		for (j=0, jj=cells.length; j<jj; j++) {
			if (i === 0) {
				headings.push(cells[j].textContent);
			} else {
				row[headings[j]] = customParseInt(cells[j].innerHTML);
			}
		}
		if (i !== 0) {
			result.push(row);
		}
	}
	return result;
};
