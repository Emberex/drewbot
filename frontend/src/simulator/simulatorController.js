angular.module('em-drewbot').controller('SimulatorController', ['$scope', '$http', 'bot', 'simulatorDataService',
    function($scope, $http, bot, simulatorDataService) {

        $scope.simulatorModel = simulatorDataService.getSimulatorModel();

        $scope.getCommandCount = function() {
            return $scope.simulatorModel.commands.split("\n").length - 1;
        };

        $scope.sendCommands = function() {
            var commandsArray = $scope.simulatorModel.commands.trim().split("\n");

            console.log("commands: ", commandsArray);

            $http.post('/commands', {commands: commandsArray}).success(function(data, status, headers, config) {
                $scope.simulatorModel.response = data;
            }).error(function(data, status, headers, config) {
                $scope.simulatorModel.response = data;
            });
        };

        $scope.clearCommands = function() {
            $scope.simulatorModel.commands = "";
        };

        $scope.sendStrokes = function() {
            console.log("$scope.simulatorModel.strokes: ", $scope.simulatorModel.strokes);

            // $http.post('/drawStrokes', {strokes: handFont["1"]}).success(function(data, status, headers, config) {
            //     self.model.commandResponse = data;
            // }).error(function(data, status, headers, config) {
            //     self.model.commandResponse = data;
            // });
        };

        $scope.clearStrokes = function() {
            $scope.simulatorModel.strokes = "";
        };

        $scope.recordingClicked = function() {
            if($scope.simulatorModel.isRecording) {
                simulatorDataService.clearStrokesAndCommands();
                bot.clearStrokePoints();
            }
        };

        $scope.playback = function() {
            bot.playback();
        };

        $scope.messageKeypress = function(event) {
           if (event.keyCode == 13) {
              $scope.doMessage();
           }
        };

        $scope.doMessage = function() {
            bot.doMessage();
        };

        $scope.whatTimeIsIt = function() {
            bot.whatTimeIsIt();
        };
    }
]);