(function() {
	'use strict';

	var input = document.querySelector('pre').textContent.trim();

	var level = 0;
	var inGarbage = false;
	var garbageCount = 0;

	for (var i = 0; i < input.length; i++) {
		var char = input[i];
		if (char === '!') {
			i++;
			continue;
		}
		if (inGarbage) {
			if (char === '>') {
				inGarbage = false;
			} else {
				garbageCount++;
			}
		} else if (char === '<') {
			inGarbage = true;
		}
	}

	console.log(garbageCount);
}());
