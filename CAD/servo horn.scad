eps = 0.1;

// We use the smallest horn that comes with the servo.
// It has a single arm and six small holes.

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
		arm_cutouts();	
	}
}
