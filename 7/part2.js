(function() {
	'use strict';

	var input = document.querySelector('pre').textContent.trim().split('\n').map(function(line) {
		var name = line.split(' ')[0];

		var arrow = line.indexOf('->');
		var children = [];
		if (arrow !== -1) {
			children = line.substring(arrow + 2).trim().split(', ');
		}

		var weight = line.split(' ')[1];
		weight = parseInt(weight.substring(1, weight.length - 1));
		return {
			name: name,
			weight: weight,
			children: children
		};
	});

	var getChain = function(program) {
		var output = {
			weight: program.weight,
			children: {}
		};
		program.children.forEach(function(child) {
			var childProgram = input.filter(function(p) {
				return p.name === child;
			})[0];
			if (childProgram.children.length === 0) {
				output.children[childProgram.name] = {
					weight: childProgram.weight
				};
			} else {
				output.children[childProgram.name] = getChain(childProgram);
			}
		});
		return output;
	};

	var getWeight = function(branch) {
		var weight = branch.weight;
		if (branch.children) {
			for (var property in branch.children) {
				if (branch.children.hasOwnProperty(property)) {
					weight += getWeight(branch.children[property]);
				}
			}
		}
		return weight;
	};

	var findUnbalanced = function(tree) {
		if (tree.children) {
			var branchWeights = [];
			var weights = [];
			for (var property in tree.children) {
				if (tree.children.hasOwnProperty(property)) {
					var totalWeight = getWeight(tree.children[property]);
					branchWeights.push({name: property, totalWeight: totalWeight, weight: tree.children[property].weight});
					weights.push(totalWeight);
				}
			}
			if (new Set(weights).size > 1) {
				var unbalancedWeight = Math.max.apply(null, weights);
				var weightShouldBe = Math.min.apply(null, weights);
				var unbalanced = branchWeights.filter(function(branch) {
					return branch.totalWeight === unbalancedWeight;
				})[0];
				if (!findUnbalanced(tree.children[unbalanced.name])) {
					console.log(unbalanced.name + ' is unbalanced. Should be ' + (unbalanced.weight - (unbalancedWeight - weightShouldBe)));
				}
				return true;
			}
		}
		return false;
	};

	input.forEach(function(program) {
		if (program.children.length > 0) {
			var childOccurances = input.filter(function(p) {
				return p.children.indexOf(program.name) !== -1;
			});
			if (childOccurances.length === 0) {
				findUnbalanced(getChain(program));
				console.log(getChain(program));
			}
		}
	});
}());
