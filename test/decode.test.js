var should = require('should'),
	z85 = require('../'),
	utils = require('./utils');
	
describe('z85.decode()', function() {
	it('should decode HelloWorld correctly (http://rfc.zeromq.org/spec:32#toc3)', function() {
		var string = "HelloWorld"
			result = z85.decode(string);
		
		should.exist(result);
		result.should.be.a.Buffer;
		result.should.eql(new Buffer([0x86, 0x4F, 0xD2, 0x6F, 0xB5, 0x59, 0xF7, 0x5B]));
	});

	it('should decode a random valid string whose length is divisible by 5', function() {
		// Test a few of these
		for (var i = 1; i <= 100; i++) {
			var r = Math.floor(Math.random() * 10) + 1;
				string = utils.randomValidString(r * 5);
				result = z85.decode(string);
	
			should.exist(result);
			result.should.be.a.Buffer;
			result.should.have.length(string.length * 4 / 5);
		}
	});

	it('should not decode a random valid string whose length is not divisible by 5', function() {
		// Test a few of these
		for (var i = 1; i <= 100; i++) {
			var string = "";
			while ((string.length % 5) == 0) {
				string = utils.randomValidString();
			}
		
			var result = z85.decode(string);
		
			should.not.exist(result);
		}
	});

	it('should not decode an random invalid string of any length', function() {
		// Test a few of these
		for (var i = 1; i <= 10; i++) {
			var string = utils.randomInvalidString(),
				result = z85.decode(string);
		
			should.not.exist(result);
		}
	});
});
