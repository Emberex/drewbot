/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/underscore/underscore.d.ts"/>
angular.module('em-drewbot').factory('sanitizationService', [
    function() {

        var instance = {};

        instance.removeDuplicateStrokes = function(strokes) {
            var sanitizedStrokes = [];
            var lastStroke;
            _.each(strokes, function(stroke, index) {

                if(!angular.equals(lastStroke, stroke)) {
                    sanitizedStrokes.push(stroke);
                }
                lastStroke = stroke;
            });
            console.log("strokes: ", strokes);
            console.log("sanitizedStrokes: ", sanitizedStrokes);
        };

        instance.removeExtraUpStokes = function(strokes) {

        };

        return instance;
    }]
);