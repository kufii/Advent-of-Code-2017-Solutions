(function() {
	'use strict';

	var h = 0;

	for (var b = 84 * 100 + 100000, c = b + 17000; b - c !== 0; b += 17) {
		for (var d = 2; d * d <= b; d++) {
			if (b % d === 0) {
				h++;
				break;
			}
		}
	}

	console.log(h);
}());
