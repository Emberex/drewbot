angular.module('em-drewbot').controller('DrewbotClientController', ['$scope', '$http', 
    function($scope, $http) {
        $scope.model = {
            lineResponse: undefined
        };

        $scope.drawLine = function() {
            $http.post('/line').success(function(data, status, headers, config) {
                $scope.model.lineResponse = data;
            }).error(function(data, status, headers, config) {
                $scope.model.lineResponse = data;
            });
        };
        
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
        
    }
]);