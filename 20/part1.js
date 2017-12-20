(function() {
	'use strict';
	var particles = document.querySelector('pre').textContent.trim().split('\n').map(function(p) {
		var match = p.match(/^p=<([\d\-]+),([\d\-]+),([\d\-]+)>, v=<([\d\-]+),([\d\-]+),([\d\-]+)>, a=<([\d\-]+),([\d\-]+),([\d\-]+)>/);
		var triplet = function(start) {
			return {
				x: parseInt(match[start]),
				y: parseInt(match[start + 1]),
				z: parseInt(match[start + 2])
			};
		};
		return {
			pos: triplet(1),
			vel: triplet(4),
			acc: triplet(7),
			update: function() {
				this.vel.x += this.acc.x;
				this.vel.y += this.acc.y;
				this.vel.z += this.acc.z;
				this.pos.x += this.vel.x;
				this.pos.y += this.vel.y;
				this.pos.z += this.vel.z;
			},
			getDistFromOrigin: function() {
				return Math.abs(this.pos.x) + Math.abs(this.pos.y) + Math.abs(this.pos.z);
			},
			isMovingAwayFromOrigin: function() {
				return this.vel.x * this.acc.x >= 0 &&
					this.vel.y * this.acc.y >= 0 &&
					this.vel.z * this.acc.z >= 0 &&
					this.pos.x * this.vel.x >= 0 &&
					this.pos.y * this.vel.y >= 0 &&
					this.pos.z * this.vel.z >= 0;
			}
		};
	});

	var allMovingAway = false;
	var closestParticle;
	while (!allMovingAway) {
		allMovingAway = true;
		closestParticle = null;
		particles.forEach(function(particle, index) {
			particle.update();
			if (!particle.isMovingAwayFromOrigin()) {
				allMovingAway = false;
			}
			var distance = particle.getDistFromOrigin();
			if (closestParticle === null || distance < closestParticle.distance) {
				closestParticle = {
					index: index,
					distance: distance
				};
			}
		});
	}

	console.log(closestParticle.index);
}());
