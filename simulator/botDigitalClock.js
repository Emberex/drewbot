
function getTimeAsStrokes() {
   var date = new Date();
   var hours = date.getHours();
   var minutes = date.getMinutes();

   if (hours < 10) {
      hours = "0" + hours;
   } else {
      hours = hours.toString();
   }
   if (minutes < 10) {
      minutes = "0" + minutes;
   } else {
      minutes = minutes.toString();
   }

   var timeString = hours + ":" + minutes;
 
   return convertToStrokes(timeString);
}

