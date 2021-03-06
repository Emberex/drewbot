"use strict"; // jshint ignore:line
var DEBUG = false;

function Stroke(x, y, draw) {
   this.point = new Point(x, y);
   this.draw = draw;
}

function Point(x, y) {
   this.x = x;
   this.y = y;
}

function Arm(x, y, angle, length) {
   this.point = new Point(x, y);
   this.length = length;
   this.angle = angle;
}

function Angle(value, isDegrees) {
   if (isDegrees) {
      this.degrees = value;
      this.radians = deg2Rad(value);
   } else {
      this.radians = value;
      this.degrees = rad2Deg(value);
   }
}

function deg2Rad(angle) {
   return angle * (Math.PI / 180.0);
}

function rad2Deg(angle) {
   return angle * (180.0 / Math.PI);
}

function debugLog(text) {
   if (DEBUG) {
      console.log(text); // jshint ignore:line
   }
}

function forceLog(text) {
   console.log(text); // jshint ignore:line
}

function computeDistance(p1, p2) {
   return sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)); // jshint ignore:line
}

function getLeftBaseArm(angle) {
   var arm = new Arm(ARMLENGTH * 2, 0, angle, ARMLENGTH); // jshint ignore:line
   return arm;
}

function getRightBaseArm(angle) {
   var arm = new Arm(ARMLENGTH * 2.5, 0, angle, ARMLENGTH); // jshint ignore:line
   return arm;
}
