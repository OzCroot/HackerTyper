var HackerTyper = (function(){
	var instance;

	var init = function() {
		// Private methods and variables
		var loading = false;
		var privateMethod = function(){
			console.log("I am private");
		}
		var privateVariable = "Im also private";
		var privateRandomNumber = Math.random();

		// Public methods and variables
		return {
			publicMethod: function () {
				console.log( "The public can see me!" );
			},
			publicProperty: "I am also public",
			getRandomNumber: function() {
				return privateRandomNumber;
			}
		};
	};
	
	return {
		getInstance: function () {
			if (!instance) {
				instance = init();
			}
			return instance;
		}
	};
})();