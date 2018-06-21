/* global require */

const gulp = require ('gulp');
const packageJson = require ('./package.json');
const zip = require ('gulp-zip');
const download = require ('gulp-download-stream');

gulp.task('default', () => {
	return gulp.src ([
		'./**',
		'!./**/.DS_Store',
		'!./**/.thumbs',
		'!./**/package-lock.json',
		'!./**/.buildconfig',
		'!node_modules',
		'!node_modules/**',
		'!.git',
		'!.git/**',
		'!build',
		'!build/**',
		'!dist',
		'!dist/**',
		'!./**/yarn.lock',
	], {
		dot: true
	})
		.pipe (zip (packageJson.name + '-v' + packageJson.version + '.zip'))
		.pipe (gulp.dest ('dist'));
});


// Update Dependencies
gulp.task('download-deps', () => {

	// Font Awesome
	download('https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/css/font-awesome.min.css').pipe(gulp.dest('style/'));
});