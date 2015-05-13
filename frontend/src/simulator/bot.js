/* global botChar1 */
/* global botChar2 */
/* global Angle */
/* global Arm */
/* global addOutputPositionText */
/* global Point */

angular.module('em-drewbot').factory('bot', ['botEngine', 'simulatorConstants', 'botDraw',
   function(botEngine, simulatorConstants, botDraw) {

      var instance = {};

      var globalLeftAngle = new Angle(125, true);
      var globalRightAngle = new Angle(75, true);

      var backgroundImg = new Image();
      backgroundImg.src = "/images/paper.jpg";
      
      var strokePoints = [];

      var playbackPoints = [];
      var playbackIndex;

      instance.moveToMousePos = function(canvas, evt) {
         var rect = canvas.getBoundingClientRect();
         var point = new Point(
            evt.clientX - rect.left,
            evt.clientY - rect.top);
         var draw = evt.buttons;
         moveToPos(point, draw);
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

      function moveToPos(point, draw) {
         var tempLeftAngle = botEngine.determineBaseAngleFromPosition(point, getLeftBaseArm(globalLeftAngle), true);
         var tempRightAngle = botEngine.determineBaseAngleFromPosition(point, getRightBaseArm(globalRightAngle), false);
         if (draw) {
            // Only draw the point if it's within drawing distance of the bases,
            // TODO and it doesn't cause the arms to buckle inward 
            if (!isNaN(tempLeftAngle.degrees) && !isNaN(tempRightAngle.degrees)) {
               updatePosition(point);
               strokePoints.push(point);
               botDraw.drawCircle(point, 15);
            } else {
               instance.update();
            }
         } else {
            instance.update();
         }
         botDraw.addTextAtPosition("  (" + point.x + "," + point.y + ")", point);
      }

      function updatePosition(positionPoint) {

         var xPos = positionPoint.x;
         var yPos = positionPoint.y;

         if (isNaN(xPos) || isNaN(yPos)) {
            return;
         }

         globalLeftAngle = botEngine.determineBaseAngleFromPosition(positionPoint, getLeftBaseArm(globalLeftAngle), true);
         globalRightAngle = botEngine.determineBaseAngleFromPosition(positionPoint, getRightBaseArm(globalRightAngle), false);

         botDraw.addOutputText("L" + (180 - Math.floor(globalLeftAngle.degrees)));
         botDraw.addOutputText("R" + (180 - Math.floor(globalRightAngle.degrees)));
         botDraw.addOutputPositionText(positionPoint);

         instance.update();
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
         botDraw.drawPoints(strokePoints);

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

         var point = playbackPoints[playbackIndex++];
         strokePoints.push(point);

         // Remove repeated points.
      //   if (playbackIndex > 0 && playbackPoints[playbackIndex].x == playbackPoints[playbackIndex].x && playbackPoints[playbackIndex].x == playbackPoints[playbackIndex].x) {
      //      if (playbackIndex < playbackPoints.length) {
      //         setTimeout(onePlaybackStep, 30);
      //      }
      //   }

         globalLeftAngle = botEngine.determineBaseAngleFromPosition(point, getLeftBaseArm(globalLeftAngle), true);
         globalRightAngle = botEngine.determineBaseAngleFromPosition(point, getRightBaseArm(globalRightAngle), false);

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

         botDraw.addTextAtPosition("  (" + Math.floor(connectionPoint.x) + "," + Math.floor(connectionPoint.y) + ")", point);

         botDraw.drawPoints(strokePoints);

         if (playbackIndex < playbackPoints.length) {
            setTimeout(onePlaybackStep, 30); // jshint ignore:line
         }
      }

      instance.playback = function() {

         var json = '{ "data": [' + document.getElementById("outputPosition").value + "0]}"; // jshint ignore:line
         var points = JSON.parse(json);

         strokePoints = [];
         playbackPoints = points.data;
         playbackIndex = 0;

         onePlaybackStep();
      };

      instance.pretend = function() {
         
         strokePoints = [];
         var shiftedChar2 = [];
         // Shift the second digit to the right
         for (var i=0;i<botChar2.data.length;i++) {
            var point = new Point(botChar2.data[i].x + 55, botChar2.data[i].y);
            shiftedChar2.push(point); 
         }
         playbackPoints = botChar1.data;
         playbackPoints = botChar1.data.concat(shiftedChar2);
         
         playbackIndex = 0;

         onePlaybackStep();
      };

      return instance;

   }]
);