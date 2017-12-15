// just for fun, outputs the grid with groups if you run it on http://adventofcode.com/2017/day/14/input
(function() {
	'use strict';

	var PAIRS = 5000000;

	var input = document.querySelector('pre').textContent.trim().split('\n').map(function(line) {
		return parseInt(line.match(/(\d+)$/)[1]);
	});

	var a = {
		value: input[0],
		factor: 16807,
		divisor: 2147483647,
		multiple: 4
	};

	var b = {
		value: input[1],
		factor: 48271,
		divisor: 2147483647,
		multiple: 8
	};

	var nextValue = function(gen) {
		do {
			gen.value = gen.value * gen.factor % gen.divisor;
		} while(gen.value % gen.multiple !== 0);
	};

	var getBinaryString = function(gen) {
		return gen.value.toString(2).padStart(32, '0');
	};

	var matches = 0;

	for(var i = 0; i < PAIRS; i++) {
		nextValue(a);
		nextValue(b);
		var binA = getBinaryString(a).substring(16);
		var binB = getBinaryString(b).substring(16);
		if (binA === binB) {
			matches++;
		}
	}

	console.log(matches);
}());
