'use strict'

const fs           = require('fs');
const gulp         = require('gulp');
const browserSync  = require('browser-sync');
const jade         = require('gulp-jade');
const plumber      = require('gulp-plumber');
const sass         = require('gulp-sass');
// const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const spritesmith  = require('gulp.spritesmith');
// const concat       = require('gulp-concat');

const paths = './app/jade/*.jade';
const YOUR_LOCALS = './content.json';

gulp.task('server', function () {
    browserSync({
        port: 9000,
        server: {
            baseDir: './app/pages/'
        },
        // tunnel: "thefasttracker"
    });
});

gulp.task('jade', function() {
    gulp.src(paths)
        .pipe(plumber())
        .pipe(jade({
            locals: JSON.parse(fs.readFileSync(YOUR_LOCALS, 'utf8')),
            pretty: '\t'
        }))
        .pipe(gulp.dest('./app/pages'))
});

// watch
gulp.task('watch', function(){
    gulp.watch(paths, ['jade']);
    gulp.watch('./app/sass/**/*.scss', ['compass']);
    gulp.watch([
        'app/*.html',
        'app/pages/*.html',
        'app/js/**/*.js',
        'app/css/**/*.css',
    ]).on('change', browserSync.reload);
});

gulp.task('default', ['server', 'watch']);


// // Static Server + watching scss/html files
// gulp.task('serve', ['sass'], function() {

//     browserSync.init({
//         proxy: "dz1.loc"
//     });

//     gulp.watch("app/scss/*.scss", ['sass']);
//     gulp.watch("app/*.html").on('change', browserSync.reload);
//     gulp.watch("app/js/*.js").on('change', browserSync.reload);
// });

// // Compile sass into CSS & auto-inject into browsers
// gulp.task('sass', function() {
//     return gulp.src("app/scss/*.scss")
//         .pipe(sass())
//         .pipe(sourcemaps.init())
        
//         .pipe(autoprefixer({
//             browsers: ['last 10 versions', 'IE 8']
//         }))
//         .pipe(sourcemaps.write())
//         .pipe(plumber())
//         .pipe(gulp.dest("app/css"))
//         .pipe(browserSync.stream());
// });

// lavrik
// gulp.task('sprite', function () {
//     var spriteData = gulp.src('dev/img/icons/*.png')
//         .pipe(spritesmith({
//             imgName: 'sprite.png',
//             imgPath: '../img/sprite.png',
//             cssName: 'sprite.scss'
//         }));
//     spriteData.img.pipe(gulp.dest('dev/img/'));
//     spriteData.css.pipe(gulp.dest('dev/scss/'));
// });

// gulp.task('sprite', function () {
//   var spriteData = gulp.src('app/images/sprite/*.png').pipe(spritesmith({
//     imgName: 'sprite1.png',
//     cssName: 'sprite1.css',
//     imgPath: '../images/sprite1.png'
    
//   }));
//   spriteData.img.pipe(gulp.dest('app/images/')); // путь, куда сохраняем картинку
//   spriteData.css.pipe(gulp.dest('app/src/')); // путь, куда сохраняем стили
// });


// gulp.task('default', ['serve']);
