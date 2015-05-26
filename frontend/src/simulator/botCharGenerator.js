angular.module('em-drewbot').factory('botCharGenerator', ['simulatorConstants', 
   function(simulatorConstants) {
      
      var instance = {};

      instance.convertToStrokes = function(str) {
         var offsetX = simulatorConstants.FIRSTCHARX;
         var strokes = [];
      
         for (var c = 0; c < str.length; c++) {
            var segs = charToSegments(str[c]);
            var pointOffset = new Point(offsetX, ARMLENGTH);
            var tempPoints = getSegmentStrokes(segs, pointOffset);
            strokes = strokes.concat(tempPoints);
            offsetX += simulatorConstants.DIGITOFFSET;
         }
      
         return strokes;
      };      
      
      function shiftPoint(stroke, shift) {
         return new Stroke(stroke.point.x + shift.x, stroke.point.y + shift.y, stroke.draw);
      }
      
      function skew(point) {
         var skewPoint = new Point(-simulatorConstants.ARMLENGTH * simulatorConstants.SKEWFACTOR, 0);
         return shiftPoint(point, skewPoint);
      }
      
      function skew2(point) {
         return skew(skew(point));
      }
      
      function getSegmentStrokes(segments, shift) {
         var strokes = [];
         var lenFactor = 0.9;
         for (var i = 0; i < segments.length; i++) {
            var eachSegment = segments[i];
      
            switch (eachSegment) {
               case simulatorConstants.TOPLINESEGMENT:
                  strokes.push(shiftPoint(new Stroke(0, 0, false), shift));
                  strokes.push(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH * lenFactor, 0, true), shift));
                  break;
               case simulatorConstants.CENTERLINESEGMENT:
                  strokes.push(skew(shiftPoint(new Stroke(0, simulatorConstants.SEGMENTLENGTH, false), shift)));
                  strokes.push(skew(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH * lenFactor, simulatorConstants.SEGMENTLENGTH, true), shift)));
                  break;
               case simulatorConstants.BOTTOMLINESEGMENT:
                  strokes.push(skew2(shiftPoint(new Stroke(0, simulatorConstants.SEGMENTLENGTH * 2, false), shift)));
                  strokes.push(skew2(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH * lenFactor, simulatorConstants.SEGMENTLENGTH * 2, true), shift)));
                  break;
               case simulatorConstants.TOPLEFTSEGMENT:
                  strokes.push(shiftPoint(new Stroke(0, 0, false), shift));
                  strokes.push(skew(shiftPoint(new Stroke(0, simulatorConstants.SEGMENTLENGTH * lenFactor, true), shift)));
                  break;
               case simulatorConstants.TOPRIGHTSEGMENT:
                  strokes.push(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH, 0, false), shift));
                  strokes.push(skew(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH, simulatorConstants.SEGMENTLENGTH * lenFactor, true), shift)));
                  break;
               case simulatorConstants.BOTTOMLEFTSEGMENT:
                  strokes.push(skew(shiftPoint(new Stroke(0, simulatorConstants.SEGMENTLENGTH, false), shift)));
                  strokes.push(skew2(shiftPoint(new Stroke(0, simulatorConstants.SEGMENTLENGTH * 2 * lenFactor, true), shift)));
                  break;
               case simulatorConstants.BOTTOMRIGHTSEGMENT:
                  strokes.push(skew(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH, simulatorConstants.SEGMENTLENGTH, false), shift)));
                  strokes.push(skew2(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH, simulatorConstants.SEGMENTLENGTH * 2 * lenFactor, true), shift)));
                  break;
               case simulatorConstants.COLONSEGMENT: // : colon char
                  strokes.push(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH / 2, simulatorConstants.SEGMENTLENGTH * 0.25, false), shift));
                  strokes.push(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH / 2, simulatorConstants.SEGMENTLENGTH * 0.25 + simulatorConstants.SEGMENTLENGTH * 0.25, true), shift));
                  strokes.push(skew(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH / 2, simulatorConstants.SEGMENTLENGTH * 1.25, false), shift)));
                  strokes.push(skew(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH / 2, simulatorConstants.SEGMENTLENGTH * 1.25 + simulatorConstants.SEGMENTLENGTH * 0.25, true), shift)));
                  break;
               case simulatorConstants.XTOPLEFTSEGMENT:
                  strokes.push((shiftPoint(new Stroke(0, 0, false), shift)));
                  strokes.push(skew(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH / 2, simulatorConstants.SEGMENTLENGTH * lenFactor, true), shift)));
                  break;
               case simulatorConstants.XTOPRIGHTSEGMENT:
                  strokes.push((shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH, 0, false), shift)));
                  strokes.push(skew(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH / 2, simulatorConstants.SEGMENTLENGTH * lenFactor, true), shift)));
                  break;
               case simulatorConstants.XBOTTOMLEFTSEGMENT:
                  strokes.push(skew2(shiftPoint(new Stroke(0, simulatorConstants.SEGMENTLENGTH * 2 * lenFactor, false), shift)));
                  strokes.push(skew(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH / 2, simulatorConstants.SEGMENTLENGTH, true), shift)));
                  break;
               case simulatorConstants.XBOTTOMRIGHTSEGMENT:
                  strokes.push(skew2(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH, simulatorConstants.SEGMENTLENGTH * 2 * lenFactor, false), shift)));
                  strokes.push(skew(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH / 2, simulatorConstants.SEGMENTLENGTH, true), shift)));
                  break;
               case simulatorConstants.TOPCENTERSEGMENT:
                  strokes.push((shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH / 2, 0, false), shift)));
                  strokes.push(skew(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH / 2, simulatorConstants.SEGMENTLENGTH * lenFactor, true), shift)));
                  break;
               case simulatorConstants.BOTTOMCENTERSEGMENT:
                  strokes.push(skew2(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH / 2, simulatorConstants.SEGMENTLENGTH * 2 * lenFactor, false), shift)));
                  strokes.push(skew(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH / 2, simulatorConstants.SEGMENTLENGTH, true), shift)));
                  break;
               case simulatorConstants.VBOTTOMLEFTSEGMENT:
                  strokes.push(skew2(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH / 2, simulatorConstants.SEGMENTLENGTH * 2 * lenFactor, false), shift)));
                  strokes.push(skew(shiftPoint(new Stroke(0, simulatorConstants.SEGMENTLENGTH, true), shift)));
                  break;
               case simulatorConstants.VBOTTOMRIGHTSEGMENT:
                  strokes.push(skew2(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH / 2, simulatorConstants.SEGMENTLENGTH * 2 * lenFactor, false), shift)));
                  strokes.push(skew(shiftPoint(new Stroke(simulatorConstants.SEGMENTLENGTH, simulatorConstants.SEGMENTLENGTH, true), shift)));
                  break;
               default:
                  console.log("drawSegmentsAtPosition unknown " + eachSegment);
            }
         }
         return strokes;
      }
      
      function charToSegments(char) {
      
         var lineSegments;
         switch (char.toUpperCase()) {
            case '0':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.BOTTOMLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT];
               break;
            case '1':
               lineSegments = [simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT];
               break;
            case '2':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.CENTERLINESEGMENT, simulatorConstants.BOTTOMLINESEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT];
               break;
            case '3':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.CENTERLINESEGMENT, simulatorConstants.BOTTOMLINESEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT];
               break;
            case '4':
               lineSegments = [simulatorConstants.CENTERLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT];
               break;
            case '5':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.CENTERLINESEGMENT, simulatorConstants.BOTTOMLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT];
               break;
            case '6':
               lineSegments = [simulatorConstants.CENTERLINESEGMENT, simulatorConstants.BOTTOMLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT];
               break;
            case '7':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT];
               break;
            case '8':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.CENTERLINESEGMENT, simulatorConstants.BOTTOMLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT];
               break;
            case '9':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.CENTERLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT];
               break;
            case ' ':
               lineSegments = [];
               break;
            case ':':
               lineSegments = [simulatorConstants.COLONSEGMENT];
               break;
            case 'A':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.CENTERLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT];
               break;
            case 'B':
               lineSegments = [simulatorConstants.CENTERLINESEGMENT, simulatorConstants.BOTTOMLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT];
               break;
            case 'C':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.BOTTOMLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT];
               break;
            case 'D':
               lineSegments = [simulatorConstants.CENTERLINESEGMENT, simulatorConstants.BOTTOMLINESEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT];
               break;
            case 'E':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.CENTERLINESEGMENT, simulatorConstants.BOTTOMLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT];
               break;
            case 'F':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.CENTERLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT];
               break;
            case 'G':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.CENTERLINESEGMENT, simulatorConstants.BOTTOMLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT];
               break;
            case 'H':
               lineSegments = [simulatorConstants.CENTERLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT];
               break;
            case 'I':
               lineSegments = [simulatorConstants.TOPCENTERSEGMENT, simulatorConstants.BOTTOMCENTERSEGMENT];
               break;
            case 'J':
               lineSegments = [simulatorConstants.BOTTOMLINESEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT];
               break;
            case 'K':
               lineSegments = [simulatorConstants.TOPCENTERSEGMENT, simulatorConstants.BOTTOMCENTERSEGMENT, simulatorConstants.XTOPRIGHTSEGMENT, simulatorConstants.XBOTTOMRIGHTSEGMENT];
               break;
            case 'L':
               lineSegments = [simulatorConstants.BOTTOMLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT];
               break;
            case 'M':
               lineSegments = [simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT, simulatorConstants.XTOPLEFTSEGMENT, simulatorConstants.XTOPRIGHTSEGMENT];
               break;
            case 'N':
               lineSegments = [simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT, simulatorConstants.XTOPLEFTSEGMENT, simulatorConstants.XBOTTOMRIGHTSEGMENT];
               break;
            case 'O':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.BOTTOMLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT];
               break;
            case 'P':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.CENTERLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT];
               break;
            case 'Q':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.BOTTOMLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT, simulatorConstants.XBOTTOMRIGHTSEGMENT];
               break;
            case 'R':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.CENTERLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT, simulatorConstants.XBOTTOMRIGHTSEGMENT];
               break;
            case 'S':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.CENTERLINESEGMENT, simulatorConstants.BOTTOMLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT];
               break;
            case 'T':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.TOPCENTERSEGMENT, simulatorConstants.BOTTOMCENTERSEGMENT];
               break;
            case 'U':
               lineSegments = [simulatorConstants.BOTTOMLINESEGMENT, simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT];
               break;
            case 'V':
               lineSegments = [simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.VBOTTOMLEFTSEGMENT, simulatorConstants.VBOTTOMRIGHTSEGMENT];
               break;
            case 'W':
               lineSegments = [simulatorConstants.TOPLEFTSEGMENT, simulatorConstants.TOPRIGHTSEGMENT, simulatorConstants.BOTTOMLEFTSEGMENT, simulatorConstants.BOTTOMRIGHTSEGMENT, simulatorConstants.XBOTTOMLEFTSEGMENT, simulatorConstants.XBOTTOMRIGHTSEGMENT];
               break;
            case 'X':
               lineSegments = [simulatorConstants.XTOPLEFTSEGMENT, simulatorConstants.XTOPRIGHTSEGMENT, simulatorConstants.XBOTTOMLEFTSEGMENT, simulatorConstants.XBOTTOMRIGHTSEGMENT];
               break;
            case 'Y':
               lineSegments = [simulatorConstants.XTOPLEFTSEGMENT, simulatorConstants.XTOPRIGHTSEGMENT, simulatorConstants.BOTTOMCENTERSEGMENT];
               break;
            case 'Z':
               lineSegments = [simulatorConstants.TOPLINESEGMENT, simulatorConstants.BOTTOMLINESEGMENT, simulatorConstants.XTOPRIGHTSEGMENT, simulatorConstants.XBOTTOMLEFTSEGMENT];
               break;
            default:
               lineSegments = [2];
               console.log("Unexpected digit");
            // return question mark
         }
         return lineSegments;
      }
      
      return instance;

   }]
);