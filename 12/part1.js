(function() {
	'use strict';

	var programs = document.querySelector('pre').textContent.trim().split('\n').map(function(p) {
		var match = p.match(/^(\d+) <-> ([\d, ]+)$/);
		return {
			id: parseInt(match[1]),
			links: match[2].split(', ').map(function(id) {
				return parseInt(id);
			})
		};
	});

	var getConnections = function(id, connections) {
		connections = connections || [];
		connections.push(id);

		var program;
		programs.some(function(p) {
			if (p.id === id) {
				program = p;
				return true;
			}
		});

		program.links.forEach(function(l) {
			if (connections.indexOf(l) === -1) {
				connections = getConnections(l, connections);
			}
		});

		return connections;
	};

	console.log(getConnections(0).length);
}());
