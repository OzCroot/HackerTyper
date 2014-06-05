var HT = (function($){
	var _private = {};

	// Return a random number between 1-6.
	_private.codeRange = function(){
		return Math.floor(Math.random() * 6) + 1;
	};

	//
	_private.getCodeFragment = function(range){
		// Select our string fragment.
		var string = _private.codeSample.substr(_private.codeIndex, range),
			rtn = new RegExp("\n", "g"),
			rts = new RegExp("\\s", "g"),
			rtt = new RegExp("\\t", "g");

		// Update index with used range.
		_private.codeIndex += range;

		// Return replaced string.
		return string.replace(rtn, "<br/>").replace(rtt, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(rts, "&nbsp;");
	};

	// Public interface.
	return {
		// Async fetch code text file. Return deferred ajax request.
		fetchCodeSample: function(target){
			return $.get(target, function(result){
				_private.codeSample = result;
			});
		},

		// Return a string block to be injected into the dom.
		getNextCodeFragment: function(){
			_private.codeIndex = _private.codeIndex || 0;
			return _private.getCodeFragment(_private.codeRange());
		},

		// Return fetched code text.
		getCodeSample: function(){
			return _private.codeSample;
		}
	}
})(jQuery);