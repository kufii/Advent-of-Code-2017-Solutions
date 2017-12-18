(function() {
	'use strict';

	var length = 1;
	var numAfterZero;

	var steps = parseInt(document.querySelector('.puzzle-input').textContent.trim());
	var pos = 0;

	var move = function(numSteps) {
		pos = (pos + numSteps) % length;
	};

	for (var num = 1; num <= 50000000; num++) {
		move(steps);
		length++;
		move(1);
		if (pos === 1) {
			numAfterZero = num;
		}
	}

	console.log(numAfterZero);
}());
