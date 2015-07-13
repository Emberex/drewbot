angular.module('em-drewbot').directive('emSimulator', ['bot', 'botDraw', 'simulatorDataService',
	function(bot, botDraw, simulatorDataService) {
        return {
			scope: {},
			templateUrl: 'simulator/simulator.html',
			controller: 'SimulatorController',
			controllerAs: 'simulator',
			link: function($scope, elem, attrs) {
				var canvasElement = elem.find("#canvas");

				var mouseDown = false;
				canvasElement.mousemove(function (event) {
					bot.moveToMousePos(canvas, event, mouseDown);
                    $scope.$apply();
				});

                canvasElement.mousedown(function (event) {
                    if(!simulatorDataService.isRecording()) {
                        simulatorDataService.clearStrokesAndCommands();
                        bot.clearStrokePoints();
                        $scope.$apply();
                    }
                    mouseDown = true;
                });

	         	canvasElement.mouseup(function (event) {
					mouseDown = false;
	         	});

				bot.update();
			}
		};
	}]
);