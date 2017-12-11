(function() {
	'use strict';

	var path = document.querySelector('pre').textContent.trim().split(',');

	var getNumStepsToOrigin = function(x, y) {
		var steps = 0;

		x = Math.abs(x);
		while (x > 0) {
			if (y >= 0) {
				y -= 0.5;
			} else {
				y += 0.5;
			}
			x--;
			steps++;
		}

		return steps + y;
	};

	var distance = {
		x: 0,
		y: 0
	};

	var maxDistance = 0;

	path.forEach(function(step) {
		if (step === 'n') {
			distance.y += 1;
		} else if (step === 's') {
			distance.y -= 1;
		} else {
			if (step.indexOf('n') !== -1) {
				distance.y += 0.5;
			} else {
				distance.y -= 0.5;
			}
			if (step.indexOf('e') !== -1) {
				distance.x += 1;
			} else {
				distance.x -= 1;
			}
		}

		var numSteps = getNumStepsToOrigin(distance.x, distance.y);
		if (numSteps > maxDistance) maxDistance = numSteps;
	});

	console.log(maxDistance);
}());
