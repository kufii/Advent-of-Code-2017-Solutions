(function() {
	'use strict';

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

	var lengths = document.querySelector('pre').textContent.trim().split(',').map(function(num) {
		return parseInt(num);
	});

	var pos = 0;
	var skip = 0;

	lengths.forEach(function(length) {
		var toReverse = subarray(pos, length).reverse();
		for (var i = 0; i < toReverse.length; i++) {
			setNum(pos + i, toReverse[i]);
		}
		pos += skip + length;
		skip++;
	});

	console.log(numAt(0) * numAt(1));
}());
