(function() {
	'use strict';

	var reverseCaptcha = function(captcha) {
		var numbers = captcha.split('');
		var sum = 0;
		for (var i = 0; i < numbers.length; i++) {
			var num1 = numbers[i];
			var num2 = numbers[(i + (numbers.length / 2)) % numbers.length];
			console.log(num1, num2);
			if (num1 === num2) {
				sum += parseInt(num1);
			}
		}
		return sum;
	};

	var captcha = document.querySelector('body > pre').textContent.trim();
	console.log(reverseCaptcha(captcha));
}());
