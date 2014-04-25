/* jshint undef: false, unused: true */

module("Basic Tests");

test('table-1', function(){
	var table, result;

	table = document.getElementById('table-1');
	result = window.table2json.parse(table);

	// Array returned
	strictEqual(Object.prototype.toString.call(result), '[object Array]', 'An array should be returned.');

	// Object keys
	ok(result[0].hasOwnProperty('Column 1'));
	ok(result[0].hasOwnProperty('Column 2'));
	ok(result[1].hasOwnProperty('Column 1'));
	ok(result[1].hasOwnProperty('Column 2'));

	// Row 1
	strictEqual(1,result[0]['Column 1']);
	strictEqual(2,result[0]['Column 2']);

	// Row 2
	strictEqual('three',result[1]['Column 1']);
	strictEqual('four',result[1]['Column 2']);

});