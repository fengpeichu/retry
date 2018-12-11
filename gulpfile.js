var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: '9090',
            proxies: [{
                source: '/users/api/get/list',
                target: 'http://169.254.237.125:3000/users/api/get/list'
            }]
        }))
});
gulp.task('Sass', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
});
gulp.task('watch', function() {
    gulp.watch('./src/sass/*.scss', gulp.series('Sass'))
});
//开发环境
gulp.task('dev', gulp.series('Sass', 'server', 'watch'));