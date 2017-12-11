(function() {
	'use strict';

	var runXTimes = function(num, callback) {
		for(var i = 0; i < num; i++) {
			callback();
		}
	};

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

	var lengths = document.querySelector('pre').textContent.trim().split('').map(function(char) {
		return char.charCodeAt(0);
	});
	lengths = lengths.concat([17, 31, 73, 47, 23]);

	var pos = 0;
	var skip = 0;

	runXTimes(64, function() {
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
			hash.push(block);
		}
	}

	var hashcode = hash.map(function(block) {
		return block.toString(16);
	}).join('');

	console.log(hashcode);
}());
