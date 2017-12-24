(function() {
	'use strict';

	var b = 0,
		c = 0,
		d = 0,
		g = 0,
		h = 0;

	b = 84;
	c = b;
	b *= 100;
	b += 100000;
	c = b;
	c += 17000;
	do {
		for (d = 2; d * d <= b; d++) {
			if (b % d === 0) {
				h++;
				break;
			}
		}

		g = b - c;
		b += 17;
	} while (g !== 0);

	console.log(h);
}());
