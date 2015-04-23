angular.module('em-drewbot').controller('DrewbotClientController', ['$scope', '$http', 
    function($scope, $http) {
        $scope.model = {
            message: "",
            responses: []
        };

        $scope.sendMessage = function() {
            $http.post('/write', {msg:$scope.model.message}).success(function(data, status, headers, config) {
                $scope.model.responses.push(data);
            }).error(function(data, status, headers, config) {
                $scope.model.responses.push(data);
            });
        };
    }
]);