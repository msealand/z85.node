var should = require('should'),
	z85 = require('../'),
	utils = require('./utils');
	
describe('z85.encode()', function() {
	it('should encode HelloWorld correctly (http://rfc.zeromq.org/spec:32#toc3)', function() {
		var bytes = new Buffer([0x86, 0x4F, 0xD2, 0x6F, 0xB5, 0x59, 0xF7, 0x5B]),
			result = z85.encode(bytes),
			decoded = z85.decode(result);
		
		should.exist(result);
		result.should.be.a.String;
		result.should.eql("HelloWorld");
		decoded.should.eql(bytes);
	});
	
	it('should encode 0x00 0x00 0x00 0x00', function() {
		var bytes = new Buffer([0x00, 0x00, 0x00, 0x00]),
			result = z85.encode(bytes);

		should.exist(result);
		result.should.be.a.String;
		result.should.have.length(bytes.length * 5 / 4);
	});
	
	it('should encode 0xFF 0xFF 0xFF 0xFF', function() {
		var bytes = new Buffer([0xFF, 0xFF, 0xFF, 0xFF]),
			result = z85.encode(bytes);

		should.exist(result);
		result.should.be.a.String;
		result.should.have.length(bytes.length * 5 / 4);
	});

	it ('should encode a numeric string correctly', function() {
		var input = "1234";
		var expected = "f!$Kw";
		var result = z85.encode(input);
		var decoded = z85.decode(result).toString();

		should.exist(result);
		result.should.be.a.String;
		result.should.have.length(5);
		result.should.eql(expected);
		decoded.should.eql(input);
	});

	it('should encode a random buffer whose length is divisible by 4', function() {
		// Test a few of these
		for (var i = 1; i <= 100; i++) {
			var r = Math.floor(Math.random() * 10) + 1,
				bytes = utils.randomBuffer(r * 4);
				result = z85.encode(bytes),
				decoded = z85.decode(result);
	
			should.exist(result);
			result.should.be.a.String;
			result.should.have.length(bytes.length * 5 / 4);
			decoded.should.eql(bytes);
		}
	});

	it('should not encode a random buffer whose length is not divisible by 4', function() {
		// Test a few of these
		for (var i = 1; i <= 100; i++) {
			var bytes;
			while (!bytes || ((bytes.length % 4) == 0)) {
				bytes = utils.randomBuffer();
			}
		
			var result = z85.encode(bytes);
		
			should.not.exist(result);
		}
	});
});
