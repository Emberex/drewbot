This html page (bot.html) will simulate a drewbot.

TODO mouse events are not working on Chrome. Works in Firefox.
TODO add serial interface to accept commands similar to arduino.
TODO consider allowing the user to add pen up and pen down within a recording/drawing.
TODO the botEngine.js will need to be moved to an appropriate location for use by node on the raspberry pi.

Note that this algorithm assumes arm lengths and positions. Those will need to be changed to the real values for a more accurate simulation.
Note that this simulation does not take into account the short 135 degree offset of the pen on its arm. 

Initially designed to prove botEngine algorithms.

It can be used to draw characters. Position data is displayed in text boxes. The left box has L and R servo angle commands. The right box has position data in JSON.

After drawing, you may use the Playback! button to play recorded position data. 

The Pretend! button will play two characters that have been stored. The second character is right shifted to demonstrate how we will position characters.
Note that it does not lift the pen between characters.

XOXO
Glassman