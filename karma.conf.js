module.exports = function (config) {
    'use strict';
    config.set({
        basePath: '.',
        files: [
            'someFile.js',
            'someFile.spec.js'
        ],
        reporters: ['progress', 'brackets'],
        frameworks: ['jasmine'],
        port: 9876,
        runnerPort: 9100,
        colors: true,
        autoWatch: true,
        browsers: ['Chrome', 'PhantomJS'],
        captureTimeout: 60000,
        singleRun: false
    });
};
