module.exports = {
	dev: {
		options: {
			compress : false
		},
		files: {
			'<%= config.public %>/styles/application.css': '<%= config.assets %>/stylus/application.styl'
		}
	},
	release:{
		options: {
			compress : true
		},
		files: {
			'<%= config.public %>/styles/application.css': '<%= config.assets %>/stylus/application.styl',
			'<%= config.public %>/styles/tinymce.css': '<%= config.assets %>/stylus/tinymce.styl'
		}	
	}
};