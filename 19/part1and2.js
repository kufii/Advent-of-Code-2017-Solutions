(function() {
	'use strict';

	var letters = [];

	var maze = document.querySelector('pre').textContent.split('\n').filter(function(line) {
		return line;
	}).map(function(line) {
		return line.split('');
	});

	var coord = {
		x: maze[0].indexOf('|'),
		y: 0
	};
	var direction = {
		x: 0,
		y: 1
	};

	var steps = 0;

	while(maze[coord.y][coord.x].trim()) {
		var square = maze[coord.y][coord.x];
		if (square.match(/[A-Z]/)) {
			letters.push(square);
		} else if (square === '+') {
			var xAxis = (Math.abs(direction.x) + 1) % 2;
			var yAxis = (Math.abs(direction.y) + 1) % 2;
			for (var x = coord.x - xAxis; x <= coord.x + xAxis; x += 2) {
				for (var y = coord.y - yAxis; y <= coord.y + yAxis; y += 2) {
					if (y >= 0 && y < maze.length && x >= 0 && x < maze[y].length) {
						if (maze[y][x].trim()) {
							direction.x = x - coord.x;
							direction.y = y - coord.y;
						}
					}
				}
			}
		}
		coord.x += direction.x;
		coord.y += direction.y;
		steps++;
	}

	console.log(letters.join(''));
	console.log(steps);
}());
