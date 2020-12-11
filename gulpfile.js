"use strict";

var gulp = require("gulp");
var babel = require("gulp-babel");
var sass = require("gulp-sass");
sass.compiler = require("node-sass");
var compass = require("gulp-compass");
var cssPrefix = require("gulp-css-prefix");
var concat = require("gulp-concat");
const autoPrefixer = require("gulp-autoprefixer");
var sourcemaps = require('gulp-sourcemaps');



gulp.task("cvexdashboard", function () {
  return gulp
    .src([
      "src/js/_header.js",
      "src/js/_cvexEvents.js",    
      "src/js/_footer.js",    
      "src/js/_cvesEventsApp.js",    
    ])
    .pipe(concat("cvexEvents.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("./dist/js/production"));
});


gulp.task("cvexdashboardcss", function () {
  return gulp
    .src(["src/scss/cvex-dashboard.scss"])
    .pipe(sourcemaps.init())
    .pipe(
      compass({
        css: "dist/css",
        sass: "src/scss",
        sourcemap: true
      })
    )
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoPrefixer({ cascade: false }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dist/css"));
});



gulp.task("watch", function () {
  gulp.watch("src/js/*.js", gulp.series("cvexdashboard"));
  gulp.watch("src/scss/**/*.scss", gulp.series("cvexdashboardcss"));
});

gulp.task("default", gulp.series(["cvexdashboard","cvexdashboardcss","watch"]));
