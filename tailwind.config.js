module.exports = {
	enabled: true,
	mode: 'jit',
	purge: [
		'./dist/*.html',
		'./src/*.js',
		'./src/**/*.js',
	],
	corePlugins: {
		preflight: false,
	},
	content: [],
	theme: {
		extend: {
			zIndex: {
				100: '100',
			},
			boxShadow: {
				'customize-btn': '0px 0px 8px 1px rgba(0, 0, 0, 0.08);',
				'show-templates-btn':
					'0px -6px 8px -3px rgba(0, 0, 0, 0.05), 0px -4px 6px -2px rgba(0, 0, 0, 0.05)',
				'tooltip':
					'0px 0px 1px rgba(0, 0, 0, 0.15), 0px 4px 8px -2px rgba(0, 0, 0, 0.21)',
				'templateName': '0px 6px 8px -3px rgba(0, 0, 0, 0.05), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'typoTooltip': '0px 4px 8px -2px rgb(9 30 66 / 25%), 0px 0px 1px rgb(9 30 66 / 31%)',
			},
		},
	},
	plugins: [],
};