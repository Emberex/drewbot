// TODO:
//  eraser:  resize peg.
//           make it taller.
//  base:    make servo box bigger.
//           make base ends line up with holder ends.
//  holder:  offset cable pass-through.
//           rotate servos into place.
//           correct servo shaft diameter
//           make holder ends line up with base ends.
//  arms:    correct servo shaft diameter
//  pen arm: flip upside down.


hq = true;

$fs = hq ? 1 : 4;
$fa = hq ? 1 : 4;
eps = 0.1;

// Servo dimensions.  We use Adafruit high torque microservers.
// https://www.adafruit.com/products/1143
servo_l  = 23;                  // length
servo_w  = 13;                  // width
servo_h  = 5;                   // height above deck
servo_d  = 19;                  // depth below deck
servo_sh = 10;                  // shaft height above deck
servo_sx = 5;                   // shaft X coord
servo_sd = 5;                   // shaft diameter
servo_bh = servo_h + servo_d;   // servo body height
servo_fl = 5;                   // flange length

// Servo horn dimensions.  We use the smallest horn that comes with
// the servo.  It has a single arm and six small holes.
horn_hub_d1 = 7.3;              // outer diameter
horn_hub_d2 = 4.83;             // inner diameter
horn_hub_d3 = 2.33;             // screw hole diameter

horn_hub_h1 = 5.4;              // overall height
horn_hub_h2 = 3.65;             // lower cavity height
horn_hub_h3 = 1.06;             // upper cavity height

horn_arm_d1 = 5.72;             // diameter at hub
horn_arm_d2 = 4;                // diameter at tip
horn_arm_len = 15;              // distance from hub to last hole
horn_arm_z = 2.58;              // height above hub bottom
horn_arm_t = 1.96;              // thickness
horn_arm_holes = [5, 7, 9, 11, 13, 15]; // holes' X coordinates
horn_arm_hole_d = 1;                    // holes' diameter

// Base magnet dimensions.  We use these block magnets from Gauss Boys.
// http://www.gaussboys.com/store/index.php/magnet-shapes/blocks/b2506e-n42.html
magnet_l = 25;                  // length
magnet_w = 12;                  // width
magnet_h = 6;                   // height

// Eraser magnet dimensions.  We use this toroidal magnet.
// http://www.gaussboys.com/store/index.php/magnet-shapes/rings/r2506.html
eraser_magnet_d1 = 25;          // outer diameter
eraser_magnet_d2 = 12.5;        // inner diameter
eraser_magnet_t  = 6;           // thickness

// We use M5x14 socket-head machine screws and nylon locknuts.
// http://www.mcmaster.com/#91290A230
// http://www.mcmaster.com/#90576A104
bore_d = 5;                     // diameter
nut_t = 5;                      // locknut thickness
arm_t = 4;                      // arm thickness (14 - nut len) / 2

// Pen dimensions.  We use an Expo dry-erase marker.
// http://www.expomarkers.com/markers/low-odor
pen_d1 = 17;                    // body diameter
pen_d2 = 9;                     // tip diameter
pen_tl = 25;                    // tip length
pen_wt = 3;                     // wall thickness

// Servo Holder Dimensions
sh_xmargin = 5;                 // margins around servos
sh_y0margin = 4;
sh_y1margin = 7;
sh_l = 2 * (servo_l + 2 * sh_xmargin); // overall length
sh_w = servo_w + sh_y0margin + sh_y1margin;
sh_t = 9;                       // thickness
sh_bl = 15;                     // bracket length
sh_bw = sh_t;
sh_bt = arm_t;                  // bracket thickness
sh_pd = sh_bl - sh_t / 2;       // pivot distance

// Base Dimensions
base_margin = 4;
base_magnet_lift = 1;
base_magnet_inset_d = 4;        // depth magnets are inset into base
base_arm_clr = 0.7;             // base arm clearance
base_pivot_height = 26;
base_at = arm_t;                // arm thickness
base_aw = sh_t;
base_al = base_pivot_height + base_aw / 2;
base_pl = sh_l - 2 * (sh_bt + base_arm_clr); // pedestal length
base_pw = servo_w + 2 * base_margin;
base_ph = 15;
base_l = sh_l;                  // overall length
base_w = base_pw + 2 * magnet_w + 4 * base_margin;
base_h = base_magnet_inset_d + base_magnet_lift; // height
base_servo_x = -base_pl/2 + base_at + nut_t + 1;
base_servo_dx = base_servo_x + servo_d;
base_lift_x = base_servo_dx + servo_sh;
base_servo_z = base_pivot_height - servo_sx - servo_l / 2;

