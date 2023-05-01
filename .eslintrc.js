module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: 'airbnb',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'always',
            },
        ],
    },
};
