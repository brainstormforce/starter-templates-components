const path = require('path');
module.exports = {
    mode: 'production',
    entry: [
        './src/index.js',
        './src/tailwind.css',
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.scss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
            },
        ],
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'build/index.html'),
        },
        compress: true,
        port: 9000,
    },
};