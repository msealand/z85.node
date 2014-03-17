// Implements http://rfc.zeromq.org/spec:32
// Ported from https://github.com/zeromq/libzmq/blob/8cda54c52b08005b71f828243f22051cdbc482b4/src/zmq_utils.cpp#L77-L168

var encoder = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#";

var decoder = [
    0x00, 0x44, 0x00, 0x54, 0x53, 0x52, 0x48, 0x00, 
    0x4B, 0x4C, 0x46, 0x41, 0x00, 0x3F, 0x3E, 0x45, 
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 
    0x08, 0x09, 0x40, 0x00, 0x49, 0x42, 0x4A, 0x47, 
    0x51, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 
    0x2B, 0x2C, 0x2D, 0x2E, 0x2F, 0x30, 0x31, 0x32, 
    0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 
    0x3B, 0x3C, 0x3D, 0x4D, 0x00, 0x4E, 0x43, 0x00, 
    0x00, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 
    0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F, 0x20, 
    0x21, 0x22, 0x23, 0x4F, 0x00, 0x50, 0x00, 0x00
];

module.exports.encode = function(data) {
	if ((data.length % 4) != 0) {
		return null;
	}
	
	var str = "",
		byte_nbr = 0,
		size = data.length,
		value = 0;
	while (byte_nbr < size) {
		var characterCode;
		if (typeof data == 'string') {
			characterCode = data.charCodeAt(byte_nbr++);
		} else {
			characterCode = data[byte_nbr++];
		}
		value = (value * 256) + characterCode;
		if ((byte_nbr % 4) == 0) {
			var divisor = 85 * 85 * 85 * 85;
			while (divisor >= 1) {
				var idx = Math.floor(value / divisor) % 85;
				str += encoder[idx];
				divisor /= 85;
			}
			value = 0
		}
	}
	
	return str;
}

module.exports.decode = function(string) {
	if ((string.length % 5) != 0) {
		return null;
	}
	
	var dest = new Buffer(string.length * 4 / 5),
		byte_nbr = 0,
		char_nbr = 0,
		string_len = string.length,
		value = 0;
	while (char_nbr < string_len) {
		var idx = string.charCodeAt(char_nbr++) - 32;
		if ((idx < 0) || (idx >= decoder.length)) {
			delete dest;
			return;
		}
		value = (value * 85) + decoder[idx];
		if ((char_nbr % 5) == 0) {
			var divisor = 256 * 256 * 256;
			while (divisor >= 1) {
				dest[byte_nbr++] = (value / divisor) % 256;
				divisor /= 256;
			}
			value = 0;
		}
	}
	
	return dest;
}
