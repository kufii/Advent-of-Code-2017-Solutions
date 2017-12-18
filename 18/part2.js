(function() {
	'use strict';

	var insts = document.querySelector('pre').textContent.trim().split('\n').map(function(inst) {
		var match = inst.match(/^(\w+) ([\w\-]+)(?: ([\w\-]+))?$/);

		return {
			inst: match[1],
			register: match[2],
			value: match[3]
		};
	});

	var programs = [];

	var Program = function(id) {
		var registers = {
			p: id
		};
		var queue = [];
		var pos = 0;
		var countSent = 0;

		var getValue = function(value) {
			if (value.match(/[a-z]/)) {
				return registers[value] || 0;
			} else {
				return parseInt(value);
			}
		};

		var next = function() {
			var inst = insts[pos];

			if (inst.inst === 'set') {
				registers[inst.register] = getValue(inst.value);
			} else if (inst.inst === 'snd') {
				programs[(id + 1) % 2].send(getValue(inst.register));
				countSent++;
			} else if (inst.inst === 'add') {
				registers[inst.register] += getValue(inst.value);
			} else if (inst.inst === 'mul') {
				registers[inst.register] *= getValue(inst.value);
			} else if (inst.inst === 'mod') {
				registers[inst.register] %= getValue(inst.value);
			} else if (inst.inst === 'rcv') {
				registers[inst.register] = queue.shift();
			} else if (inst.inst === 'jgz') {
				if (getValue(inst.register) > 0) {
					pos += getValue(inst.value) - 1;
				}
			}

			pos++;
		};

		var send = function(value) {
			queue.push(value);
		};

		var isDone = function() {
			return pos < 0 || pos >= insts.length;
		};

		var isDoneOrWaiting = function() {
			var inst = insts[pos];
			return isDone() || (inst.inst === 'rcv' && queue.length === 0);
		};

		return {
			next: next,
			send: send,
			isDoneOrWaiting: isDoneOrWaiting,
			getCountSent: function() {
				return countSent;
			}
		};
	};

	programs.push(Program(0));
	programs.push(Program(1));

	var deadlock;
	do {
		deadlock = true;
		for (var i = 0; i < programs.length; i++) {
			var program = programs[i];
			if (!program.isDoneOrWaiting()) {
				deadlock = false;
				program.next();
			}
		}
	} while(!deadlock);

	console.log(programs[1].getCountSent());
}());
