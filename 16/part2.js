(function() {
	'use strict';

	var runNTimes = function(num, callback) {
		for(var i = 0; i < num; i++) {
			callback();
		}
	};

	var array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];
	var init = array.slice();

	var instructions = document.querySelector('pre').textContent.trim().split(',');

	var spin = function(num) {
		var end = array.slice(array.length - num);
		var start = array.slice(0, array.length - num);
		array = end.concat(start);
	};

	var exchange = function(a, b) {
		var temp = array[b];
		array[b] = array[a];
		array[a] = temp;
	};

	var partner = function(a, b) {
		var indexA = array.indexOf(a);
		var indexB = array.indexOf(b);
		exchange(indexA, indexB);
	};

	var runInstructions = function() {
		instructions.forEach(function(inst) {
			var match;
			if (inst[0] === 's') {
				spin(parseInt(inst.substring(1)));
			} else if (inst[0] === 'x') {
				match = inst.match(/^x(\d+)\/(\d+)$/);
				exchange(parseInt(match[1]), parseInt(match[2]));
			} else if (inst[0] === 'p') {
				match = inst.match(/^p(\w+)\/(\w+)$/);
				partner(match[1], match[2]);
			}
		});
	};

	var timesRun = 0;
	var match;

	do {
		runInstructions();
		match = true;
		for (var i = 0; i < init.length; i++) {
			if (array[i] !== init[i]) {
				match = false;
			}
		}
		timesRun++;
	} while(!match && timesRun < 1000000000);

	if (match) {
		runNTimes(1000000000 % timesRun, runInstructions);
	}

	console.log(array.join(''));
}());
