(function() {
	'use strict';

	var registers = {};

	var getValue = function(value) {
		if (value.match(/[a-z]/)) {
			return registers[value] || 0;
		} else {
			return parseInt(value);
		}
	};

	var insts = document.querySelector('pre').textContent.trim().split('\n').map(function(inst) {
		var match = inst.match(/^(\w+) ([\w\-]+) ([\w\-]+)?$/);

		return {
			inst: match[1],
			register: match[2],
			value: match[3]
		};
	});

	var countMul = 0;

	for (var i = 0; i < insts.length; i++) {
		var inst = insts[i];

		if (inst.inst === 'set') {
			registers[inst.register] = getValue(inst.value);
		} else if (inst.inst === 'sub') {
			registers[inst.register] -= getValue(inst.value);
		} else if (inst.inst === 'mul') {
			registers[inst.register] *= getValue(inst.value);
			countMul++;
		} else if (inst.inst === 'jnz') {
			if (getValue(inst.register) !== 0) {
				i += getValue(inst.value) - 1;
			}
		}
	}

	console.log(countMul);
}());
