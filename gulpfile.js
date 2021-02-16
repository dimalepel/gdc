"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
//var jsmin = require("gulp-jsmin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var server = require("browser-sync").create();

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/images/**",
      "source/js/**"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        cascade: false
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("sprite", function () {
  return gulp.src("source/images/sprite/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/images"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("js", function () {
  return gulp.src("source/js/**/*.js")
    //.pipe(jsmin())
    //.pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/images/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/images"));
});

gulp.task("webp", function () {
  return gulp.src("source/images/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/images"));
});

gulp.task("imgcopy", function () {
  return gulp.src("source/images/**/*.{png,jpg,svg}")
    //.pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/images"));
});

gulp.task("fontscopy", function () {
  return gulp.src("source/fonts/**/*.{ttf,woff,woff2}")
    .pipe(gulp.dest("build/fonts"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css", "refresh"));
  //gulp.watch(["source/img/icon-*.svg", "source/img/htmlacademy.svg"], gulp.series("sprite", "refresh"))
  gulp.watch("source/**/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/**/*.js", gulp.series("js", "refresh"));
  gulp.watch("source/images/**/*.{png,jpg,svg}", gulp.series("imgcopy", "refresh"));
  gulp.watch("source/fonts/**/*.{ttf,woff,woff2}", gulp.series("fontscopy", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series("clean", "copy", "css", "js", /*"sprite",*/ "html"));
gulp.task("start", gulp.series("build", "server"));
