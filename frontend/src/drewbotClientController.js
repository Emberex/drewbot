angular.module('em-drewbot').controller('DrewbotClientController', ['$scope', '$http', 
    function($scope, $http) {
        $scope.model = {
            lineResponse: undefined,
            customCommand: undefined
        };

        $scope.left90 = function() {
            draw("l90\n");
        };
        
        $scope.right90 = function() {
            draw("r90\n");
        };
        
        $scope.lifter90 = function() {
            draw("i90\n");
        };
        
        $scope.sendCustomCommand = function() {
            if(!endsWith($scope.model.customCommand, "\n")) {
                $scope.model.customCommand = $scope.model.customCommand+"\n";
            }
            draw($scope.model.customCommand);
        };
        
        function draw(command) {
            $http.post('/draw', {command: command}).success(function(data, status, headers, config) {
                $scope.model.lineResponse = data;
            }).error(function(data, status, headers, config) {
                $scope.model.lineResponse = data;
            });
        }
        
        $scope.ledOn = function() {
            toggleLED(true);
        };
        
        $scope.ledOff = function() {
            toggleLED(false);
        };
        
        function toggleLED(toggleOn) {
            $http.post('/led', {toggleOn: toggleOn}).success(function(data, status, headers, config) {
                $scope.model.ledResponse = data;
            }).error(function(data, status, headers, config) {
                $scope.model.ledResponse = data;
            });            
        }
        
        function endsWith(str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }
        
    }
]);