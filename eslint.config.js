import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {ignores: ['dist']},
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.node,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                {argsIgnorePattern: '^_'},
            ],
        },
    },
    {
        files: ['**/*.cjs'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
                module: 'readonly',
                exports: 'readonly',
                require: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                console: 'readonly',
            },
        },
        rules: {
            '@typescript-eslint/no-var-requires': 'off',
            'no-undef': 'off',
        },
    },
    {
        files: ['migrations/**/*.js', 'seeders/**/*.js'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
                module: 'readonly',
                exports: 'readonly',
                require: 'readonly',
            },
        },
        rules: {
            '@typescript-eslint/no-var-requires': 'off',
            'no-undef': 'off',
        },
    },
);
