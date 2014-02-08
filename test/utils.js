var validChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#",
	invalidChars = "¡™£¢∞§¶•ªºœ∑´®†¥¨ˆøπåß∂ƒ©˙∆˚¬Ω≈ç√∫˜µ≤";

module.exports.randomValidString = function(len) {
	if (!len) len = Math.floor(Math.random() * 100) + 1;
	
	var str = "";
	for (var i = 0; i < len; i++) {
		str += validChars[Math.floor(Math.random() * (validChars.length))];
	}
	return str;
}

module.exports.randomInvalidString = function(len) {
	if (!len) len = Math.floor(Math.random() * 100) + 1;
	
	var str = ""
	for (var i = 0; i < len; i++) {
		str += invalidChars[Math.floor(Math.random() * (invalidChars.length))];
	}
	return str;
}

module.exports.randomBuffer = function(len) {
	if (!len) len = Math.floor(Math.random() * 100) + 1;
	
	return require('crypto').randomBytes(len);
}
