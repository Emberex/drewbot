angular.module('em-drewbot').constant("simulatorConstants", {
    ARMLENGTH: 200,
    SKEWFACTOR: 0.05,
    SEGMENTLENGTH: this.ARMLENGTH / 8,
    
    DIGITOFFSET: this.SEGMENTLENGTH * 1.5,
    FIRSTCHARX: this.ARMLENGTH * 1.4,
    
    // the line segments are defined as.
    // 1 is the top line, 2 is center line, 3 is the bottom line
    // 4 is top left, 5 is top right
    // 6 is bottom left, 7 is bottom right
    // 8 indicates a colon character
    // 10 is upper left to middle, 11 is upper right to middle
    // 12 is lower left to middle, 13 is lower right to middle
    // 14 is top center, 15 is lower center
    // 16 is lower middle to left, 17 is lower middle to right
    TOPLINESEGMENT: 1,
    CENTERLINESEGMENT: 2,
    BOTTOMLINESEGMENT: 3,
    TOPLEFTSEGMENT: 4,
    TOPRIGHTSEGMENT: 5,
    BOTTOMLEFTSEGMENT: 6,
    BOTTOMRIGHTSEGMENT: 7,
    COLONSEGMENT: 8,
    XTOPLEFTSEGMENT: 10,
    XTOPRIGHTSEGMENT: 11,
    XBOTTOMLEFTSEGMENT: 12,
    XBOTTOMRIGHTSEGMENT: 13,
    TOPCENTERSEGMENT: 14,
    BOTTOMCENTERSEGMENT: 15,
    VBOTTOMLEFTSEGMENT: 16,
    VBOTTOMRIGHTSEGMENT: 17,
});