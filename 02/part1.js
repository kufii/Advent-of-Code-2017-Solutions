(function() {
	'use strict';

	var getDifference = function(array) {
		var min, max;
		array.forEach(function(num) {
			if (typeof(min) === 'undefined' || num < min) min = num;
			if (typeof(max) === 'undefined' || num > max) max = num;
		});
		return max - min;
	};

	var spreadsheet = document.querySelector('body > pre').textContent.trim().split('\n').map(function(row) {
		return row.split('\t').map(function(cell) {
			return parseInt(cell);
		});
	});

	var sum = 0;
	spreadsheet.forEach(function(row) {
		sum += getDifference(row);
	});

	console.log(sum);
}());
