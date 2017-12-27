(function() {
	'use strict';
	
	var runNTimes = function(times, callback) {
		for (var i = 0; i < times; i++) {
			callback();
		}
	};
	
	var tape = {};
	
	var getValue = function(pos) {
		return tape[pos.toString()] || 0;	
	};
	
	var setValue = function(pos, value) {
		tape[pos.toString()] = value;
	};
	
	var getChecksum = function() {
		var sum = 0;
		for (var property in tape) {
			if (tape.hasOwnProperty(property)) {
				sum += tape[property];
			}
		}
		return sum;
	};
	
	var input = document.querySelector('pre').textContent.trim().split('\n\n');
	
	var pos = 0;
	var state = input[0].match(/state (\w)/)[1];
	var numSteps = parseInt(input[0].match(/(\d+)/)[1]);
	
	var rules = {};
	input.slice(1).forEach(function(rule) {
		var lines = rule.split('\n');
		var parseData = function(startIndex) {
			return {
				value: parseInt(lines[startIndex].match(/(\d)/)[1]),
				move: lines[startIndex + 1].match(/right/) ? 1 : -1,
				state: lines[startIndex + 2].match(/(\w)\./)[1]
			};
		};
		rules[lines[0].match(/(\w):/)[1]] = {
			0: parseData(2),
			1: parseData(6)
		};
	});
	
	var next = function() {
		var rule = rules[state][getValue(pos).toString()];
		setValue(pos, rule.value);
		pos += rule.move;
		state = rule.state;
	};
	
	runNTimes(numSteps, next);
	
	console.log(getChecksum());
})();
