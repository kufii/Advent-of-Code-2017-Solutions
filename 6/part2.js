(function() {
	'use strict';

	var arraysEqual = function(a, b) {
		if (a === b) return true;
		if (a === null || b === null) return false;
		if (a.length !== b.length) return false;

		for (var i = 0; i < a.length; ++i) {
			if (a[i] !== b[i]) return false;
		}
		return true;
	};

	var hist = [];

	var blocks = document.querySelector('pre').textContent.trim().split('\t').map(function(num) {
		return parseInt(num);
	});

	var redistribute = function() {
		var max = Math.max.apply(null, blocks);
		var maxIndex = blocks.indexOf(max);
		for (var i = 1; i <= max; i++) {
			blocks[maxIndex]--;
			blocks[(maxIndex + i) % blocks.length]++;
		}
	};

	var checkHistory = function() {
		for (var i = 0; i < hist.length; i++) {
			if (arraysEqual(hist[i], blocks)) {
				return true;
			}
		}
		return false;
	};

	var firstSeen;
	var i = 0;
	while (true) {
		hist.push(blocks.slice());
		redistribute();
		if (firstSeen) {
			i++;
			if (arraysEqual(firstSeen, blocks)) {
				break;
			}
		} else if (checkHistory()) {
			firstSeen = blocks.slice();
		}
	}

	console.log(i);
}());
