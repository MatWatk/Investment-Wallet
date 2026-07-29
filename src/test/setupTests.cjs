require('@testing-library/jest-dom');
require('whatwg-fetch');

const { TextEncoder, TextDecoder } = require('node:util');

if (!global.TextEncoder) {
	global.TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
	global.TextDecoder = TextDecoder;
}
