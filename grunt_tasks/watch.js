module.exports = {
	styles: {
    	files: ['frontend/**/*.styl'],
    	tasks: ['stylus:dev']
  	},
	scripts: {
		files: ['frontend/**/*.js'],
		tasks: ['copy:scripts']
	},
    assets:{
        files: ['frontend/images/**/*'],
        tasks: ['copy:images']
    },
    html: {
        files: ['frontend/**/*.html'],
        tasks: ['copy:html']
    }
};