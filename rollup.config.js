import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';

const packageJson = require( './package.json' );

export default [
	{
		input: 'src/index.js',
		output: [
			{
				file: packageJson.main,
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: packageJson.module,
				format: 'esm',
				sourcemap: true,
			},
		],
		plugins: [
			excludeDependenciesFromBundle(),
			postcss( {
				plugins: [],
				minimize: true,
			} ),
			babel( {
				exclude: 'node_modules/**',
				presets: [ '@babel/preset-react' ],
			} ),
			external(),
			commonjs(),
			resolve(),
			terser(),
		],
	},
];
