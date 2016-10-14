var appRoot = 'src/';
var outputRoot = 'dist/';
var exporSrvtRoot = 'export/'

module.exports = {
	root: appRoot,
	source: appRoot + '**/*.ts',
	html: appRoot + '**/*.html',
	sass: 'src/*.scss',
	sample: 'sample',
	
	output: outputRoot,
	dtsSrc: [
		'typings/**/*.ts',
		'./jspm_packages/**/*.d.ts'
	]
}