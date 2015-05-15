function whatTimeIsIt() {

   playbackStrokes = getTimeAsStrokes();

   strokePoints = new Array(); // reset
   playbackStrokes.push( new Stroke(310,190,false));
   playbackIndex = 0;
   onePlaybackStep();
   
   setTimeout(whatTimeIsIt, 20000);
}

function doMessage() {

   playbackStrokes = convertToStrokes(document.getElementById("message").value);

   strokePoints = new Array(); // reset
   playbackStrokes.push( new Stroke(310,190,false));
   playbackIndex = 0;
   onePlaybackStep();
   
}

function messageKeypress(evt) {
   if (evt.keyCode == 13) {
      doMessage();
   }
}

function playback() {

   var json = '{ "data": [' + document.getElementById("outputPosition").value + "0]}";
   var points = JSON.parse(json);
   
   for (var i = 0; i<points.data.length;i++) {
      playbackStrokes.push( new Stroke(points.data[i].x, points.data[i].y, true));
   }

   strokePoints = new Array();
   playbackIndex = 0;

   onePlaybackStep();

}

