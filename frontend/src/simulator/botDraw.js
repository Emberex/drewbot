angular.module('em-drewbot').factory('botDraw', [ 
   function() {

      var instance = {};

      instance.clearOutputText = function() {
         var elem = document.getElementById("output"); // jshint ignore:line
         elem.value = "";   
         elem = document.getElementById("outputPosition"); // jshint ignore:line
         elem.value = "";
         updateCommandCount();
      };

      instance.addOutputText = function(str) {
         var elem = document.getElementById("output"); // jshint ignore:line
         elem.value = elem.value + str + '\n';
         elem.scrollTop = elem.scrollHeight;
         updateCommandCount();   
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

      instance.addOutputPositionText = function(point) {
         var elem = document.getElementById("outputPosition"); // jshint ignore:line
         elem.value = elem.value + '{ "x": ' + Math.floor(point.x) + ', "y": ' + Math.floor(point.y) + ' },\n';
         elem.scrollTop = elem.scrollHeight;
         updateCommandCount();   
      };

      instance.drawCircle = function(point, length) {
         var canvasContext = instance.getContext();
         canvasContext.beginPath();
         canvasContext.arc(point.x, point.y, length, 0, 2 * Math.PI, false);
         canvasContext.lineWidth = 1;
         canvasContext.strokeStyle = '#003300';
         canvasContext.stroke();
      };

      function getCanvasElement() {
         return document.getElementById("canvas"); // jshint ignore:line
      }      

      function drawThinLine(startPos, endPos, color) {
         drawGeneralLine(startPos, endPos, color, 1);
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

      function updateCommandCount() {
         var elem = document.getElementById("commandCount"); // jshint ignore:line
         var outputElem = document.getElementById("output"); // jshint ignore:line
         elem.innerHTML = outputElem.value.split("\n").length - 1;
      }

      return instance;
   }]
);
