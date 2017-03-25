var fs = require('fs');
var path = require('path');

module.exports = function (gulp,plugins) {
    
    gulp.task('scss', function() {
        return gulp.src('src/scss/styles.scss')
            .pipe(plugins.sass({
                includePaths: [
                    'node_modules/normalize-scss/sass',
                    'node_modules/skeleton-scss/scss',
                    'node_modules/support-for/sass'
                ]
            }))
            .pipe(plugins.concat('styles.css'))
            .pipe(plugins.autoprefixer())
            .pipe(plugins.cssnano())
            .pipe(gulp.dest('./dist/css/'))
            .pipe(plugins.browserSync.stream({ match: '**/*.css'}));
    });

    gulp.task('includes', function() {
        return gulp.src('node_modules/whatwg-fetch/fetch.js')
            .pipe(gulp.dest('./dist/js'));
    });

    gulp.task('scripts', function () {
        return gulp.src('src/js/**/*.js')
            .pipe(plugins.concat('scripts.js'))
            //.pipe(plugins.uglify())
            .pipe(gulp.dest('./dist/js'));
    });

    gulp.task('html', function() {
        var templateData = {};

        var options = {
            ignorePartials: true,
            batch: [
                'src/templates'
            ],
            helpers: {}
        };

        return gulp.src('src/index.hbs')
            .pipe(plugins.data(function() {
                return process.env;
            }))
            .pipe(plugins.data(function(file) {
                return JSON.parse(fs.readFileSync('./data/' + path.basename(file.path) + '.json'));
            }))
            .pipe(plugins.compileHandlebars(templateData, options))
            .pipe(plugins.rename('index.html'))
            .pipe(gulp.dest('./dist'));
    });

};
