angular.module('em-drewbot').controller('DrewbotClientController', ['$scope', '$http', 
    function($scope, $http) {
        $scope.model = {
            commandResponse: "",
            customCommand: ""
        };

        $scope.left90 = function() {
            sendCommand("l90\n");
        };
        
        $scope.right90 = function() {
            sendCommand("r90\n");
        };
        
        $scope.lifter90 = function() {
            sendCommand("i90\n");
        };
        
        $scope.sendCustomCommand = function() {
            if(!endsWith($scope.model.customCommand, "\n")) {
                $scope.model.customCommand = $scope.model.customCommand+"\n";
            }
            sendCommand($scope.model.customCommand);
        };
        
        $scope.connectArduino = function() {
            $http.post('/connectArduino').success(function(data, status, headers, config) {
                $scope.model.commandResponse = data;
            }).error(function(data, status, headers, config) {
                $scope.model.commandResponse = data;
            });
        };
        
        $scope.sendStrokes = function() {
            $http.post('/drawStrokes', {strokes: handFont["1"]}).success(function(data, status, headers, config) {
                $scope.model.commandResponse = data;
            }).error(function(data, status, headers, config) {
                $scope.model.commandResponse = data;
            });
        };
        
        function sendCommand(command) {
            $http.post('/command', {command: command}).success(function(data, status, headers, config) {
                $scope.model.commandResponse = data;
            }).error(function(data, status, headers, config) {
                $scope.model.commandResponse = data;
            });
        }
        
        function endsWith(str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }
        
    }
]);