/** @format */

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ignores: [
      '**/node_modules/**',
      '**/eslint.config.*',
      '**/babel.config.*',
      '**/webpack.config.*',
      '**/jest.config.*',
      '**/tsconfig.*',
      '**/jsconfig.*',
      '**/package.json',
      '**/yarn.lock',
    ],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
