(function() {
	'use strict';

	var array = [0];

	var steps = parseInt(document.querySelector('.puzzle-input').textContent.trim());
	var pos = 0;

	var move = function(numSteps) {
		pos = (pos + numSteps) % array.length;
	};

	for (var num = 1; num <= 2017; num++) {
		move(steps);
		array.splice(pos + 1, 0, num);
		move(1);
	}

	move(1);
	console.log(array[pos]);
}());
