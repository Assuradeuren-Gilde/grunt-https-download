/*
 * Copyright (C) 2014 Johannes Donath <johannesd@evil-co.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var grunt = require('grunt');

/**
 * Tests a simple download from GitHub.
 * @param test The test callback.
 */
exports.testDownload = function (test) {
    'use strict';

    // expect a single test
    test.expect(1);

    // read files
    var actual = grunt.file.read('test/test-actual.txt');
    var expected = grunt.file.read('test/test.txt');

    // check
    test.equal(expected, actual, 'should allow single file download');

    // finish test
    test.done();
};