// Eraser Dimensions
eraser_d1 = eraser_magnet_d1;   // diameter under magnet
eraser_d2 = eraser_magnet_d2;   // diameter inside magnet
eraser_d3 = pen_d2 + 1;         // diameter around pen
eraser_t1 = 5;                  // thickness under magnet
eraser_t2 = 1;                  // thickness under pen tip
eraser_h  = 12;

// Arm Dimensions
arm_w = 5;
arm_l = 50;
arm_clr = 0.3;

// Pen Arm Dimensions
pen_offset = (pen_d1 + bore_d) / 2 + pen_wt;
pen_arm_lsl = pen_tl - eraser_h + 1; // lower sleeve length
pen_arm_usl = 3;                     // upper sleeve length


module servo_horn() {
	// Render the horn with fine detail.
	$fs = 0.1;
	$fa = 1;

	module hub_hull() {
		cylinder(d=horn_hub_d1, h=horn_hub_h1);
	}
	
	module hub_cutouts() {
		translate([0, 0, -eps])
			cylinder(d=horn_hub_d2, h=horn_hub_h2 + eps);
		translate([0, 0, horn_hub_h1 - horn_hub_h3])
			cylinder(d=horn_hub_d2, h=horn_hub_h1);
		cylinder(d=horn_hub_d3, h=horn_hub_h1);
	}
	
	module arm_hull() {
		translate([0, 0, horn_arm_z])
			hull() {
				cylinder(d=horn_arm_d1, h=horn_arm_t);
				translate([horn_arm_len, 0, 0])
					cylinder(d=horn_arm_d2, h=horn_arm_t);
			}
	}
	
	module arm_cutouts() {
		for (x = horn_arm_holes)
			translate([x, 0, 0])
				cylinder(d=horn_arm_hole_d, h=horn_hub_d1);
	}

	difference() {
		union() {
			hub_hull();
			arm_hull();
		}
		hub_cutouts();
		// arm_cutouts();
	}
}

module centered_cube(size, zt=0) {
    translate([-size[0] / 2, -size[1] / 2, zt])
        cube(size);
}

module base() {
    difference() {
        union() {

            // flat section
            centered_cube([base_l, base_w, base_h]);

            // pedestal
            difference() {
            centered_cube([base_pl, base_pw, base_ph - eps], zt=eps);
            }
        }

        // magnet insets
        for (x = [-1, +1], y = [-1, +1])
            scale([x, y, 1])
                translate([(base_l - magnet_l) / 2 - base_margin,
                           (base_w - magnet_w) / 2 - base_margin,
                           base_magnet_lift]) {
                    centered_cube([magnet_l, magnet_w, magnet_h]);
                    cylinder(d=magnet_w, h=base_h, center=true);
                }

        // lift servo cavity
        translate([base_servo_x, -servo_w / 2, base_servo_z])
            cube([servo_bh, servo_w, servo_l]);

        // lift servo flange cavity
        translate([base_servo_dx, -servo_w / 2, base_servo_z - servo_fl - 1])
            cube([3, servo_w, servo_fl + 2]);
    }


    // arms
    for (x = [0, 1])
        mirror([x, 0, 0])
            translate([(base_pl - base_at) / 2, 0, 0])
                difference() {

                    // arm uprights
                    centered_cube([base_at, base_aw, base_al - eps], eps);

                    // arm bores
                    translate([0, 0, base_pivot_height])
                        rotate(90, [0, 1, 0])
                            cylinder(d=bore_d, h=base_at + 2, center=true);
                }
}

module servoholder(h=9) {

    module bracket(d, t) {
        translate([0, servo_w / 2 + sh_y1margin - eps, 0]) {
            difference() {
                cube([t, sh_bl + eps, sh_bw]);
                translate([-eps, sh_pd, sh_bw / 2])
                rotate(90, [0, 1, 0])
                    cylinder(d=d, h=t + 2 * eps);
            }
        }
    }

