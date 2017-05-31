/*
 * table2json
 * https://github.com/drzax/table2json
 *
 * Copyright (c) 2014 Simon Elvery
 * Licensed under the MIT license.
 */
!function() {

	var opts, table2json;

	table2json = {};

	table2json.document = document;
	table2json.window = window;

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

	/**
	 * Select a HTMLTableElement from the DOM.
	 * @param  {String||DOMNode} selector Either a string selector or a DOMNode.
	 * @return {DOMNode} A DOMNode matching the selector
	 */
	function select(selector) {
		return (typeof selector === 'object' && selector instanceof table2json.window.DOMNode) ? 
			selector :
			table2json.document.querySelector(selector);
	}

	/**
	 * Return the table converted to a row-wise array of arrays.
	 * 
	 * @param {HTMLTableElement} table The table element to convert
	 * @param {object} opts A set of options for the conversion
	 * @return {Array} An array of arrays
	 */
	function rows(selector, opts) {
		var table, 
			i, ii, j, jj,
			trs, tds,
			rows, row;
		
		table = select(selector);
		trs = table.querySelectorAll('tr');
		rows = [];
		for (i=0, ii=trs.length; i<ii; i++) {
			row = [];
			tds = trs[i].querySelectorAll('td,th');
			for (j=0, jj=tds.length; j<jj; j++) {
				row.push(tds[j].innerHTML);
			}
			rows.push(row);
		}
		return rows;
	}

	/**
	 * Return the table converted to a column-wise array of arrays.
	 * 
	 * @param {HTMLTableElement} table The table element to convert
	 * @param {object} opts A set of options for the conversion
	 * @return {Array} An array of arrays
	 */
	function columns(selector, opts) {
		var table,
			i, ii, j, jj, count,
			trs, tds;
		
		table = select(selector);
		count = countColumns(table);

		trs = table.querySelectorAll('tr');
		cols = [];

		for (i=0, ii=trs.length; i<ii; i++) {
			tds = trs[i].querySelectorAll('td,th');
			for (j=0, jj=count; j<jj; j++) {
				cols[j] = cols[j] || [];
				cols[j].push((tds[j]) ? tds[j].innerHTML : null);
			}
		}
		return cols;
	}

	/**
	 * Count the columns in a table.
	 * 
	 * @param  {HTMLTableElement} table The table to count columns on.
	 * @return {Integer} The number of columns
	 */
	function countColumns(table) {
		var i,ii, trs, count;

		trs = table.querySelectorAll('tr');
		count = 0;
		for (i=0, ii=trs.length; i<ii; i++) {
			count = Math.max(count, trs[i].childNodes.length);
		}
		return count;
	}

	/**
	 * Count the rows in a table.
	 * 
	 * @param  {HTMLTableElement} table [description]
	 * @return {Integer} The number of rows
	 */
	function countRows(table) {
		return table.querySelectorAll('tr').length;
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

	// Return the API
	table2json.rows = rows;
	table2json.columns = columns;
	table2json.__extend = extend;

	if (typeof define === "function" && define.amd) {
		define(table2json);
	} else if (typeof module === "object" && module.exports) {
		module.exports = table2json;
	} else {
		this.table2json = table2json;
	}

}();