deliver = function(user, dish) {
	return new Promise((res, rej) => {
		let time = getRandomInt(20, 120);// * 1000
		let success = getRandomInt(1, 101);
		setTimeout(() => {
			if (success <= 95) res();
			else rej();
		}, time);
	})
}

getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = { deliver };