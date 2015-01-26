'use strict';

var gulp = require('gulp');
var fs = require('fs');

var banner = fs.readFileSync('banner.txt', 'utf-8');

// Register sass tasks
var sass = require('pd-gulp-sass-task')(gulp);

sass.register({
	options:{
		banner: banner
	},
	assets: {
		src: './src/*.scss',
		dest: './dist'
	}
},{
	watch: {
		watch: './src/**/*.scss'
	}
});



// Register javascript tasks
var js = require('pd-gulp-js-task')(gulp);

js.register({
	options:{
		banner: banner
	},
	assets: {
		src: './src/*.js',
		dest: './dist',
		browserify: {
			standalone: 'pdAutogrowInput'
		}
	}
});



