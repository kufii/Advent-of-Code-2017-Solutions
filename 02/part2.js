(function() {
	'use strict';

	var getDivisible = function(array) {
		for (var i = 0; i < array.length; i++) {
			for (var j = i + 1; j < array.length; j++) {
				var dividend = Math.max(array[i], array[j]);
				var divisor = Math.min(array[i], array[j]);
				if (dividend % divisor === 0) {
					return dividend / divisor;
				}
			}
		}
		return 0;
	};

	var spreadsheet = document.querySelector('body > pre').textContent.trim().split('\n').map(function(row) {
		return row.split('\t').map(function(cell) {
			return parseInt(cell);
		});
	});

	var sum = 0;
	spreadsheet.forEach(function(row) {
		sum += getDivisible(row);
	});

	console.log(sum);
}());
