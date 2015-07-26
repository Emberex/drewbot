/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/underscore/underscore.d.ts"/>
angular.module('em-drewbot').factory('sanitizationService', ['bot', 'botEngine', 
    function(bot, botEngine) {
        
        var globalLeftAngle = new Angle(125, true);
        var globalRightAngle = new Angle(75, true);

        var instance = {};
        
        instance.removeDuplicateStrokes = function(strokes) {
            var sanitizedStrokes = [];
            var lastStrokeCommands;
            _.each(strokes, function(stroke, index) {
                var strokeCommands = getStrokeCommands(stroke);
                if(!angular.equals(lastStrokeCommands, strokeCommands)) {
                    sanitizedStrokes.push(stroke);
                }
                lastStrokeCommands = angular.copy(strokeCommands);
            });
            return sanitizedStrokes;
        };
        
        function getStrokeCommands(stroke) {
            globalLeftAngle = botEngine.determineBaseAngleFromPosition(stroke, bot.getLeftBaseArm(globalLeftAngle), true);
            globalRightAngle = botEngine.determineBaseAngleFromPosition(stroke, bot.getRightBaseArm(globalRightAngle), false);
        
            var commands = {};            
            if(stroke.draw) {
                commands.i = "i102"; //down
            } else {
                commands.i = "i90"; //up
            }
            commands.l = "l" + (180 - Math.floor(globalLeftAngle.degrees));
            commands.r = "r" + (180 - Math.floor(globalRightAngle.degrees));
            return commands;
        } 

        instance.removeExtraUpStokes = function(strokes) {
            var sanitizedStrokes = [];
            _.each(strokes, function(stroke, index) {
                var lastStroke = getLastStroke(strokes, index);
                var nextStroke = getNextStroke(strokes, index);
                if(lastStroke && lastStroke.draw === false && stroke.draw === false && nextStroke && nextStroke.draw === false) {
                    //do nothing
                } else {
                    sanitizedStrokes.push(stroke);
                }
            });
            return sanitizedStrokes;
        };
        
        function getLastStroke(strokes, currentIndex) {
            if(currentIndex === 0) {
                return null;
            } else {
                return strokes[currentIndex-1];
            }
        }
        
        function getNextStroke(strokes, currentIndex) {
            if(currentIndex === strokes.length-1) {
                return null;
            } else {
                return strokes[currentIndex+1];
            }
        }

        return instance;
    }]
);