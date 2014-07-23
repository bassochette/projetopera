$(document).ready(function(){
	//Inialisation tinymce pour les textarea wysiwyg
	tinymce.init({
		selector: "textarea.wysiwig",
		plugins: ["autoresize", "lists", "table"],

		css: "/styles/tinymce.css",
		toolbar: false,
		menubar: false,
		statusbar: false
	});
});



