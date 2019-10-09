/* global require */

const gulp = require ('gulp');
const packageJson = require ('./package.json');
const zip = require ('gulp-zip');

gulp.task('default', () => {
	return gulp.src ([
		'./dist/**',
		'./error/**',
		'./.htaccess',
		'./robots.txt',
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
		'!./**/yarn.lock',
	], {
		dot: true
	})
		.pipe (zip (packageJson.name + '-v' + packageJson.version + '.zip'))
		.pipe (gulp.dest ('./'));
});