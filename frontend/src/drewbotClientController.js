angular.module('em-drewbot').controller('DrewbotClientController', ['$scope', '$http', 
	function($scope, $http) {
		
		$http.post('/write', {msg:'hello word!'}).success(function(data, status, headers, config) {
			$scope.postResponse = data;
		}).error(function(data, status, headers, config) {
			$scope.postResponse = data;
		});
	
	}
]);