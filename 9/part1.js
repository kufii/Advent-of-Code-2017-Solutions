(function() {
	'use strict';

	var input = document.querySelector('pre').textContent.trim();

	var level = 0;
	var score = 0;
	var inGarbage = false;

	for (var i = 0; i < input.length; i++) {
		var char = input[i];
		if (char === '!') {
			i++;
			continue;
		}
		if (inGarbage) {
			if (char === '>') inGarbage = false;
		} else {
			if (char === '<') {
				inGarbage = true;
			} else if (char === '{') {
				level++;
				score += level;
			} else if (char === '}') {
				level--;
			}
		}
	}

	console.log(score);
}());
