(function() {
	'use strict';

	var getRing = function(num) {
		num -= 1;
		var iteration = 1;
		while (num >= (iteration * 8)) {
			num -= (iteration * 8);
			iteration++;
		}
		return iteration;
	};

	var number = parseInt(prompt('What\'s the number'));

	var ring = getRing(number);
	var numOfNumsInRing = ring * 8;
	var numToModBy = numOfNumsInRing / 4;
	var positionInQuarter = (number - 1 - numOfNumsInRing) % numToModBy;
	var distanceToCenter = Math.abs(positionInQuarter - (numToModBy / 2));

	alert(distanceToCenter + ring);	
}());
