const esbuild = require('esbuild');
const {sassPlugin} = require('esbuild-sass-plugin');
const external = Object.keys(require('../package.json').peerDependencies || {});

esbuild.build({
    tsconfig: './tsconfig.json',
    packages: 'external',
    platform: 'node',
    bundle: true,
    sourcemap: true,
    entryPoints: ['src/plugin/index.ts'],
    outfile: 'plugin/index.js',
});

esbuild.build({
    tsconfig: './tsconfig.json',
    platform: 'browser',
    bundle: true,
    sourcemap: true,
    entryPoints: ['src/plugin/public/index.tsx'],
    outfile: 'plugin/public/index.js',
    external: external,
    plugins: [sassPlugin()]
});