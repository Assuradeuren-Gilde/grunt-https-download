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
module.exports = function (grunt) {
    'use strict';

    // dependencies
    var chalk = require('chalk');
    var fs = require('fs');
    var http = require('http');
    var https = require('https');
    var url = require('url');

    /**
     * The download task.
     */
    grunt.registerMultiTask('download', 'Download files.', function () {

        /**
         * Returns the correct HTTP engine.
         * @param url The url.
         * @returns {exports}
         */
        var getEngine = function (url) {
            return (url.match(/^https:/i) ? https : http);
        };

        /**
         * Checks the destination type.
         * @param dest The destination.
         * @returns {string}
         */
        var getDestinationType = function (dest) {
            if (grunt.util._.endsWith(dest, '/')) {
                return 'directory';
            } else {
                return 'file';
            }
        }

        // get async helper
        var done = this.async();
        var count = this.files.length;

        // iterate over all files
        this.files.forEach(function (filePair) {
            filePair = filePair.orig;
            var destinationType = getDestinationType(filePair.dest);

            // verify array size
            if (filePair.src.length > 1 && destinationType != 'directory') {
                grunt.log.error('Cannot download multiple objects into one file.');
                return done(false);
            }

            // initialize count
            var fileCount = filePair.src.length;

            // download all files
            filePair.src.forEach(function (file) {
                // verify URL
                if (!file.match(/^https?:\/\//i)) {
                    grunt.log.error('URL ' + file + ' is not a valid HTTP(S) URL.');
                    return done(false);
                }

                // get engine
                var engine = getEngine(file);


                // set destination
                var destination = filePair.dest + (destinationType === 'directory' ? file.split('/').pop() : '');

                // log
                grunt.log.writeln('Downloading ' + chalk.cyan(file) + ' to ' + chalk.cyan(destination) + ' ...');

                // open file
                var fileStream = fs.createWriteStream(destination);

                // download file
                engine.get(file, function (response) {
                    // verify status code
                    if (response.statusCode != 200) {
                        grunt.log.error('Could not download ' + file + ': Expected response code 200 but got ' + response.statusCode + '.');
                        return done(false);
                    }

                    // setup pipe to file
                    response.pipe(fileStream);

                    // listen for end
                    response.on('end', function () {
                        // log
                        grunt.log.writeln('Finished downloading ' + chalk.cyan(file) + '.');

                        // reduce amount of files
                        fileCount--;

                        // reduce amount of active tasks
                        if (fileCount <= 0) count--;

                        // check for last file
                        if (count <= 0) return done(true);
                    });
                });
            });
        });
    });
};