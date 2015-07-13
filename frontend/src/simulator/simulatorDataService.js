angular.module('em-drewbot').factory('simulatorDataService', [
    function() {

        var instance = {};
        var simulatorModel = {
            strokes: "",
            commands: "",
            response: "",
            isRecording: false
        };

        instance.getSimulatorModel = function() {
            return simulatorModel;
        };

        instance.isRecording = function() {
            return simulatorModel.isRecording;
        };

        instance.clearModel = function() {
            simulatorModel.strokes = "";
            simulatorModel.commands = "";
            simulatorModel.response = "";
            simulatorModel.isRecording = false;
        };

        instance.clearStrokesAndCommands = function() {
            simulatorModel.strokes = "";
            simulatorModel.commands = "";
        };

        return instance;
    }]
);