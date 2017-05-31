/**
 * Add a collection of assertion functions.
 */

var assert;

assert = module.exports = Object.create(require('assert'));

assert.isArray = function(actual, message){
	if (!Array.isArray(actual)) {
		assert.fail(actual, null, message || "expected {actual} to be an Array", null, assert.isArray);
	}
}