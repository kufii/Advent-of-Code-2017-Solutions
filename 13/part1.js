(function() {
	'use strict';

	var layers = {};
	var maxDepth = 0;
	document.querySelector('pre').textContent.trim().split('\n').forEach(function(layer) {
		var match = layer.match(/^(\d+): (\d+)$/);
		var depth = parseInt(match[1]);
		if (depth > maxDepth) {
			maxDepth = depth;
		}
		layers[depth] = parseInt(match[2]);
	});

	var positionAfterNMoves = function(range, moves) {
		return (moves) % ((range - 1) * 2);
	};

	var depth = 0;
	var severity = 0;

	while (depth <= maxDepth) {
		var range = layers[depth];
		if (range && positionAfterNMoves(range, depth) === 0) {
			severity += depth * range;
		}
		depth++;
	}

	console.log(severity);
}());
