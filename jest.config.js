const { defaults } = require('jest-config');

module.exports = {
    transform: {
        '^.+\\.svelte$': [
            'svelte-jester',
            { preprocess: true }
        ],
        '^.+\\.ts$': 'babel-jest',
    },
    moduleFileExtensions: [
        ...defaults.moduleFileExtensions,
        'ts',
        'svelte'
    ]
};
