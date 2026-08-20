---
title: "Designing a Smart Blind Stick Using Arduin Uno"
date: 2023-07-23
authors:
- Prince Foysal (EEE, RUET), Amit Hasan (EEE, RUET), Towsif-E-Khuda (EEE, RUET)
class: "Project"
math: true
---
### Abstract
In this project, we developed a smart stick for visually impaired people using Arduino Uno, ultrasonic sensors, haptic motor, and buzzer.

### What Is a Blind Stick (White Cane)?
A blind stick, formally called a white cane, is a stuff used by the blind or visually immpaired people to detect any obstacles surrounding them. It is equiped with ultrasonic sensor which scans any obstacle near the user, and makes sound through buzzer, and makes some vibration through haptic motor at the holding end of the stick. 

<div style="text-align: center">
	<img alt="A blind man holding a smart cane." src="/images/blind_man_with_cane.jpg" width="400" style="padding:15px" />
	<p>Fig. 01: A blind mand using his smart cane to detect obstacles in front him. <a target="_blank" href="https://www.skyfilabs.com/project-ideas/smart-walking-cane">[1]</a></p>
</div>

<br>

### Required Components
<div style="padding-left: 20px">
	<ol>
		<li> Arduino Uno </li>
		<li> Ultrasonic Sensors </li>
		<li> Buzzer </li>
		<li> Haptic Motor</li>
		<li> Wooden Stick</li>
		<li> Connecting Wires</li>
		<li> 9V Battery</li>
	</ol>
</div>

<br>

### Circuit Diagram

<div style="text-align: center">
	<img alt="Projcte circtui diagram" src="/images/project01_ckt.jpg" width="900" style="padding:15px" />
	<p>Fig. 02: Project circuit diagram drawn in Tinkercad software</p>
</div>

<div style="text-align: center">
	<img alt="Projcte prototype drawn in Tinkercad" src="/images/project01_prot.jpg" width="900" style="padding:15px" />
	<p>Fig. 03: Project prototype drawn in Tinkercad software</p>
</div>

<br>

### Images
<div style="display: flex; gap: 10px; justify-content: center; padding: 15px">
  <img src="/images/project01_photo01.jpg" alt="First Image" style="max-width: 40%; height: 400px;">
  <img src="/images/project01_photo02.jpg" alt="Second Image" style="max-width: 40%; height: 400px;">
</div>
<p style="text-align: center">Fig. 03: Project prototype drawn in Tinkercad software</p>


<br>

### Working Principle
The smart blind stick is equipped with two ultrasonic sensors. The ultrasonic
sensor is the heart of this device. Here, the working principle of smart blind stick is described below:
<ol style="padding-left: 20px">
	<li>
		Ultrasonic sensor detects obstacle in front of it by processing ultrasonic sound. It has two parts – a sender and a receiver. The sender part sends a high frequency signal along its forward direction. As soon
		as the sender stops sending sound the receiver starts to receive that reflected sound. Then measure the time
		required to travel the path. If the required time is T seconds, the distance can be calculated by letting the speed of sound at $20\ ^\circ C$ be $343\ ms^{-1}$. <br>
				$$ Distance = {{343 \times T} \over 2}\ m$$
	</li>
	<li>
		If the distance is below the predefined range, then the Arduino produces sound and vibration
		using the buzzer and the vibration motor, respectively, to alert the user. The buzzer starts making
		sound when the distance between the user and the obstacle is below 1 m and continues until the
		user moves out of range. On the other hand, the vibration motor activates when the obstacle is
		within 67 cm from the user. In summary, the buzzer alerts the user to slow down, while the
		vibration motor signals the user to stop and check what is in front by moving the stick forward.
	</li>
</ol>

### Arduino Firmware
```C
	#define BUZZER_PIN 8 // 8
	#define VIBRATION_PIN 9 // 9
	#define MAX_RANGE 100
	#define MAX_VIBRATION MAX_RANGE
	const int trigPin1 = 10;
	const int echoPin1 = 11;
	long duration1;
	int distance1, prev_dist1;
	const int trigPin2 = 12;
	const int echoPin2 = 13;
	long duration2;
	int distance2, prev_dist2;
	void setup() {
		pinMode(trigPin1, OUTPUT); // Sets the trigPin1 as an Output
		pinMode(echoPin1, INPUT); // Sets the echoPin1 as an Input
		pinMode(trigPin2, OUTPUT); // Sets the trigPin2 as an Output
		pinMode(echoPin2, INPUT); // Sets the echoPin2 as an Input
		pinMode(BUZZER_PIN, OUTPUT);
		pinMode(BUZZER_PIN, OUTPUT);pinMode(VIBRATION_PIN, OUTPUT);
		Serial.begin(9600); // Starts the serial communication
	}
		long readUltrasonicSensor(int trigPin, int echoPin) {
		digitalWrite(trigPin, LOW);
		delayMicroseconds(2);
		digitalWrite(trigPin, HIGH);
		delayMicroseconds(5);
		digitalWrite(trigPin, LOW);
		return pulseIn(echoPin, HIGH, 30000); // Timeout of 30ms (30,000 microseconds)
	}
	void loop() {
		// First Ultrasonic Sensor
		duration1 = readUltrasonicSensor(trigPin1, echoPin1);
		distance1 = duration1 * 0.034 / 2;
		Serial.print("Distance1: ");
		Serial.println(distance1);
		delay(100);
		// Second Ultrasonic Sensor
		duration2 = readUltrasonicSensor(trigPin2, echoPin2);
		distance2 = duration2 * 0.034 / 2;
		Serial.print("Distance2: ");
		Serial.println(distance2);
		if(distance1 < MAX_RANGE){
			tone(BUZZER_PIN, 2000);
		if(distance1 < MAX_RANGE * 2 / 3){
			digitalWrite(VIBRATION_PIN, HIGH);
		}
		delay(50);
		digitalWrite(VIBRATION_PIN, LOW);
		}
		else{
			noTone(BUZZER_PIN);
			delay(10);
		}
		delay(10);
		if(distance2 < MAX_RANGE){
			tone(BUZZER_PIN, 1000);
		if(distance2 < MAX_RANGE * 2 / 3){
			digitalWrite(VIBRATION_PIN, HIGH);
		}
		delay(50);
		digitalWrite(VIBRATION_PIN, LOW);
		}
		else{
			noTone(BUZZER_PIN);
			delay(10);
		}
		delay(10);
	}
```
