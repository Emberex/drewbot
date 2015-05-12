
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
  
  if (stringComplete) {
    Serial.println(inputString);
    
    String servoId = inputString.substring(0, 1);
    int servoPosition = inputString.substring(1, inputString.indexOf('\n')).toInt();
    servoId.toLowerCase();
    
    if(servoId == "l") {
      Serial.println(servoId);
      leftServo.write(servoPosition);
    } else if(servoId == "r") {
      Serial.println(servoId);
      rightServo.write(servoPosition);
    } else if(servoId == "i") {
      Serial.println(servoId);
      lifterServo.write(servoPosition);
    }
    Serial.println(servoPosition);
    
    inputString = "";
    stringComplete = false;
  }
}

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
