(function() {
	'use strict';

	var path = document.querySelector('pre').textContent.trim().split(',');

	var getNumStepsToOrigin = function(x, y) {
		absX = Math.abs(x);
		absY = Math.abs(y);
		return absX + Math.max(absY - (absX / 2), 0);
	};

	var distance = {
		x: 0,
		y: 0
	};

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
	});

	console.log(getNumStepsToOrigin(distance.x, distance.y));
}());
