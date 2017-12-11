(function() {
	'use strict';

	var vars = {};

	var getVar = function(name) {
		return vars[name] || 0;
	};

	var incVar = function(name, amount) {
		vars[name] = getVar(name) + amount;
	};

	var decVar = function(name, amount) {
		incVar(name, -amount);
	};

	var checkCondition = function(firstVar, operator, secondVar) {
		if (operator === '==') {
			return firstVar === secondVar;
		} else if (operator === '!=') {
			return firstVar !== secondVar;
		} else if (operator === '<') {
			return firstVar < secondVar;
		} else if (operator === '>') {
			return firstVar > secondVar;
		} else if (operator === '<=') {
			return firstVar <= secondVar;
		} else if (operator === '>=') {
			return firstVar >= secondVar;
		}
		return false;
	};

	var max = {
		name: '',
		value: 0
	};

	document.querySelector('pre').textContent.trim().split('\n').forEach(function(line) {
		var match = line.match(/^(\w+) (inc|dec) ([-\d]+) if (\w+) ([!<>=]+) ([-\d]+)$/);
		
		var condition = {
			variable: match[4],
			operator: match[5],
			value: parseInt(match[6])
		};

		if (checkCondition(getVar(condition.variable), condition.operator, condition.value)) {
			var instruction = {
				variable: match[1],
				operator: match[2],
				amount: parseInt(match[3])
			};

			if (instruction.operator === 'inc') {
				incVar(instruction.variable, instruction.amount);
			} else {
				decVar(instruction.variable, instruction.amount);
			}

			if (getVar(instruction.variable) > max.value) {
				max.name = instruction.variable;
				max.value = getVar(instruction.variable);
			}
		}
	});

	console.log(max);
}());
