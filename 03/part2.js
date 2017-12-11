(function() {
	'use strict';

	var stopAt = 368078;
	var grid = {
		0: {
			0: 1
		}
	};

	var getGrid = function(x, y) {
		var value = grid[x.toString()];
		if (value) {
			return value[y.toString()] || 0;
		}
		return 0;
	};

	var setGrid = function(x, y, value) {
		if (!grid[x.toString()]) {
			grid[x.toString()] = {};
		}
		grid[x.toString()][y.toString()] = value;
	};

	var getSumSurrounding = function(x, y) {
		var sum = 0;
		for (var i = x - 1; i <= x + 1; i++) {
			for (var j = y - 1; j <= y + 1; j++) {
				sum += getGrid(i, j);
			}
		}
		return sum;
	};

	var x = 1;
	var y = 0;
	var dx = 0;
	var dy = 1;
	var wallLength = 2;
	var wallIndex = 0;
	var wallsComplete = 0;
	var currentValue = 1;

	var turn = function() {
		if (dx === 1) {
			dx = 0;
			dy = 1;
		} else if (dx === -1) {
			dx = 0;
			dy = -1;
		} else if (dy === 1) {
			dx = -1;
			dy = 0;
		} else if (dy === -1) {
			dx = 1;
			dy = 0;
		}
	};

	while (currentValue <= stopAt) {
		currentValue = getSumSurrounding(x, y);
		setGrid(x, y, currentValue);

		wallIndex++;
		if (wallIndex === wallLength) {
			wallIndex = 0;
			wallsComplete++;
			turn();
			if (wallsComplete === 4) {
				wallsComplete = 0;
				wallLength += 2;
				x++;
				continue;
			}
		}

		x += dx;
		y += dy;
	}

	console.log(currentValue);
}());
