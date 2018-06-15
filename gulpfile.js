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

	/// Animate CSS
	download({
		file: 'animate.min.css',
		url: 'https://raw.githubusercontent.com/daneden/animate.css/master/animate.min.css'
	}).pipe(gulp.dest('style/'));

	// Kayros
	download({
		file: 'kayros.css',
		url: 'https://raw.githubusercontent.com/AegisFramework/Kayros/master/dist/kayros.css'
	}).pipe(gulp.dest('style/'));

	// Font Awesome
	download('https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/css/font-awesome.min.css').pipe(gulp.dest('style/'));
});