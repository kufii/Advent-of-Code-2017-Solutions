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
	var maxLength = 0;
	var buildChain = function(type, ports, strength, length) {
		strength = strength || 0;
		length = length || 0;
		if (length === maxLength && strength > maxStrength) {
			maxStrength = strength;
		} else if (length > maxLength) {
			maxLength = length;
			maxStrength = strength;
		}

		for (var i = 0; i < ports.length; i++) {
			var port = ports[i];
			if (port.left === type || port.right === type) {
				var newPorts = ports.slice();
				newPorts.splice(i, 1);
				buildChain(port.left === type ? port.right : port.left, newPorts, strength + port.left + port.right, length + 1);
			}
		}
	};
	buildChain(0, ports.slice());

	console.log(maxStrength);
}());
