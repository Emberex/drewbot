angular.module('em-drewbot').controller('SimulatorController', ['$scope', '$http', 'bot',
    function($scope, $http, bot) {

        $scope.simulator = {
            character: undefined,
            response: undefined
        };

        $scope.sendCommands = function() {
            var characterElem = document.getElementById("output");
            var characterArray = characterElem.value.trim().split("\n");

            console.log("writeCharacter: ", characterArray);

            $http.post('/commands', {commands: characterArray}).success(function(data, status, headers, config) {
                $scope.simulator.response = data;
            }).error(function(data, status, headers, config) {
                $scope.simulator.response = data;
            });
        };

        $scope.playback = function() {
            bot.playback();
        };

        $scope.messageKeypress = function(event) {
           if (event.keyCode == 13) {
              bot.doMessage();
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