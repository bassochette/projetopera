module.exports = {
	vendors: {
		files: [
			{expand: true, cwd: '<%= config.bower %>/bootstrap/dist/fonts/', src: ['**'], dest: '<%= config.public %>/fonts/'},
			{src: '<%= config.bower %>/bootstrap/dist/css/bootstrap.css', dest: '<%= config.public %>/styles/bootstrap.css'},
			{src: '<%= config.bower %>/bootstrap/dist/js/bootstrap.js', dest: '<%= config.public %>/scripts/vendors/bootstrap.js'},
			{src: '<%= config.bower %>/jquery/jquery.js', dest: '<%= config.public %>/scripts/vendors/jquery.js'},
			{src: '<%= config.bower %>/animate.css/animate.css', dest: '<%= config.public %>/styles/animate.css'},
			{src: '<%= config.assets %>/stylus/bs-editable.css', dest: '<%= config.public %>/styles/bs-editable.css'},
			{src: '<%= config.bower %>/pickadate/lib/picker.js', dest: '<%= config.public %>/scripts/pickadate/picker.js' },
			{src: '<%= config.bower %>/pickadate/lib/picker.date.js', dest: '<%= config.public %>/scripts/pickadate/picker.date.js' },
			{src: '<%= config.bower %>/pickadate/lib/themes/default.css', dest: '<%= config.public %>/styles/pickadate.css'},
			{src: '<%= config.bower %>/pickadate/lib/themes/default.date.css', dest: '<%= config.public %>/styles/pickadate.date.css'},
			{src: '<%= config.bower %>/moment/min/moment-with-locales.min.js', dest: '<%= config.public %>/scripts/moment.js'},
			{src: '<%= config.bower %>/jquery-file-upload/css/jquery.fileupload.css', dest: '<%= config.public%>/styles/jquery.fileupload.css'},
			{src: '<%= config.bower %>/jquery-file-upload/js/vendor/jquery.ui.widget.js', dest: '<%=config.public %>/scripts/vendors/jquery.ui.widget.js'},
			{src: '<%= config.bower %>/jquery-file-upload/js/jquery.iframe-transport.js', dest: '<%= config.public %>/scripts/jquery-file-upload/jquery.iframe-transport.js'},
			{src: '<%= config.bower %>/jquery-file-upload/js/jquery.fileupload.js', dest: '<%= config.public %>/scripts/jquery-file-upload/jquery.fileupload.js'},
			{src: '<%= config.bower %>/DataTables/media/js/jquery.dataTables.js', dest: '<%= config.public %>/scripts/jquery.dataTables.js'},
			{src: '<%= config.bower %>/DataTables/media/css/jquery.dataTables.css', dest: '<%= config.public %>/styles/jquery.dataTables.css'},
			{src: '<%= config.bower %>/angular/angular.js', dest: '<%= config.public %>/scripts/angular.js'},
			{src: '<%= config.bower %>/angular-route/angular-route.js', dest: '<%= config.public %>/scripts/angular-route.js'},
			{src: '<%= config.bower %>/angular-route/angular-route.min.js.map', dest: '<%= config.public %>/scripts/angular-route.min.js.map'},
			{src: '<%= config.bower %>/angular/angular.min.js.map', dest: '<%= config.public %>/scripts/angular.min.js.map'}


		]
	},
	release:{
		files: [
			{expand: true, cwd: '<%= config.bower %>/bootstrap/dist/fonts/', src: ['**'], dest: '<%= config.public %>/fonts/'},
			{src: '<%= config.bower %>/bootstrap/dist/css/bootstrap.min.css', dest: '<%= config.public %>/styles/bootstrap.css'},
			{src: '<%= config.bower %>/bootstrap/dist/js/bootstrap.min.js', dest: '<%= config.public %>/scripts/vendors/bootstrap.js'},
			{src: '<%= config.bower %>/jquery/jquery.min.js', dest: '<%= config.public %>/scripts/vendors/jquery.js'},
			{src: '<%= config.bower %>/animate.css/animate.css', dest: '<%= config.public %>/styles/animate.css'},
			{src: '<%= config.assets %>/stylus/bs-editable.css', dest: '<%= config.public %>/styles/bs-editable.css'},
			{src: '<%= config.bower %>/pickadate/lib/compressed/picker.js', dest: '<%= config.public %>/scripts/pickadate/picker.js' },
			{src: '<%= config.bower %>/pickadate/lib/compressed/picker.date.js', dest: '<%= config.public %>/scripts/pickadate/picker.date.js' },
			{src: '<%= config.bower %>/pickadate/lib/compressed/themes/default.css', dest: '<%= config.public %>/styles/classic.css'},
			{src: '<%= config.bower %>/pickadate/lib/compressed/themes/default.date.css', dest: '<%= config.public %>/styles/classic.date.css'},
			{expand: true, cwd: '<%= config.assets %>/scripts/', src: ['**'], dest: '<%= config.public %>/scripts/'},
			{expand: true, cwd: '<%= config.assets %>/images/', src: ['**'], dest: '<%= config.public %>/images/'}
		]
	},
	scripts:{
		files:[
			// assets scripts
	  		{expand: true, cwd: '<%= config.frontend %>/scripts/', src: ['**'], dest: '<%= config.public %>/scripts/'}
		]
	},
	html:{
		files: [
			{expand: true, cwd:'<%= config.frontend %>/html/', src:['**'], dest: '<%= config.public %>/html/'},
            {src: '<%= config.frontend %>/index.html', dest: '<%=config.public %>/index.html'}
		]
	},
	images:{
		files:[
			// assets images
	  		{expand: true, cwd: '<%= config.frontend %>/images/', src: ['**'], dest: '<%= config.public %>/images/'},
	  		{expand: true, cwd: '<%= config.bower %>/img/', src: ['**'], dest: '<%= config.public %>/images/'},
	  		{expand: true, cwd: '<%= config.bower %>/DataTables/media/images/', src: ['**'], dest:'<%=config.public %>/images/'}
		]
	},
	fonts: {
		files:[
			{expand: true, cwd: '<%=config.frontend %>/fonts/', src: ['**'], dest: '<%= config.public %>/fonts/'}
		]
	}
}