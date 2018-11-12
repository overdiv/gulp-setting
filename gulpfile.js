var gulp = require("gulp");
var babel = require("gulp-babel");
var clean = require("gulp-clean");
var sass = require("gulp-sass");
var beautify = require('easy-beautify');

var devSrc = {
	'html': './src/*.html',
	'js': './src/js/**',
	'sass': './src/scss/**',
	'css': './src/css/**',
	'img': './src/img/**'
}
var distSrc = {
	'html': './dist/',
	'js': './dist/js/',
	'css': './dist/css/',
	'img': './dist/img/'
}
var wrapOpt = {
	"indent_size": 4,
	"indent_char": "",
	"eol": "\n",
	"indent_level": 0,
	"indent_with_tabs": true,
	"preserve_newlines": false,
	"beautifier": "html"
}

gulp.task('clean', function () {
	return gulp.src([
		distSrc.js + '*.js',
		distSrc.css + '*.css'
	], {
		read: true
	})
	.pipe(clean());
});

gulp.task('beautify', function () {
	return gulp.src(devSrc.html)
	.pipe(beautify(wrapOpt))
	.pipe(gulp.dest(distSrc.html));
});

gulp.task('beautify-js', function () {
	wrapOpt.beautifier = "js";
	wrapOpt.preserve_newlines = true;
	return gulp.src(devSrc.js)
		.pipe(beautify(wrapOpt))
		.pipe(gulp.dest('./src/js'));
});

gulp.task('beautify-css', ['sass'], function () {
	wrapOpt.beautifier = "css";
	return gulp.src(devSrc.css)
		.pipe(beautify(wrapOpt))
		.pipe(gulp.dest('./src/css/'))
		.pipe(gulp.dest(distSrc.css));
});

gulp.task('sass', function () {
	return gulp.src(devSrc.sass)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./src/css/'));
});

gulp.task('babel', ['clean', 'beautify-js'], function () {
	return gulp.src(devSrc.js)
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(gulp.dest(distSrc.js));
});

gulp.task('compile', function() {
	console.log('Compile...');
});

gulp.task('default', ['babel','beautify-css']);
