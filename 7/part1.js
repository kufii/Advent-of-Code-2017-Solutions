(function() {
	'use strict';

	var input = document.querySelector('pre').textContent.trim().split('\n').map(function(line) {
		var name = line.split(' ')[0];
		var arrow = line.indexOf('->');
		var children = [];
		if (arrow !== -1) {
			children = line.substring(arrow + 2).trim().split(', ');
		}
		return {
			name: name,
			children: children
		};
	});

	console.log(input.filter(function(program) {
		return input.filter(function(p) {
			return p.children.indexOf(program.name) !== -1;
		}).length === 0;
	})[0].name);
}());
