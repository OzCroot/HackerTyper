var HT = (function(){
	var module = {},
		_private = {};

	/*
	* Private interface
	* */

	_private.codeText = "";
	_private.stringCharacterIndex = 0;


	/*
	* Public interface
	* */

	// Pull in the text file and execute a designated callback.
	module.fetchCodeText = function(url, callback){
		return $.get(url, function(result){
			_private.codeText = result;
			if ($.isFunction(callback)) callback();
		});
	};

 	return module;
})();