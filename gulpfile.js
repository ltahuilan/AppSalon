const { src, dest, watch , parallel, series } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');

//utilidades CSS
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano'); 

//utilidades JS
const terser = require('gulp-terser-js');
const concat = require('gulp-concat');

//utilidades para imagenes
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');


//paths
paths= {
    scss: './src/scss/**/*.scss',
    js: './src/js/**/*.js',
    img: './src/img/*'
}


function imagenes () {
    return src(paths.img)
        .pipe(cache(imagemin({optimizationLevel: 3})))
        .pipe(dest('build/img'))
        .pipe(notify({message: '<%= file.relative %> optimized successfully...'}))
}


function versionWebp() {
    return src(paths.img)
        .pipe( webp() )
        .pipe(dest('build/img'))
        .pipe(notify({ message: '<%= file.relative %> converted webp successfully...'}));
}

function css () {
    // const pluginsCSS = [autoprefixer(), cssnano()]

    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss( [autoprefixer(), cssnano()] ))
        .pipe(notify({message: '<%= file.relative %> compiled successfully...'}))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css/'))
}


function javascript () {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        // .pipe(terser())
        .pipe(notify({message: 'Fi<%= file.relative %> compiled successfully...'}))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'))
}


function watchFiles () {
    watch(paths.scss, css);
    watch(paths.js, javascript);
}


exports.default = parallel(css, javascript, imagenes, versionWebp, watchFiles);

