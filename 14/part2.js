(function() {
	'use strict';

	var runNTimes = function(num, callback) {
		for(var i = 0; i < num; i++) {
			callback();
		}
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

	var input = document.querySelector('.puzzle-input').textContent.trim();

	var grid = [];

	for (var i = 0; i < 128; i++) {
		var hash = knothash(input + '-' + i);
		var row = hash.split('').map(function(hex) {
			var dec = parseInt(hex, 16);
			return dec.toString(2).padStart(4, '0');
		}).join('').split('').map(function(num) {
			return parseInt(num);
		});
		grid.push(row);
	}

	var floodFill = function(x, y) {
		if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) return;
		if (grid[y][x] !== 1) return;

		grid[y][x] = -1;
		floodFill(x - 1, y);
		floodFill(x + 1, y);
		floodFill(x, y - 1);
		floodFill(x, y + 1);
	};

	var numGroups = 0;

	var found = true;

	while (found) {
		found = false;

		for (var y = 0; y < grid.length && !found; y++) {
			for (var x = 0; x < grid[0].length && !found; x++) {
				if (grid[y][x] === 1) {
					found = true;
					numGroups++;
					floodFill(x, y);
				}
			}
		}
	}

	console.log(numGroups);
}());
