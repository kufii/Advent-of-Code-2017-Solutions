(function() {
	'use strict';

	var runNTimes = function(times, callback) {
		for(var i = 0; i < times; i++) {
			callback();
		}
	};

	var grid = {};

	var getGrid = function(x, y) {
		var value = grid[y.toString()];
		if (value) {
			return value[x.toString()] || '.';
		}
		return '.';
	};

	var setGrid = function(x, y, value) {
		if (!grid[y.toString()]) {
			grid[y.toString()] = {};
		}
		grid[y.toString()][x.toString()] = value;
	};

	var maxX = 0,
		maxY = 0;
	document.querySelector('pre').textContent.trim().split('\n').forEach(function(row, y) {
		maxY = y;
		row.split('').forEach(function(cell, x) {
			maxX = x;
			setGrid(x, y, cell);
		});
	});

	var pos = {
		x: maxX / 2,
		y: maxY / 2
	};

	var directions = [
		{ x: 0, y: -1 },
		{ x: 1, y: 0 },
		{ x: 0, y: 1 },
		{ x: -1, y: 0 }
	];

	var direction = 0;

	var numInfections = 0;

	var turn = function(clockwise) {
		direction = (direction + (clockwise ? 1 : directions.length - 1)) % directions.length;
	};

	var move = function() {
		var node = getGrid(pos.x, pos.y);
		if (node === '.') {
			turn(false);
			setGrid(pos.x, pos.y, 'W');
		} else if (node === 'W') {
			setGrid(pos.x, pos.y, '#');
			numInfections++;
		} else if (node === '#') {
			turn(true);
			setGrid(pos.x, pos.y, 'F');
		} else if (node === 'F') {
			turn();
			turn();
			setGrid(pos.x, pos.y, '.');
		}

		var dir = directions[direction];
		pos.x += dir.x;
		pos.y += dir.y;
	};

	runNTimes(10000000, move);
	console.log(numInfections);
}());
