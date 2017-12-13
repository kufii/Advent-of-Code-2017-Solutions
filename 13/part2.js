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

	var movesUntilHit = function(layer) {
		if (layer.scanner === 0) return 0;
		if (layer.scannerDirection === -1) {
			return layer.scanner;
		} else {
			return (layer.range - 1 - layer.scanner) + (layer.range - 1);
		}

	};

	var willHitAfterNMoves = function(layer, moves) {
		moves = moves % ((layer.range - 1) * 2);
		return(movesUntilHit(layer) === moves);
	};

	var delay = 0;

	while (true) {
		var willHit = false;
		for (var i = 0; i <= maxDepth; i++) {
			if (layers[i]) {
				if (willHitAfterNMoves(layers[i], i)) {
					willHit = true;
					break;
				}
			}
		}
		if (!willHit) {
			break;
		}
		delay++;
		moveScanners();
	}

	console.log(delay);
}());
