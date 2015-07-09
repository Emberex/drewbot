angular.module('em-drewbot').directive('emSimulator', ['bot', 'botDraw',
	function(bot, botDraw) {
		return {
			scope: {},
			templateUrl: 'simulator/simulator.html',
			controller: 'SimulatorController',
			controllerAs: 'simulator',
			link: function(scope, elem, attrs) {
				var canvasElement = elem.find("#canvas");

				var shouldDraw = false;
				canvasElement.mousemove(function (event) {
					bot.moveToMousePos(canvas, event, shouldDraw);
				});

	         	canvasElement.mousedown(function (event) {
		            botDraw.clearOutputText();
		            bot.clearStrokePoints();
					shouldDraw = true;
         		});

	         	canvasElement.mouseup(function (event) {
					shouldDraw = false;
	         	});

				bot.update();
			}
		};
	}]
);