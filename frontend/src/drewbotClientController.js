angular.module('em-drewbot').controller('DrewbotClientController', ['$scope', '$http', 
    function($scope, $http) {
        $scope.model = {
            response: undefined
        };

        $scope.sendMessage = function() {
            $http.post('/line').success(function(data, status, headers, config) {
                $scope.model.response = data;
            }).error(function(data, status, headers, config) {
                $scope.model.response = data;
            });
        };
    }
]);