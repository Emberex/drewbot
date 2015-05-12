angular.module('em-drewbot').directive('emSimulator', [
	function( ) {
		return {
			scope: {},
			templateUrl: 'simulator/simulator.html',
			controller: 'SimulatorController',
			controllerAs: 'simulator',
			link: function(scope, elem, attrs) {
				initBot("canvas");
				update();
			}
		};
	}]
);