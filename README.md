# table2json [![Build Status](https://secure.travis-ci.org/drzax/table2json.png?branch=master)](http://travis-ci.org/drzax/table2json)

Convert an HTML table node to a javascript object.

## Getting Started
Install the module with: `npm install table2json`

```javascript
var table2json = require('table2json');
table2json.parse(table);
```

The `table` parameter is expected to be a HTML table node object.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint your and test code using [Grunt](http://gruntjs.com/).

## Browser support
IE7 and all more modern browsers.

## Roadmap
Okay, 'roadmap' might be over stating things, but here's what's planned:

- Deal with `colspan` and `rowspan` attributes
- Add a callback option for processing each cell as it's extracted
- Add an option for arranging the data vertically instead of horizontally.

Feel free to implement any of those and sumbmit a pull request—if it has test coverage I'll probably accept it no questions asked.

## Release History

### 0.2.2
- Test runs require Node >=0.10.0

### 0.2.1
- Correct version number mismatches
- Add node v0.8 to test matrix

### 0.2.0
- Add support for AMD
- Add support for global definition of module (i.e. make it available as `window.table2json` in the browser)
- Add unit tests

### 0.1.0
- Initial release

## License
Copyright (c) 2014 Simon Elvery  
Licensed under the MIT license.
