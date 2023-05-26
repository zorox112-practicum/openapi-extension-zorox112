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
    target: '',
    outfile: 'plugin/index.js',
});

esbuild.build({
    tsconfig: './tsconfig.json',
    platform: 'browser',
    bundle: true,
    sourcemap: true,
    entryPoints: ['src/runtime/index.tsx'],
    outfile: 'runtime/index.js',
    external: external,
    plugins: [sassPlugin()],
});

esbuild.build({
    tsconfig: './tsconfig.json',
    platform: 'node',
    sourcemap: true,
    entryPoints: ['src/includer/index.ts'],
    outfile: 'includer/index.js',
});
