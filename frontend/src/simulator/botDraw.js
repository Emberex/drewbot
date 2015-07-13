/// <reference path="../../../typings/angularjs/angular.d.ts"/>
angular.module('em-drewbot').factory('botDraw', ["simulatorDataService",
    function(simulatorDataService) {

        var instance = {};

        var simulatorModel = simulatorDataService.getSimulatorModel();

        instance.addOutputText = function(str) {
            simulatorModel.commands = simulatorModel.commands + str + '\n';
            var elem = document.getElementById("output");
            elem.scrollTop = elem.scrollHeight;
        };

        instance.clearCanvas = function() {
            var canvasContext = instance.getContext();
            var canvasElement = getCanvasElement();
            canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
        };

        instance.getContext = function() {
            return getCanvasElement().getContext("2d");
        };

        instance.drawCharOutline = function(basePoint, width, length) {
            var canvasContext = instance.getContext();
            canvasContext.beginPath();
            canvasContext.rect(basePoint.x, basePoint.y, width, length);
            canvasContext.lineWidth = 1;
            canvasContext.strokeStyle = '#003300';
            canvasContext.stroke();
        };

        instance.drawLine = function(startPos, endPos, color) {
            drawGeneralLine(startPos, endPos, color, 10);
        };

        instance.drawPoints = function(points) {
            if (points.length === 0) {
                return;
            }
            var canvasContext = instance.getContext();
            canvasContext.strokeStyle = "green";
            canvasContext.beginPath();
            canvasContext.moveTo(points[0].x, points[0].y);
            for (var i = 1; i < points.length; i++) {
                canvasContext.lineTo(points[i].x, points[i].y);
            }
            canvasContext.lineWidth = 10;
            canvasContext.stroke();
            canvasContext.closePath();
        };

        instance.addTextAtPosition = function(text, position) {
            var canvasContext = instance.getContext();
            canvasContext.fillStyle = '#00f';
            canvasContext.font = 'italic 10px sans-serif';
            canvasContext.textBaseline = 'top';
            canvasContext.fillText(text, position.x, position.y);
        };

        instance.addOutputPositionText = function(stroke) {
            var point = stroke.point;
            simulatorModel.strokes = simulatorModel.strokes + '{ "x": ' + Math.floor(point.x) + ', "y": ' + Math.floor(point.y) + ', "draw": ' + stroke.draw + ' },';
            var elem = document.getElementById("outputPosition");
            elem.scrollTop = elem.scrollHeight;
        };

        instance.drawCircle = function(point, length) {
            var canvasContext = instance.getContext();
            canvasContext.beginPath();
            canvasContext.arc(point.x, point.y, length, 0, 2 * Math.PI, false);
            canvasContext.lineWidth = 1;
            canvasContext.strokeStyle = '#003300';
            canvasContext.stroke();
        };

        instance.applyStrokes = function(strokes) {
            if (strokes.length === 0) {
                return;
            }
            var canvasContext = instance.getContext();
            canvasContext.strokeStyle = "green";
            canvasContext.beginPath();
            canvasContext.moveTo(strokes[0].point.x, strokes[0].point.y);
            for (var i = 1; i < strokes.length; i++) {
                if (strokes[i].draw) {
                    canvasContext.lineTo(strokes[i].point.x, strokes[i].point.y);
                } else {
                    canvasContext.moveTo(strokes[i].point.x, strokes[i].point.y);
                }
            }
            canvasContext.lineWidth = 10;
            canvasContext.stroke();
            canvasContext.closePath();
        };

        function getCanvasElement() {
            return document.getElementById("canvas");
        }

        function drawGeneralLine(startPos, endPos, color, width) {
            var canvasContext = instance.getContext();
            canvasContext.strokeStyle = color;
            canvasContext.beginPath();
            canvasContext.moveTo(startPos.x, startPos.y);
            canvasContext.lineTo(endPos.x, endPos.y);
            canvasContext.lineWidth = width;
            canvasContext.stroke();
            canvasContext.closePath();
        }

      return instance;
   }]
);