/* global botChar1 */
/* global botChar2 */
/* global Angle */
/* global clearOutputText */
/* global canvas */
/* global Arm */
/* global drawPoints */
/* global drawLine */
/* global circleIntersectionPoints */
/* global drawCharOutline */
/* global addOutputPositionText */
/* global clearCanvas */
/* global addOutputText */
/* global Point */
/* global addTextAtPosition */
/* global drawCircle */
/* global determineBaseAngleFromPosition */
/* global getContext */
"use strict"; // jshint ignore:line
var ARMLENGTH = 200;

var globalLeftAngle;
var globalRightAngle;

var backgroundImg;
var strokePoints = [];

var playbackPoints = [];
var playbackIndex;

function moveToPos(point, draw) {
   var tempLeftAngle = determineBaseAngleFromPosition(point, getLeftBaseArm(globalLeftAngle), true);
   var tempRightAngle = determineBaseAngleFromPosition(point, getRightBaseArm(globalRightAngle), false);
   if (draw) {
      // Only draw the point if it's within drawing distance of the bases,
      // TODO and it doesn't cause the arms to buckle inward 
      if (!isNaN(tempLeftAngle.degrees) && !isNaN(tempRightAngle.degrees)) {
         updatePosition(point);
         strokePoints.push(point);
         drawCircle(point, 15);
      } else {
         update();
      }
   } else {
      update();
   }
   addTextAtPosition("  (" + point.x + "," + point.y + ")", point);

}

function moveToMousePos(canvas, evt) {
   var rect = canvas.getBoundingClientRect();
   var point = new Point(
      evt.clientX - rect.left,
      evt.clientY - rect.top);
   var draw = evt.buttons;
   moveToPos(point, draw);
}


function update() {

   clearCanvas();

   var leftBaseArm = getLeftBaseArm(globalLeftAngle);
   var rightBaseArm = getRightBaseArm(globalRightAngle);

   draw(leftBaseArm, rightBaseArm);
}


function updatePosition(positionPoint) {

   var xPos = positionPoint.x;
   var yPos = positionPoint.y;

   if (isNaN(xPos) || isNaN(yPos)) {
      return;
   }

   globalLeftAngle = determineBaseAngleFromPosition(positionPoint, getLeftBaseArm(globalLeftAngle), true);
   globalRightAngle = determineBaseAngleFromPosition(positionPoint, getRightBaseArm(globalRightAngle), false);

   addOutputText("L" + (180 - Math.floor(globalLeftAngle.degrees)));
   addOutputText("R" + (180 - Math.floor(globalRightAngle.degrees)));
   addOutputPositionText(positionPoint);

   update();
}


function servoEndPoint(arm) {

   var x = Math.cos(arm.angle.radians) * arm.length + arm.point.x;
   var y = Math.sin(arm.angle.radians) * arm.length + arm.point.y;

   return new Point(x, y);
}


function positionOfConnection(point1, p1Length, point2, p2Length) {

   var intersectionPoints = circleIntersectionPoints(point1, p1Length, point2, p2Length);
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

   getContext().drawImage(backgroundImg, 0, -120); 
   
   // Add box for char size
   drawCharOutline({ "x": baseLeft.point.x, "y": ARMLENGTH * 0.9 }, ARMLENGTH * 0.5, ARMLENGTH * 0.5);

   var leftEndPoint = servoEndPoint(baseLeft);
   var rightEndPoint = servoEndPoint(baseRight);

   // Draw the base arms
   drawLine(baseLeft.point, leftEndPoint, "#111111");
   drawLine(baseRight.point, rightEndPoint, "#00ff00");

   // Determine where connection, and draw top arms.
   var connectionPoint = positionOfConnection(leftEndPoint, baseLeft.length, rightEndPoint, baseRight.length);

   drawLine(leftEndPoint, connectionPoint, "#0000ff");
   drawLine(rightEndPoint, connectionPoint, "#ff0000");
   
   // If we're in drawing mode, draw the current set of points
   drawPoints(strokePoints);

   // Add some text to help with debugging
   addTextAtPosition("  (" + Math.floor(connectionPoint.x) + "," + Math.floor(connectionPoint.y) + ")", connectionPoint);
   addTextAtPosition("  Left(" + Math.floor(baseLeft.angle.degrees) + "\u00B0)", baseLeft.point);
   addTextAtPosition("  Right(" + Math.floor(baseRight.angle.degrees) + "\u00B0)", baseRight.point);

}

function getLeftBaseArm(angle) {
   var arm = new Arm(ARMLENGTH * 2, 0, angle, ARMLENGTH);
   return arm;
}

function getRightBaseArm(angle) {
   var arm = new Arm(ARMLENGTH * 2.25, 0, angle, ARMLENGTH);
   return arm;
}


function initBot(canvasName) {

   var canvasElement = document.getElementById(canvasName); // jshint ignore:line

   canvasElement.addEventListener('mousemove', function (evt) {
      moveToMousePos(canvas, evt);
   }, false);

   canvasElement.addEventListener('mousedown', function (evt) {
      clearOutputText();
      addOutputText("PenDown");
      strokePoints = [];
   }, false);

   canvasElement.addEventListener('mouseup', function (evt) {
      addOutputText("PenUp");
   }, false);

   // Arbitrary init position
   globalLeftAngle = new Angle(125, true);
   globalRightAngle = new Angle(75, true);

   backgroundImg = new Image(); // jshint ignore:line
   backgroundImg.src = "/images/paper.jpg";
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

   globalLeftAngle = determineBaseAngleFromPosition(point, getLeftBaseArm(globalLeftAngle), true);
   globalRightAngle = determineBaseAngleFromPosition(point, getRightBaseArm(globalRightAngle), false);

   var leftBaseArm = getLeftBaseArm(globalLeftAngle);
   var rightBaseArm = getRightBaseArm(globalRightAngle);

   var leftEndPoint = servoEndPoint(leftBaseArm);
   var rightEndPoint = servoEndPoint(rightBaseArm);

   clearCanvas();
            
   // Draw the base arms
   drawLine(leftBaseArm.point, leftEndPoint, "#111111");
   drawLine(rightBaseArm.point, rightEndPoint, "#00ff00");
                  
   // Determine where connection, and draw top arms.
   var connectionPoint = positionOfConnection(leftEndPoint, leftBaseArm.length, rightEndPoint, rightBaseArm.length);

   drawLine(leftEndPoint, connectionPoint, "#0000ff");
   drawLine(rightEndPoint, connectionPoint, "#ff0000");

   addTextAtPosition("  (" + Math.floor(connectionPoint.x) + "," + Math.floor(connectionPoint.y) + ")", point);

   drawPoints(strokePoints);

   if (playbackIndex < playbackPoints.length) {
      setTimeout(onePlaybackStep, 30); // jshint ignore:line
   }
}


function playback() {

   var json = '{ "data": [' + document.getElementById("outputPosition").value + "0]}"; // jshint ignore:line
   var points = JSON.parse(json);

   strokePoints = [];
   playbackPoints = points.data;
   playbackIndex = 0;

   onePlaybackStep();

}

function pretend() {
   
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
}
