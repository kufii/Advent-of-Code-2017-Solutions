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

	var squares = 0;

	for (var i = 0; i < 128; i++) {
		var hash = knothash(input + '-' + i);
		var binary = hash.split('').map(function(hex) {
			var dec = parseInt(hex, 16);
			return dec.toString(2);
		}).join('');
		squares += (binary.match(/1/g) || []).length;
	}

	console.log(squares);
}());
