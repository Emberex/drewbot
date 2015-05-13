angular.module('em-drewbot').directive('emSimulator', ['bot', 'botDraw',
	function(bot, botDraw) {
		return {
			scope: {},
			templateUrl: 'simulator/simulator.html',
			controller: 'SimulatorController',
			controllerAs: 'simulator',
			link: function(scope, elem, attrs) {
				var canvasElement = elem.find("#canvas");

				canvasElement.bind('mousemove', function (event) {
					bot.moveToMousePos(canvas, event);
				});

	         	canvasElement.bind('mousedown', function (event) {
		            botDraw.clearOutputText();
		            botDraw.addOutputText("PenDown");
		            bot.clearStrokePoints();
         		});

	         	canvasElement.bind('mouseup', function (event) {
	            	botDraw.addOutputText("PenUp");
	         	});
				
				bot.update();
			}
		};
	}]
);