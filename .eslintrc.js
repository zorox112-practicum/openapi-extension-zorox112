module.exports = {
    extends: ['@diplodoc/eslint-config', '@diplodoc/eslint-config/prettier'],
    root: true,
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                sourceType: 'module',
                project: ['./tsconfig.test.json', './tsconfig.json'],
                tsconfigRootDir: __dirname,
            },
        },
    ],
};
