var should = require('should'),
	z85 = require('../'),
	utils = require('./utils');
	
describe('z85', function() {
	describe('#encode', function() {
		it('should encode HelloWorld correctly', function() {
			var bytes = new Buffer([0x86, 0x4F, 0xD2, 0x6F, 0xB5, 0x59, 0xF7, 0x5B]);
				result = z85.encode(bytes);
			
			should.exist(result);
			result.should.be.a.String;
			result.should.eql("HelloWorld");
		});
	
		it('should encode a buffer whose length is divisible by 4', function() {
			// Test a few of these
			for (var i = 1; i <= 100; i++) {
				var r = Math.floor(Math.random() * 10) + 1;
					bytes = utils.randomBuffer(r * 4);
					result = z85.encode(bytes);
		
				should.exist(result);
				result.should.be.a.String;
				result.should.have.length(bytes.length * 5 / 4);
			}
		});
	
		it('should not encode a buffer whose length is not divisible by 4', function() {
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
});
