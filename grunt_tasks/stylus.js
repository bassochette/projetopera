module.exports = {
	dev: {
		options: {
			compress : false
		},
		files: {
			'<%= config.public %>/styles/application.css': '<%= config.frontend %>/stylus/application.styl'
		}
	},
	release:{
		options: {
			compress : true
		},
		files: {
			'<%= config.public %>/styles/application.css': '<%= config.frontend %>/stylus/application.styl'
		}	
	}
};