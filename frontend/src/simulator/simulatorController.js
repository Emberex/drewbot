angular.module('em-drewbot').controller('SimulatorController', ['$scope', '$http', 'bot', 'simulatorDataService', 'sanitizationService',
    function($scope, $http, bot, simulatorDataService, sanitizationService) {

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
            if(endsWith($scope.simulatorModel.strokes, ",")) {
                $scope.simulatorModel.strokes = $scope.simulatorModel.strokes.substring(0, $scope.simulatorModel.strokes.length - 1);
            }
            var JSONStrokes = JSON.parse("[" + $scope.simulatorModel.strokes + "]");

            $http.post('/drawStrokes', {strokes: JSONStrokes}).success(function(data, status, headers, config) {
                $scope.simulatorModel.response = data;
            }).error(function(data, status, headers, config) {
                $scope.simulatorModel.response = data;
            });
        };

        function endsWith(str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }

        $scope.clearStrokes = function() {
            $scope.simulatorModel.strokes = "";
        };
        
        $scope.makeFont = function() {
            if(endsWith($scope.simulatorModel.strokes, ",")) {
                $scope.simulatorModel.strokes = $scope.simulatorModel.strokes.substring(0, $scope.simulatorModel.strokes.length - 1);
            }
            var JSONStrokes = JSON.parse("[" + $scope.simulatorModel.strokes + "]");
            JSONStrokes = sanitizationService.removeDuplicateStrokes(JSONStrokes);
            JSONStrokes = sanitizationService.removeExtraUpStokes(JSONStrokes);
            $scope.simulatorModel.fontStrokes = JSON.stringify(JSONStrokes);
        };
        
        $scope.sendFont = function() {
            var JSONStrokes = JSON.parse($scope.simulatorModel.fontStrokes);
            console.log("JSONStrokes: ", JSONStrokes);
            $http.post('/drawStrokes', {strokes: JSONStrokes}).success(function(data, status, headers, config) {
                $scope.simulatorModel.response = data;
            }).error(function(data, status, headers, config) {
                $scope.simulatorModel.response = data;
            });
        };
        
        $scope.clearFont = function() {
            $scope.simulatorModel.fontStrokes = "";
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