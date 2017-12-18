(function() {
	'use strict';

	var registers = {};
	var prevFrequency;

	var getValue = function(value) {
		if (value.match(/[a-z]/)) {
			return registers[value];
		} else {
			return parseInt(value);
		}
	};

	var insts = document.querySelector('pre').textContent.trim().split('\n').map(function(inst) {
		var match = inst.match(/^(\w+) (\w)(?: ([\w\-]+))?$/);

		return {
			inst: match[1],
			register: match[2],
			value: match[3]
		};
	});

	for (var i = 0; i < insts.length; i++) {
		var inst = insts[i];

		if (inst.inst === 'set') {
			registers[inst.register] = getValue(inst.value);
		} else if (inst.inst === 'snd') {
			prevFrequency = registers[inst.register];
		} else if (inst.inst === 'add') {
			registers[inst.register] += getValue(inst.value);
		} else if (inst.inst === 'mul') {
			registers[inst.register] *= getValue(inst.value);
		} else if (inst.inst === 'mod') {
			registers[inst.register] %= getValue(inst.value);
		} else if (inst.inst === 'rcv') {
			if (getValue(inst.register) !== 0) {
				console.log(prevFrequency);
				break;
			}
		} else if (inst.inst === 'jgz') {
			if (getValue(inst.register) > 0) {
				i += getValue(inst.value) - 1;
			}
		}
	}
}());
