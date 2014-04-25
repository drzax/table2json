/* jshint undef: false, unused: true */

module('Private functions');

test('extend', function(){
	var extended, one, two;
	one = {
		a: 1,
		b: 2,
		c: 'three'
	};
	two = {
		a: 100,
		c: 200,
		d: 'three',
		e: function() {}
	};

	extended = window.table2json.__extend({}, one, two);

	strictEqual(extended.a, two.a);
	strictEqual(extended.b, one.b);
	strictEqual(extended.c, two.c);
	strictEqual(extended.d, two.d);
	strictEqual(extended.e, two.e);

	extended = window.table2json.__extend({}, two, one);

	strictEqual(extended.a, one.a);
	strictEqual(extended.b, one.b);
	strictEqual(extended.c, one.c);
	strictEqual(extended.d, two.d);
	strictEqual(extended.e, two.e);

});

test('customParseInt', function(){
	strictEqual(window.table2json.__customParseInt("-10000001000000"), -10000001000000);
	strictEqual(window.table2json.__customParseInt("-1000000"), -1000000);
	strictEqual(window.table2json.__customParseInt("-100"), -100);
	strictEqual(window.table2json.__customParseInt("0"), 0);
	strictEqual(window.table2json.__customParseInt("1"), 1);
	strictEqual(window.table2json.__customParseInt("+1"), 1);
	strictEqual(window.table2json.__customParseInt("100"), 100);
	strictEqual(window.table2json.__customParseInt("1000000"), 1000000);
	strictEqual(window.table2json.__customParseInt("10000001000000"), 10000001000000);
	strictEqual(window.table2json.__customParseInt("Infinity"), Infinity);
	strictEqual(window.table2json.__customParseInt('zero'), "zero");
});

test('detectOrientation', function(){
	strictEqual(
		window.table2json.__detectOrientation(document.getElementById('horizontal')),
		'horizontal', 
		'Expecting horizontally oriented table to be evaluated as horizontal.'
	);
	strictEqual(
		window.table2json.__detectOrientation(document.getElementById('vertical')),
		'vertical', 
		'Expecting vertically oriented table to be evaluated as vertical.'
	);

	strictEqual(
		window.table2json.__detectOrientation(document.getElementById('mixed-orientation')),
		'vertical',
		'Expecting mixed-orientation table to be evaluated as vertical.'
	);
});