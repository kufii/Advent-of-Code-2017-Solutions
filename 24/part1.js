(function() {
	'use strict';

	var ports = document.querySelector('pre').textContent.trim().split('\n').map(function(line) {
		var port = line.split('/');
		return {
			left: parseInt(port[0]),
			right: parseInt(port[1])
		};
	});

	var maxStrength = 0;
	var buildChain = function(type, ports, strength) {
		strength = strength || 0;

		for (var i = 0; i < ports.length; i++) {
			var port = ports[i];
			if (port.left === type || port.right === type) {
				var newPorts = ports.slice();
				newPorts.splice(i, 1);
				var newStrength = strength + port.left + port.right;
				if (newStrength > maxStrength) {
					maxStrength = newStrength;
				}
				buildChain(port.left === type ? port.right : port.left, newPorts, newStrength);
			}
		}
	};
	buildChain(0, ports.slice());

	console.log(maxStrength);
}());
