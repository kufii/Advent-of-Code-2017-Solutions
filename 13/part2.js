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

	var delay = -1;
	var willHit;
	do {
		delay++;
		willHit = false;
		for (var i = 0; i <= maxDepth; i++) {
			if (layers[i]) {
				var position = positionAfterNMoves(layers[i], i + delay);
				if (position === 0) {
					willHit = true;
					break;
				}
			}
		}
	} while (willHit);

	console.log(delay);
}());
