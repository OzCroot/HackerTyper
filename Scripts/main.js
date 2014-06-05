$(document).ready(function(){
	var $main = $("#main");

	// Application is ready.
	HT.fetchCodeSample("content/data/code.txt").done(function(){
		$(document).on("keydown", function(e){
			e.preventDefault();
			$main.html($main.html() + HT.getNextCodeFragment());
			window.scrollTo(0,document.body.scrollHeight);
		});
	});
});