
var vows, load, assert, suite, fs;

// requirements
vows = require('vows');
load = require('./load');
assert = require('./assert');
fs = require('fs');

suite = vows.describe('table2json public API');

suite.addBatch({
	'running "table2json.rows"': {
		topic: load('table2json')
			.document(fs.readFileSync('test/html/basic.html'))
			.expression('table2json'),
		'on a the table in basic.html': {
			topic: function(t2j) {
				return t2j.rows('#table-1');
			},
			'returns an array' : function(parsed) {
				assert.isArray(parsed);
			},
			'with three rows' : function(parsed) {
				assert.equal(parsed.length, 3);
			},
			'and two columns' : function(parsed){
				var i;
				for (i=parsed.length; --i;) {
					assert.equal(parsed[i].length, 2);
				}
			}
		}
	},
	'running "table2json.columns"': {
		topic: load('table2json')
			.document(fs.readFileSync('test/html/basic.html'))
			.expression('table2json'),
		'on a the table in basic.html': {
			topic: function(t2j) {
				return t2j.rows('#table-1');
			},
			'returns an array' : function(parsed) {
				assert.isArray(parsed);
			},
			'with three rows' : function(parsed) {
				assert.equal(parsed.length, 3);
			},
			'and two columns' : function(parsed){
				var i;
				for (i=parsed.length; --i;) {
					assert.equal(parsed[i].length, 2);
				}
			}
		}
	}
}).export(module);