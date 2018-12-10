var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: '9090',
            proxies: [{
                source: '/api/get/list',
                target: 'http://localhost:3000/api/get/list'
            }]
        }))
});
// gulp.task('sass', function() {
//     return gulp.src('./src/sass/*.scss')
//     pipe(sass())
//     pipe(gulp.dest('./src/css'))
// });
// gulp.task('watch', function() {
//     gulp.watch('')
// })