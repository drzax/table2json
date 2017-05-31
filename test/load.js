/**
 * A test loader for vows.
 * 
 * Modelled on https://github.com/mbostock/d3/blob/master/test/load.js
 *
 * Provides a function which accepts a list of files used to construct the JS
 * being tested and returns a function which can be used as the topic function
 * in a vows test.
 *
 * Includes bootstrapping for running tests in an instance of `jsdom`.
 */

// Requirements
var smash, jsdom;

smash = require('smash');
jsdom = require('jsdom');

module.exports = function(){
	
	var files,		// The files to smash together before running the unit test
		expression,	// The expression to call when running the test
		sandbox;	// The sandboxed environment for the running unit test

	// a list of files to smash together and test is passed to this function
	files = [].slice.call(arguments).map(function(d){return 'lib/'+d});

	// default sandbox
	sandbox = {
		console: console, // pass through the current vm's console so we get output in the right place
		Date: Date // not sure why.
	}

	// The topic function to be run by the unit tests
	function topic() {
		
		// localise the callback, we'll run all tests async
		// `this.callback` is available inside all vows topic functions specifically
		// for creating async tests.
		var callback = this.callback;

		// Smash the required files together 
		// load them into the VM sandboxed context
		// run expression, and
		// call the callback with the result.
		smash.load(files, expression, sandbox, function(err, result){
			if (err) {
				console.trace(err.stack);
			}
			callback(err, result);
		});
	}

	// A setter for the expression
	topic.expression = function(ex) {
		expression = ex;
		return topic; // chain
	}

	// A setter for the sandbox
	topic.sandbox = function(sb) {
		sandbox = sb;
		return topic; // chain
	}

	// setup jsdom in the sandbox
	topic.document = function(html) {
		var document;

		// the default jsdom env
		html = '<html><head></head><body>'+html+'</body></html>';

		document = jsdom.jsdom(html);

		sandbox = {
			console: console, // pass on console from current vm so we can see console logging
			document: document, // the newly created jsdom document object
			window: document.createWindow(), // a window object from new jsdom document
			Date: Date // not sure why
		};

		return topic; // chain
	}

	return topic;
}

// find out what when wrong when it does
process.on('uncaughtException', function(e){
	console.trace(e.stack);
});