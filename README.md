#z85

[ZeroMQ Base-85 Encoding](http://rfc.zeromq.org/spec:32) for node.js

## Intallation

	$ npm install z85
	
## Example

The [test case](http://rfc.zeromq.org/spec:32#toc3) in the rfc:

```js
var z85 = require('z85');

var bytes = new Buffer([0x86, 0x4F, 0xD2, 0x6F, 0xB5, 0x59, 0xF7, 0x5B]);
	result = z85.encode(bytes);
	
console.log('Encoded:', result); // HelloWorld

var string = 'HelloWorld',
	result = z85.decode(string);
	
console.log('Decoded:', result.toString('hex')); // 864fd26fb559f75b
```
	
## Running tests

Install dev dependencies:

	$ npm install

Test:

	$ make test
