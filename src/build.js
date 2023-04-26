// build.js
// to build use: node build.js
const esbuild = require('esbuild');

esbuild
    .build({
        entryPoints: ['index.mjs'],
        outfile: 'bundle.js',
        bundle: true,
        format: 'iife',
        minify: true, // Set to true if you want to minify the output
        logLevel: 'info', // Set to 'silent' to disable logging
    })
    .catch(() => process.exit(1));