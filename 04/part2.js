(function() {
	'use strict';

	var passprases = document.querySelector('pre').textContent.trim().split('\n');
	console.log(passprases.filter(function(phrase) {
		var words = phrase.split(' ').map(function(word) {
			return word.split('').sort().join('');
		});
		return (new Set(words)).size === words.length;
	}).length);
}());
