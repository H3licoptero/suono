const { src, dest, watch } = require('gulp'),
    browserSync = require("browser-sync").create(),
    sass = require("gulp-sass");

function serveSass() {
    return src("sass/**/*.sass", "sass/**/*.scss")
        .pipe(sass())
        .pipe(dest('style/'))
        .pipe(browserSync.stream())
}    
    
function bs() {
    serveSass();
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    watch("./*.html").on("change", browserSync.reload)
    watch("sass/**/*.sass", serveSass)
    watch("sass/**/*.scss", serveSass)
    watch('js/*.js').on("change", browserSync.reload)
}

exports.bs = bs;
