Grunt HTTP Download
===================
Allows to download files via HTTP and HTTPS from within grunt.

Usage Examples
--------------
Note: To use the library you will have to either install it manually by using `npm link` or by using
`npm install --save-dev grunt-http-download`.

```js
download:		{
	// Example including multiple files
	// The files "test.txt" and "test2.txt" will be placed in download/
	foo:			{
		src:			['http://www.example.org/test.txt', 'http://www.example.org/test2.txt'],
		dest:			'download/'
	},

	// Simple Example
	// The file "test.txt" will be downloaded to download/bar.txt
	bar:			{
		src:			'http://www.example.org/test.txt',
		dest:			'download/bar.txt'
	}
}
```

Release History
---------------
| Release Date | Version | Comment         |
| ------------ | ------- | --------------- |
| 2014-07-06   | v0.1.0  | Initial Release |

License
-------
	Copyright (C) 2014 Johannes Donath <johannesd@evil-co.com>

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.