// just for fun, outputs the grid with groups if you run it on http://adventofcode.com/2017/day/14/input
(function() {
	'use strict';

	var runNTimes = function(num, callback) {
		for(var i = 0; i < num; i++) {
			callback();
		}
	};

	var getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	var randomColor = function() {
		var color = '#';
		runNTimes(3, function() {
			color += getRandomInt(80, 255).toString(16).padStart(2, '0');
		});
		return color;
	};

	

	var padCenter = function(str, length, char) {
		var spaces = length - str.length;
		if (spaces > 0) {
			var left = Math.floor(spaces / 2);
			var right = spaces - left;
			str = str.padStart(str.length + left, char);
			return str.padEnd(str.length + right, char);
		}
		return str;
	};

	var knothash = function(input) {
		var array = Array.apply(null, {length: 256}).map(Number.call, Number);

		var numAt = function(index) {
			return array[index % array.length];
		};

		var setNum = function(index, value) {
			array[index % array.length] = value;
		};

		var subarray = function(index, length) {
			var output = [];
			for (var i = index; i < index + length; i++) {
				output.push(numAt(i));
			}
			return output;
		};

		var lengths = input.split('').map(function(char) {
			return char.charCodeAt(0);
		}).concat([17, 31, 73, 47, 23]);

		var pos = 0;
		var skip = 0;

		runNTimes(64, function() {
			lengths.forEach(function(length) {
				var toReverse = subarray(pos, length).reverse();
				for (var i = 0; i < toReverse.length; i++) {
					setNum(pos + i, toReverse[i]);
				}
				pos += skip + length;
				skip++;
			});
		});

		var hash = [];
		var block = null;
		for (var i = 0; i < array.length; i++) {
			if (i % 16 === 0) {
				block = numAt(i);
			} else {
				block = block ^ numAt(i);
			}

			if (i % 16 === 15) {
				hash.push(block.toString(16).padStart(2, '0'));
			}
		}

		return hash.join('');
	};

	var input = document.querySelector('pre').textContent.trim();

	var grid = [];

	for (var i = 0; i < 128; i++) {
		var hash = knothash(input + '-' + i);
		var row = hash.split('').map(function(hex) {
			var dec = parseInt(hex, 16);
			return dec.toString(2).padStart(4, '0');
		}).join('').split('').map(function(c) {
			return c.replace(/1/g, '#').replace(/0/g, '.');
		});
		grid.push(row);
	}

	var floodFill = function(x, y, fill) {
		if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) return;
		if (grid[y][x] !== '#') return;

		grid[y][x] = fill;
		floodFill(x - 1, y, fill);
		floodFill(x + 1, y, fill);
		floodFill(x, y - 1, fill);
		floodFill(x, y + 1, fill);
	};

	var numGroups = 0;

	var found = true;

	var colors = [];

	while (found) {
		found = false;

		for (var y = 0; y < grid.length && !found; y++) {
			for (var x = 0; x < grid[0].length && !found; x++) {
				if (grid[y][x] === '#') {
					found = true;
					numGroups++;
					colors.push(randomColor());
					floodFill(x, y, numGroups.toString());
				}
			}
		}
	}

	console.log(numGroups);

	document.querySelector('pre').innerHTML = grid.map(function(row) {
		return row.map(function(col) {
			var output = padCenter(col, numGroups.toString().length + 1, '*').replace(/\*/g, '&nbsp;');
			if (col !== '.') {
				output = '<span style="color:' + colors[parseInt(col) - 1] + ';">' + output + '</span>';
			}
			return output;
		}).join('');
	}).join('</br>');

	document.querySelector('pre').style.whiteSpace = 'nowrap';
	document.body.style.color = 'white';
	document.body.style.backgroundColor = 'black';
}());
