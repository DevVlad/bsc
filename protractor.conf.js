exports.config = {
    specs: ['./src/**/*.spec.js',],
    capabilities: {
        browserName: 'chrome'
    },
    baseUrl: 'http://localhost:3000',
    framework: 'jasmine'
};