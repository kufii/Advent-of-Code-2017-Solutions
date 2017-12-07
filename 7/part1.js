(function() {
	'use strict';

	var input = document.querySelector('pre').textContent.trim().split('\n').map(function(line) {
		var match = line.match(/^(\w+) \((\d+)\)(?: -> ([\w, ]+))?$/);
		return {
			name: match[1],
			weight: parseInt(match[2]),
			children: match[3] ? match[3].split(', ') : []
		};
	});

	console.log(input.filter(function(program) {
		return input.filter(function(p) {
			return p.children.indexOf(program.name) !== -1;
		}).length === 0;
	})[0].name);
}());
