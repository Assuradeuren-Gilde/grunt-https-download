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

	// initialize configuration
	grunt.initConfig ({

		/**
		 * Cleans up the project workspace.
		 */
		clean:		{
			test:		['test/test-actual.txt']
		},

		/**
		 * Downloads a test file.
		 */
		download:	{
			test:		{
				src:		'https://raw.githubusercontent.com/LordAkkarin/grunt-http-download/master/test/test.txt',
				dest:		'test/test-actual.txt'
			}
		},

		/**
		 * JSHint
		 */
		jshint:			{

			/**
			 * JSHint options
			 */
			options:		{

				/**
				 * Enables .jshintrc
				 */
				jshintrc:		'tasks/.jshintrc'
			},

			/**
			 * The grunt jshint task
			 */
			grunt:			{
				src:			['Gruntfile.js'],

				/**
				 * Grunt specific settings
				 */
				options:		{
					jshintrc:		'.jshintrc'
				}
			},

			/**
			 * The script jshint task
			 */
			src:			{
				src:			['src/*.js']
			}
		},

		/**
		 * Tests the library.
		 */
		nodeunit:	{
			tests:		['test/*_test.js']
		}
	});

	// load the task itself
	grunt.loadTasks ('tasks');

	// load dependency tasks
	grunt.loadNpmTasks ('grunt-contrib-jshint');
	grunt.loadNpmTasks ('grunt-contrib-nodeunit');
	grunt.loadNpmTasks ('grunt-contrib-clean');

	// register task groups
	grunt.registerTask ('test', ['clean', 'download', 'nodeunit']);
	grunt.registerTask ('default', ['jshint', 'test']);
};