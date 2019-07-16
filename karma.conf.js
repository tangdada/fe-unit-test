'use strict';

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      './node_modules/should/should.js',
      'src/**/*.js',
      'test/**/*.js'
    ],
    preprocessors: {
      'src/**/*.js': ["webpack", 'coverage'],
      'test/**/*.js': ["webpack", 'coverage']
    },
    plugins: ["karma-webpack", 'karma-should', 'karma-mocha', 'karma-phantomjs-launcher', 'karma-chrome-launcher', 'karma-firefox-launcher', 'karma-coverage', 'karma-spec-reporter'],
    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: 'babel-loader'
              },
            ]
          },
        ]
      }
    },
    browsers: ['PhantomJS', 'Firefox', 'Chrome'],
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [{
        type: 'json',
        subdir: '.',
        file: 'coverage.json',
      }, {
        type: 'lcov',
        subdir: '.'
      }, {
        type: 'text-summary'
      }]
    }
  });
};