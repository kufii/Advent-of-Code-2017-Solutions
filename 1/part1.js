(function() {
	'use strict';

	var reverseCaptcha = function(captcha) {
		var numbers = captcha.split('');
		var sum = 0;
		for (var i = 0; i < numbers.length; i++) {
			var num1 = numbers[i];
			var num2 = i === numbers.length - 1 ? numbers[0] : numbers[i + 1];
			if (num1 === num2) {
				sum += num1;
			}
		}
		return sum;
	};

	var captcha = document.querySelector('body > pre').textContent.trim();
	console.log(reverseCaptcha(captcha));
}());
