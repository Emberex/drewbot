/* global botChar1 */
/* global botChar2 */
/* global Angle */
/* global Arm */
/* global addOutputPositionText */
/* global Point */

angular.module('em-drewbot').factory('bot', ['botEngine', 'simulatorConstants', 'botDraw', 'botDigitalClock', 'botCharGenerator',
   function(botEngine, simulatorConstants, botDraw, botDigitalClock, botCharGenerator) {

      var instance = {};

      var globalLeftAngle = new Angle(125, true);
      var globalRightAngle = new Angle(75, true);

      var backgroundImg = new Image();
      backgroundImg.src = "/images/paper.jpg";

      var strokePoints = [];

      var playbackStrokes = [];
      var playbackIndex;

      instance.moveToMousePos = function moveToMousePos(canvas, evt, draw) {
         var rect = canvas.getBoundingClientRect();
         var stroke = new Stroke(
            evt.clientX - rect.left,
            evt.clientY - rect.top,
            draw);
         moveToPos(stroke);
      };

      instance.clearStrokePoints = function() {
         strokePoints = [];
      };

      instance.update = function() {

         botDraw.clearCanvas();

         var leftBaseArm = getLeftBaseArm(globalLeftAngle);
         var rightBaseArm = getRightBaseArm(globalRightAngle);

         draw(leftBaseArm, rightBaseArm);
      };

      function moveToPos(stroke) {
         var tempLeftAngle = botEngine.determineBaseAngleFromPosition(stroke.point, getLeftBaseArm(globalLeftAngle), true);
         var tempRightAngle = botEngine.determineBaseAngleFromPosition(stroke.point, getRightBaseArm(globalRightAngle), false);
         if (stroke.draw) {
            // Only draw the point if it's within drawing distance of the bases,
            // TODO and it doesn't cause the arms to buckle inward
            if (!isNaN(tempLeftAngle.degrees) && !isNaN(tempRightAngle.degrees)) {
               updatePosition(stroke.point);
               strokePoints.push(stroke);
               botDraw.drawCircle(stroke.point, 15);
            } else {
               instance.update();
            }
         } else {
            instance.update();
         }
         botDraw.addTextAtPosition("  (" + stroke.point.x + "," + stroke.point.y + ")", stroke.point);
      }

      function updatePosition(positionPoint) {

         var xPos = positionPoint.x;
         var yPos = positionPoint.y;

         if (isNaN(xPos) || isNaN(yPos)) {
            return;
         }

         globalLeftAngle = botEngine.determineBaseAngleFromPosition(positionPoint, getLeftBaseArm(globalLeftAngle), true);
         globalRightAngle = botEngine.determineBaseAngleFromPosition(positionPoint, getRightBaseArm(globalRightAngle), false);

         addOutputAngleText(globalLeftAngle, globalRightAngle);
         botDraw.addOutputPositionText(positionPoint);

         instance.update();
      }

      function addOutputAngleText(leftAngle, rightAngle) {
         botDraw.addOutputText("L" + (180 - Math.floor(leftAngle.degrees)));
         botDraw.addOutputText("R" + (180 - Math.floor(rightAngle.degrees)));
      }

      function servoEndPoint(arm) {

         var x = Math.cos(arm.angle.radians) * arm.length + arm.point.x;
         var y = Math.sin(arm.angle.radians) * arm.length + arm.point.y;

         return new Point(x, y);
      }

      function positionOfConnection(point1, p1Length, point2, p2Length) {

         var intersectionPoints = botEngine.circleIntersectionPoints(point1, p1Length, point2, p2Length);
         var connectionPoint;

         // Use max y - it should never buckle down

         if (intersectionPoints[1].y > intersectionPoints[0].y) {
            connectionPoint = intersectionPoints[1];
         } else {
            connectionPoint = intersectionPoints[0];
         }

         return connectionPoint;
      }

      function draw(baseLeft, baseRight) {

         // Add background image to canvas
         botDraw.getContext().drawImage(backgroundImg, 0, -120);

         // Add box for char size
         botDraw.drawCharOutline({ "x": baseLeft.point.x, "y": simulatorConstants.ARMLENGTH * 0.9 }, simulatorConstants.ARMLENGTH * 0.5, simulatorConstants.ARMLENGTH * 0.5);

         var leftEndPoint = servoEndPoint(baseLeft);
         var rightEndPoint = servoEndPoint(baseRight);

         // Draw the base arms
         botDraw.drawLine(baseLeft.point, leftEndPoint, "#111111");
         botDraw.drawLine(baseRight.point, rightEndPoint, "#00ff00");

         // Determine where connection, and draw top arms.
         var connectionPoint = positionOfConnection(leftEndPoint, baseLeft.length, rightEndPoint, baseRight.length);

         botDraw.drawLine(leftEndPoint, connectionPoint, "#0000ff");
         botDraw.drawLine(rightEndPoint, connectionPoint, "#ff0000");

         // If we're in drawing mode, draw the current set of points
         botDraw.applyStrokes(strokePoints);

         // Add some text to help with debugging
         botDraw.addTextAtPosition("  (" + Math.floor(connectionPoint.x) + "," + Math.floor(connectionPoint.y) + ")", connectionPoint);
         botDraw.addTextAtPosition("  Left(" + Math.floor(baseLeft.angle.degrees) + "\u00B0)", baseLeft.point);
         botDraw.addTextAtPosition("  Right(" + Math.floor(baseRight.angle.degrees) + "\u00B0)", baseRight.point);
      }

      function getLeftBaseArm(angle) {
         var arm = new Arm(simulatorConstants.ARMLENGTH * 2, 0, angle, simulatorConstants.ARMLENGTH);
         return arm;
      }

      function getRightBaseArm(angle) {
         var arm = new Arm(simulatorConstants.ARMLENGTH * 2.25, 0, angle, simulatorConstants.ARMLENGTH);
         return arm;
      }

      function onePlaybackStep() {

         var stroke = playbackStrokes[playbackIndex++];
         strokePoints.push(stroke);

         // Remove repeated points.
      //   if (playbackIndex > 0 && playbackStrokes[playbackIndex].x == playbackStrokes[playbackIndex].x && playbackStrokes[playbackIndex].x == playbackStrokes[playbackIndex].x) {
      //      if (playbackIndex < playbackStrokes.length) {
      //         setTimeout(onePlaybackStep, 30);
      //      }
      //   }

         //debugger; //jshint ignore:line
         globalLeftAngle = botEngine.determineBaseAngleFromPosition(stroke.point, getLeftBaseArm(globalLeftAngle), true);
         globalRightAngle = botEngine.determineBaseAngleFromPosition(stroke.point, getRightBaseArm(globalRightAngle), false);

         var leftBaseArm = getLeftBaseArm(globalLeftAngle);
         var rightBaseArm = getRightBaseArm(globalRightAngle);

         var leftEndPoint = servoEndPoint(leftBaseArm);
         var rightEndPoint = servoEndPoint(rightBaseArm);

         botDraw.clearCanvas();

         // Draw the base arms
         botDraw.drawLine(leftBaseArm.point, leftEndPoint, "#111111");
         botDraw.drawLine(rightBaseArm.point, rightEndPoint, "#00ff00");

         // Determine where connection, and draw top arms.
         var connectionPoint = positionOfConnection(leftEndPoint, leftBaseArm.length, rightEndPoint, rightBaseArm.length);

         botDraw.drawLine(leftEndPoint, connectionPoint, "#0000ff");
         botDraw.drawLine(rightEndPoint, connectionPoint, "#ff0000");

         botDraw.addTextAtPosition("  (" + Math.floor(connectionPoint.x) + "," + Math.floor(connectionPoint.y) + ")", stroke.point);

         if(stroke.draw) {
            botDraw.addOutputText("i102");
         } else {
            botDraw.addOutputText("i90");
         }

         addOutputAngleText(globalLeftAngle, globalRightAngle);

         botDraw.applyStrokes(strokePoints);

         if (playbackIndex < playbackStrokes.length) {
            setTimeout(onePlaybackStep, 100); // jshint ignore:line
         }
      }

      instance.playback = function() {

         var json = '{ "data": [' + document.getElementById("outputPosition").value + "0]}";
         var points = JSON.parse(json);

         for (var i = 0; i<points.data.length;i++) {
            playbackStrokes.push( new Stroke(points.data[i].x, points.data[i].y, true));
         }

         strokePoints = [];
         playbackIndex = 0;

         onePlaybackStep();
      };

      instance.whatTimeIsIt = function() {

         playbackStrokes = botDigitalClock.getTimeAsStrokes();
         strokePoints = []; // reset
         playbackStrokes.push(new Stroke(310,190,false));
         playbackIndex = 0;
         
         onePlaybackStep();
      };

      instance.doMessage = function() {

         playbackStrokes = botCharGenerator.convertToStrokes(document.getElementById("message").value);
         strokePoints = []; // reset
         playbackStrokes.push( new Stroke(310,190,false));
         playbackIndex = 0;

         onePlaybackStep();
      };

      return instance;

   }]
);