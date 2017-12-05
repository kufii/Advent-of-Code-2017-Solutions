(function() {
	'use strict';

	var instructions = document.querySelector('pre').textContent.trim().split('\n').map(function(num) {
		return parseInt(num);
	});


	var numJumps = 0;

	var i = 0;
	while (i >= 0 && i < instructions.length) {
		var inst = instructions[i];
		if (inst < 3) {
			instructions[i]++;
		} else {
			instructions[i]--;
		}
		i += inst;
		numJumps++;
	}

	console.log(numJumps);
}());
