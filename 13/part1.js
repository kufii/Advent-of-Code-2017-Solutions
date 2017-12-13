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
		layers[depth] = {
			range: parseInt(match[2]),
			scanner: 0,
			scannerDirection: 1
		};
	});

	var moveScanners = function() {
		for (var property in layers) {
			if (layers.hasOwnProperty(property)) {
				var layer = layers[property];
				layer.scanner += layer.scannerDirection;
				if (layer.scanner === 0 || layer.scanner === layer.range - 1) {
					layer.scannerDirection *= -1;
				}
			}
		}
	};

	var depth = 0;
	var severity = 0;

	while (depth <= maxDepth) {
		var layer = layers[depth];
		if (layer && layer.scanner === 0) {
			severity += depth * layer.range;
		}
		moveScanners();
		depth++;
	}

	console.log(severity);
}());
