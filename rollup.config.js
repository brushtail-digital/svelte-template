import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';

const options = require('./svelte.config');
const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.ts',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js'
    },
    plugins: [
        typescript(),
        
        svelte({
            // enable run-time checks when not in production
            dev: !production,
            emitCss: true,
            ...options
        }),

		postcss({
            extract: 'bundle.css',
            sourceMap: true,
            plugins: [
                production && postcssPresetEnv()
            ]
        }),

        alias({
			resolve: ['.js', '.svelte', '.scss'],
			entries: [
				{
					find: /^~\/(.*)$/,
					replacement: __dirname + '/src/$1'
				}
			]
		}),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte']
        }),
        commonjs(),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // Transpile with babel for production
        production && babel({
            extensions: ['.js', '.es6', '.es', '.mjs', '.ts', '.svelte'],
            include: [
				'src/**', 
				'node_modules/svelte/**', 
				'node_modules/@sveltejs/**'
			],
            babelHelpers: 'bundled'
        }),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(),
    ],
    watch: {
        clearScreen: false
    }
};

function serve() {
    let started = false;

    return {
        writeBundle() {
            if (!started) {
                started = true;

                require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                    stdio: ['ignore', 'inherit', 'inherit'],
                    shell: true
                });
            }
        }
    };
}
