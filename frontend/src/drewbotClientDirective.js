angular.module('em-drewbot').directive('emDrewbotClient', [
	function( ) {
		return {
			scope: {},
			controller: 'DrewbotClientController',
			templateUrl: 'drewbotClient.html'				
		};
	}]
);