    difference() {
        union() {
            // body
            translate([-sh_l / 2, -servo_w / 2 - sh_y0margin, 0])
                cube([sh_l, sh_w, sh_t]);
            // raise right servo
            translate([0, -servo_w / 2 - sh_y0margin, eps])
                cube([sh_l / 2, sh_w, sh_t + arm_t - eps]);

            // outer brackets
            for (x = [-1, +1])
                scale([x, 1, 1])
                    translate([sh_l / 2 - sh_bt, 0, 0])
                        bracket(d=bore_d, t=sh_bt);

            // lift arm
            translate([base_lift_x, 0, 0])
                bracket(d=servo_sd, t=arm_t);
        }

        // servo cutouts
        for (i = [0, 1])
            mirror([i, 0, 0]) {
                translate([-sh_l / 2 + sh_xmargin, 0, sh_t + i * arm_t]) {
                    for (a = [0, 8])
                        rotate(a) {
                            translate([0, -servo_w / 2,  - servo_d])
                                cube([servo_l, servo_w, servo_bh]);
                            if (a) {
                                translate([servo_l, 0, -sh_t - arm_t])
                                    centered_cube([6, 4, 2 * sh_t], -eps);
                            } else {
                                translate([servo_l, 0, -12 - 4])
                                    cube([6, 6, 8], center=true);
                            }
                       }
                }
            }
    }
}

module eraser() {
    difference() {
        union() {
            // thick disk under magnet
            cylinder(d=eraser_d1, h=eraser_t1);
        
            // sleeve around pen
            cylinder(d=eraser_d2, h=eraser_h);
        }
        // hole for pen
        translate([0, 0, eraser_t2])
        cylinder(d=eraser_d3, h=eraser_h);
    }
}

module ring(di, do, h) {
	difference() {
		cylinder(h=h, r=do/2);
		translate([0, 0, -1])
			cylinder(h=h+2, r=di/2);
	}
}


module arm_ring(d) {
	ring(d, d + arm_w, arm_t);
}

module arm(hole1, hole2) {
	arm_ring(hole1);
	translate([hole1 / 2, -arm_w / 2, 0])
		cube([arm_l-hole1 / 2 - hole2 / 2, arm_w, arm_t]);
	translate([arm_l, 0, 0])
		arm_ring(hole2);
}

module pen_ring() {
	d1 = pen_d1;
	d1w = d1 + 2 * pen_wt;
	d2 = pen_d2;
	d2w = d2 + 2 * pen_wt;
	lsl = pen_arm_lsl;         // lower sleeve length
     usl = pen_arm_usl;         // upper sleeve length
	bl = usl + d1 / 2;         // inner bullet length
	blw = bl + pen_wt;     // outer bullet_length

	module bullet(d, h) {
		intersection() {
			hull() {
				translate([0, 0, h - d/2])
					sphere(d=d);
					cylinder(d=d, h=1);
			}
			cylinder(d=d+1, h=h);
		}
	}
	difference() {
		union() {
			bullet(d=d1w, h=blw);
			translate([0, 0, eps])
				cylinder(d=d2w, h=bl + lsl - eps);
		}
          translate([0, 0, -eps])
              bullet(d=d1, h=bl + eps);
          cylinder(d=d2, h=lsl + usl + d1 / 2 + eps);
	}
}

module pen_arm() {
	arm(bore_d, bore_d);
	rotate(a=45)
		difference() {
			translate([-pen_offset, 0, 0])
				pen_ring();
			translate([0, 0, arm_t]) {
				cylinder(d=bore_d + arm_w + 0.5, h=arm_t + 0.5);
				cylinder(d=9, h=100);
			}
			translate([0, 0, -1])
				cylinder(d=bore_d, h=arm_t + 2);
		}
}

module servo_arm() {
	difference() {
		union() {
			hull() {
				cylinder(d=horn_hub_d1 + arm_w, h=arm_t);
				translate([arm_l, 0, 0])
					cylinder(d=bore_d, h=arm_t);
			}
			translate([arm_l, 0, 0])
				arm_ring(bore_d);
		}
		translate([0, 0, -eps]) {
			servo_horn();
			cylinder(d=horn_hub_d1 + arm_clr, h=arm_t + 2 * eps);
		}
		translate([arm_l, 0, -eps])
			cylinder(d=bore_d, h=arm_t + 2 * eps);
	}
}

color("yellow") 
 	translate([0, 70, 0])
 		base();

color("blue")
 	translate([50, 70, 0])
 		eraser();

color("red")
      translate([0, 0, 0])
           servoholder();

color("green")
 	translate([-25, -20, 0])
           pen_arm();

color("green")
	translate([-13, -30, 0])
		arm(bore_d, bore_d);

color("green")
	translate([-20, -45, 0])
		servo_arm();

color("green")
     translate([-30, -60, 0])
		servo_arm();
