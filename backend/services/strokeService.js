var ARM_LENGTH_MM = 50;
var CANVAS_SCALE_FACTOR = 4;
var ARM_LENGTH = ARM_LENGTH_MM * CANVAS_SCALE_FACTOR;
var globalLeftAngle = new Angle(125, true);
var globalRightAngle = new Angle(75, true);

function getCommands(strokes) {

    var commands = [];
    strokes.forEach(function(stroke, index, array) {
        commands = commands.concat(getCommand(stroke));
    });
    return commands;
}

//one stroke turns into 3 commands
function getCommand(stroke) {
    var commands = [];

    globalLeftAngle = determineBaseAngleFromPosition(stroke, getLeftBaseArm(globalLeftAngle), true);
    globalRightAngle = determineBaseAngleFromPosition(stroke, getRightBaseArm(globalRightAngle), false);

    if(stroke.draw) {
        commands.push("i102"); //down
    } else {
        commands.push("i90"); //up
    }
    commands.push("l" + (180 - Math.floor(globalLeftAngle.degrees)));
    commands.push("r" + (180 - Math.floor(globalRightAngle.degrees)));
    return commands;
}

function determineBaseAngleFromPosition(strokePoint, baseArm, isLeft) {

    var points = circleIntersectionPoints(baseArm.point, baseArm.length, strokePoint, ARM_LENGTH);
    // Use the correct intersection point
    var x;
    var y;
    // If we're looking at left base, use left most intersection
    // If we're looking at not left base, use right most intersection
    if (points[0].x <= points[1].x && isLeft) {
        x = points[0].x;
        y = points[0].y;
    } else if (points[0].x >= points[1].x && !isLeft) {
        x = points[0].x;
        y = points[0].y;
    } else {
        x = points[1].x;
        y = points[1].y;
    }

    var result;
    if (x <= baseArm.point.x) {
        result = new Angle(Math.PI - Math.asin(y / baseArm.length), false);
    } else {
        result = new Angle(Math.asin(y / baseArm.length), false);
    }
    return result;
}

// Returns array of two intersection points.
function circleIntersectionPoints(p1, p1Length, p2, p2Length) {
    // Stolen from:
    // http://ambrsoft.com/TrigoCalc/Circles2/Circle2.htm

    var connectionPoints = new Array(2);
    var a = p1.x;
    var b = p1.y;
    var c = p2.x;
    var d = p2.y;

    var D = Math.sqrt(Math.pow(c - a, 2) + Math.pow(d - b, 2));

    var delta = Math.sqrt((D + p1Length + p2Length) * (D + p1Length - p2Length) * (D - p1Length + p2Length) * (-D + p1Length + p2Length)) / 4.0;

    var xBase = (a + c) / 2.0 + (c - a) * (p2Length * p2Length - p1Length * p1Length) / (2.0 * D * D);
    var yBase = (b + d) / 2.0 + (d - b) * (p2Length * p2Length - p1Length * p1Length) / (2.0 * D * D);

    var x1 = xBase + 2 * (d - b) * delta / (D * D);
    var x2 = xBase - 2 * (d - b) * delta / (D * D);
    var y1 = yBase - 2 * (c - a) * delta / (D * D);
    var y2 = yBase + 2 * (c - a) * delta / (D * D);

    connectionPoints[0] = new Point(x1, y1);
    connectionPoints[1] = new Point(x2, y2);

    return connectionPoints;
}

function getLeftBaseArm(angle) {
    return new Arm(ARM_LENGTH * 2, 0, angle, ARM_LENGTH);
}

function getRightBaseArm(angle) {
    return new Arm(ARM_LENGTH * 2.25, 0, angle, ARM_LENGTH);
}

function deg2Rad(angle) {
    return angle * (Math.PI / 180.0);
}

function rad2Deg(angle) {
   return angle * (180.0 / Math.PI);
}

function Point(x, y) {
   this.x = x;
   this.y = y;
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

function Arm(x, y, angle, length) {
    this.point = new Point(x, y);
    this.length = length;
    this.angle = angle;
}

module.exports = {
    getCommands: getCommands
};