/* jshint undef: false, unused: true */

module("AMD");

asyncTest('define table2json', function(){

	expect(2);

	requirejs.config({
		baseUrl: '../lib'
	});

	requirejs(['table2json'], function(table2json) {
		strictEqual(typeof table2json, 'object', "table2json should be an object.");
		ok(table2json.hasOwnProperty('parse'), 'table2json should have a parse property');
		start();
	});
});