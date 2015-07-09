angular.module('em-drewbot').directive('emDrewbotClient', [
	function( ) {
		return {
			scope: {},
			controller: 'DrewbotClientController',
            controllerAs: 'DrewbotClient',
			templateUrl: 'drewbotClient.html'
		};
	}]
);