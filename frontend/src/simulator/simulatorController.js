angular.module('em-drewbot').controller('SimulatorController', ['$scope', '$http', 
    function($scope, $http) {
        
        $scope.simulator = {
            character: undefined,
            response: undefined
        };
        
        $scope.writeCharacter = function() {
            var characterElem = document.getElementById("output");
            var characterArray = characterElem.value.trim().split("\n");
            characterArray.splice(0, 1);
            characterArray.splice(characterArray.length - 1, 1);
            
            console.log("writeCharacter: ", characterArray);
        
            $http.post('/writeCharacter', {commands: characterArray}).success(function(data, status, headers, config) {
                $scope.simulator.response = data;
            }).error(function(data, status, headers, config) {
                $scope.simulator.response = data;
            });
        };
        
    }
]);