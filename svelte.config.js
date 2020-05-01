const autoProcess = require('svelte-preprocess');

module.exports = {
    preprocess: autoProcess({
        scss: {
            includePaths: ['node_modules', 'src/scss']
        }
    })
};