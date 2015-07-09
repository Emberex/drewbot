angular.module('em-drewbot').controller('SimulatorController', ['$scope', '$http', 'bot', 'simulatorDataService', '$timeout',
    function($scope, $http, bot, simulatorDataService, $timeout) {

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

        $scope.playback = function() {
            $timeout(function() {
                bot.playback();
            });
        };

        $scope.messageKeypress = function(event) {
           if (event.keyCode == 13) {
              $scope.doMessage();
           }
        };

        $scope.doMessage = function() {
            $timeout(function() {
                bot.doMessage();
            });
        };

        $scope.whatTimeIsIt = function() {
            $timeout(function() {
                bot.whatTimeIsIt();
            });
        };
    }
]);