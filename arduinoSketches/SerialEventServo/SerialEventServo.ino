
#include <Servo.h>

Servo leftServo;  // create left servo
Servo rightServo;  // create right servo
Servo lifterServo;  // create lifter servo

String inputString = "";         // a string to hold incoming data
boolean stringComplete = false;  // whether the string is complete

int leftCounter;
int rightCounter;

void setup() {
  lifterServo.attach(9);
  leftServo.attach(10);
  rightServo.attach(11);
  
  lifterServo.write(90);
  leftServo.write(90);
  rightServo.write(90);
  
  leftCounter = 40;
  rightCounter = 120;
  
  // initialize serial:
  Serial.begin(9600);
  // reserve 200 bytes for the inputString:
  inputString.reserve(200);
  pinMode(13, OUTPUT);
}

void loop() {
//  
//  lifterServo.write(90);
//  leftServo.write(90);
//  rightServo.write(90);
//  return;
  // print the string when a newline arrives:
  if (stringComplete) {
    Serial.println(inputString);
    
    if(inputString == "on\n") {
      digitalWrite(13, HIGH);
    }
    if(inputString == "off\n") {
      digitalWrite(13, LOW);
    }
    if(inputString == "line\n") {
      leftServo.write(leftCounter);
      rightServo.write(rightCounter);
      leftCounter++;
      rightCounter--;
    }
    
    if(leftCounter > 90) {
      leftCounter = 40;
    }
    if(rightCounter < 90) {
      rightCounter = 120;
    }
    
    inputString = "";
    stringComplete = false;
  }
}

/*
  SerialEvent occurs whenever a new data comes in the
 hardware serial RX.  This routine is run between each
 time loop() runs, so using delay inside loop can delay
 response.  Multiple bytes of data may be available.
 */
void serialEvent() {
  while (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read();
    // add it to the inputString:
    inputString += inChar;
    // if the incoming character is a newline, set a flag
    // so the main loop can do something about it:
    if (inChar == '\n') {
      stringComplete = true;
    }
  }
}


