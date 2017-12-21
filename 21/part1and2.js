(function() {
	'use strict';

	var runNTimes = function(times, callback) {
		for (var i = 0; i < times; i++) {
			callback();
		}
	};

	var stringToSquare = function(str) {
		return str.split('/').map(function(row) {
			return row.split('');
		});
	};

	var squareToString = function(square) {
		return square.map(function(row) {
			return row.join('');
		}).join('/');
	};

	var rules = {};
	document.querySelector('pre').textContent.trim().split('\n').forEach(function(line) {
		var rule = line.split(' => ');
		rules[rule[0]] = stringToSquare(rule[1]);
	});

	var grid = stringToSquare('.#./..#/###');

	var getNumOn = function() {
		return (grid.map(function(row) {
			return row.join('');
		}).join('').match(/#/g) || []).length;
	};

	var getSquare = function(xPos, yPos, length) {
		var square = [];
		for (var y = yPos; y < yPos + length; y++) {
			var row = [];
			for (var x = xPos; x < xPos + length; x++) {
				row.push(grid[y][x]);
			}
			square.push(row);
		}
		return square;
	};

	var rotateSquareCounterClockwise = function(square) {
		return square[0].map(function(col, i) {
			return square.map(function(row) {
				return row[i];
			});
		}).reverse();
	};

	var flipSquareHorizontally = function(square) {
		return square.map(function(row) {
			return row.slice().reverse();
		});
	};

	var flipSquareVertically = function(square) {
		return square.slice().reverse();
	};

	var getRule = function(square) {
		var rule;
		for (var i = 0; i < 4; i++) {
			square = rotateSquareCounterClockwise(square);

			rule = squareToString(square);
			if (rules[rule]) return rules[rule];

			rule = squareToString(flipSquareHorizontally(square));
			if (rules[rule]) return rules[rule];

			rule = squareToString(flipSquareVertically(square));
			if (rules[rule]) return rules[rule];
		}

		return null;
	};

	var enhance = function() {
		var length = 3;
		if (grid.length % 2 === 0) {
			length = 2;
		}

		var newGrid = [];

		for (var x = 0; x < grid[0].length / length; x++) {
			for (var y = 0; y < grid.length / length; y++) {
				var square = getSquare(x * length, y * length, length);
				var rule = getRule(square);
				for (var i = 0; i < rule[0].length; i++) {
					for (var j = 0; j < rule.length; j++) {
						var yIndex = y * rule.length + j;
						var xIndex = x * rule[0].length + i;
						if (!newGrid[yIndex]) newGrid[yIndex] = [];
						newGrid[yIndex][xIndex] = rule[j][i];
					}
				}
			}
		}

		grid = newGrid;
	};

	runNTimes(5, enhance);
	console.log(getNumOn());
	runNTimes(13, enhance);
	console.log(getNumOn());
}());
