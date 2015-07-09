angular.module('em-drewbot').factory('simulatorDataService', [
    function() {

        var instance = {};
        var simulatorModel = {
            strokes: "",
            commands: "",
            response: "",
            recording: false
        };

        instance.getSimulatorModel = function() {
            return simulatorModel;
        };

        instance.clearModel = function() {
            simulatorModel = {
                strokes: "",
                commands: "",
                response: "",
                recording: false
            };
        };

        return instance;
    }]
);