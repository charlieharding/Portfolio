window.addEventListener("keydown", function(e) {
  // space and arrow keys
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);
//Global Variables
var consoleTime = 0;
	//Variable to count up on a game loop. Keeps track of how long the console has been running. 
	//All task timing, animations and fps based flashing, etc based on this var.	
var selection = 0;
	//Selection 0 = Name input box and enter button on sign in page.
var selectionArray = []; 
	//An array for the possible selections to activate on a page.
	//Allows for navigating through selection with the cursor keys.

var phase = 0;
	/*	The phase system. Detail each phase in the cases of the draw function.
			A page can have multiple phases but don't have a phase for each button,
			instead add each button to the selection array when they are drawn and
			set their behaviour with the button.action() method. Clear the selection
			array when the phase moves on and those buttons are no longer available.
	*/

	//IMAGES
var LM_top = new Image();
	LM_top.src = "assets/LMtop.png";
var LM_left = new Image();
	LM_left.src = "assets/LMleft.png";
var LM_front = new Image();
	LM_front.src = "assets/LMfront.png";

var thrust_left = new Image();
	thrust_left.src = "assets/thruster_left.png";
var thrust_left_A = new Image();
	thrust_left_A.src = "assets/thrust_leftA.png";
var thrust_left_B = new Image();
	thrust_left_B.src = "assets/thrust_leftB.png";
var thrust_left_C = new Image();
	thrust_left_C.src = "assets/thrust_leftC.png";
var thrust_left_D = new Image();
	thrust_left_D.src = "assets/thrust_leftD.png";

var thrust_right = new Image();
	thrust_right.src = "assets/thruster_right.png";
var thrust_right_A = new Image();
	thrust_right_A.src = "assets/thrust_rightA.png";
var thrust_right_B = new Image();
	thrust_right_B.src = "assets/thrust_rightB.png";
var thrust_right_C = new Image();
	thrust_right_C.src = "assets/thrust_rightC.png";
var thrust_right_D = new Image();
	thrust_right_D.src = "assets/thrust_rightD.png";
	
  //Constants for modelling
var IXX = 77386; //Moment of inertia about x axis (yaw)
var IYY = 728802; //Moment of inertia about y axis (pitch)
var IZZ = 732828; //Moment of inertia about z axis (roll)
var TQ = 440 / 2.15; //Torque of thruster (with F = 440N, r = 2.15m)
var RADS2_RPM2 = 60 * 60 / 2 / Math.PI; //conversion factor between rad/s^2 and rev/min^2
var REV_DEG = 360; //conversion factor between revolutions and degrees


	//Variables for position of each LM dimension
var updating = true; //To start and stop the adding to the angles on each frame.


var yaw = 0; 	//Current angle in degrees
var pitch = 13;
var roll = 3;
var y_speed = 0.1; //Current speed in RPM
var p_speed = 0.06;
var r_speed = -0.2;

var durationTimer = 0;

var duration = ''; //Duration of burn for phase 3.
var tempDur = ''; //Temporary storage of duration to calculate acceleration when original duration variable has been decremented to zero
var burnMax = 120; //Maximum duration of burn. Set this to be whatever the upper limit of burn time should be.


var thrust = [['A', 0], ['B', 0], ['C', 0], ['D', 0], ['A', 0], ['B', 0], ['C', 0], ['D', 0], ['A', 0], ['B', 0], ['C', 0], ['D', 0], ['A', 0], ['B', 0], ['C', 0], ['D', 0], ['SECONDS', duration]];
	//Array for the position and value of each thruster.

var BOOSTER_1_S02 = new task();
//BOOSTER_1_S01.test_mode = true;
BOOSTER_1_S02.draw = function(){
	function loop(){
		BOOSTER_1_S02.loop = setTimeout(function() {
        requestAnimationFrame(loop);
				//Stuff to happen
				consoleTime++;
				draw(phase);
    }, 1000 / fps);
	}

	function draw(phase){
		//Function to draw the page.
		ctx.clearRect(0, 0, c.width, c.height);
		switch(phase){
			case 0:
				//Context screen
				context('MAINTAIN PTC ROTATION', ["The LUNAR MODULE must maintain a yaw rate of 0.34 RPM so heat from the sun is evenly distributed. This is known as Passive thermal Control (PTC) or BBQ Mode.","PITCH and ROLL angles must not exceed 40 degrees from center."]);
				contextButton.draw();
				break;
			case 1:
				//Phase 1 is the overview showing all three dimensions
				taskTitle('LUNAR MODULE ORIENTATION', 61);
				container('X AXIS - YAW', 40, 110, 240, 345);
				container('Y AXIS - PITCH', 280, 110, 240, 345);
				container('Z AXIS - ROLL', 520, 110, 240, 345);
				longText(ctx, ['Use the RCS thrusters to adjust the yaw, pitch, and roll of the Lunar Module.', 'The LM requires a rotation speed of .34 RPM around the X axis to distibute heat evenly.'], 300, 500, 440, 20);
				ctx.font = '13pt apollo';
					//All the text that doesn't change
					ctx.fillText('TOP DOWN', 60, 145)
					ctx.fillText('SIDE VIEW', 300, 145)
					ctx.fillText('FRONT VIEW', 540, 145)
					ctx.fillText('Required RPM', 60, 400)
					ctx.fillText('Current', 60, 425)
					ctx.fillText('0.34', 220, 400)
					ctx.fillText('Limit (DEG)', 300, 400)
					ctx.fillText('Current', 300, 425)
					ctx.fillText('+-40.00', 430, 400)
					ctx.fillText('Limit (DEG)', 540, 400)
					ctx.fillText('Current', 540, 425)
					ctx.fillText('+-40.00', 670, 400)		
				ctx.strokeStyle = white;
				ctx.lineWidth = 1;
				ctx.beginPath();
					ctx.arc(160,250,105,0,2*Math.PI);	//Draw Yaw axis surrounding circle
					ctx.stroke();
					drawLine([160,135],[160,155],1) //Yaw 0Deg marker
					drawLine([275,250],[255,250],1) //Yaw 90Deg marker
					drawLine([160,345],[160,365],1) //Yaw 180Deg marker
					drawLine([45,250],[65,250],1) //Yaw 270Deg marker
				ctx.beginPath();
					ctx.arc(400,250,105,2*Math.PI,Math.PI);	//Draw Pitch axis surrounding circle
					ctx.lineWidth = 1;
					ctx.stroke();
					drawLine([473.4,337.7],[460.6,322.3],2) //Pitch -40Deg marker
					drawLine([326.6,337.7],[339.4,322.3],2) //Pitch 40Deg marker
				ctx.beginPath();
					ctx.arc(640,250,105,2*Math.PI,Math.PI);	//Draw Roll axis surrounding circle
					ctx.lineWidth = 1;
					ctx.stroke();
					drawLine([713.4,337.7],[700.6,322.3],2) //Roll -40Deg marker
					drawLine([566.6,337.7],[579.4,322.3],2) //Roll 40Deg marker
				adjustButton.draw(); //Adds the 'ADJUST FLIGHT' button to the page.
				if(updating){update_angles();} //Adds to the angles of each dimension based on the current speed.
				overview_draw(); //Function to draw the dynamic parts of Phase 1
				break;
			case 2:
				//Phase 2 is RCS controls page
				taskTitle('LUNAR MODULE ORIENTATION', 61);
				container('QUAD I', 40, 160, 128, 140);
					ctx.fillText('A', 80, 190)
					ctx.fillText('B', 135, 210)
					ctx.fillText('C', 125, 280)
					ctx.fillText('D', 60, 270)
				container('QUAD II', 188, 110, 128, 140);
					ctx.fillText('A', 228, 140)
					ctx.fillText('B', 283, 160)
					ctx.fillText('C', 273, 230)
					ctx.fillText('D', 208, 220)
				container('QUAD III', 484, 110, 128, 140);
					ctx.fillText('A', 518, 140)
					ctx.fillText('B', 579, 170)
					ctx.fillText('C', 564, 230)
					ctx.fillText('D', 504, 210)
				container('QUAD IV', 632, 170, 128, 140);
					ctx.fillText('A', 667, 200)
					ctx.fillText('B', 727, 230)
					ctx.fillText('C', 712, 290)
					ctx.fillText('D', 652, 270)
				ctx.font = '13pt apollo';
				ctx.fillText('FRONT', 375, 185)
				ctx.fillText('SECONDS', 685, 500)
				ctx.drawImage(LM_front, 0, 0, 332, 275, 303, 200, 200, 166);
				drawLine([168,280],[305,280],2) //Quad I to LM (1)
				drawLine([305,280],[355,255],2) //Quad I to LM (2)
				drawLine([316,230],[350,240],2) //Quad II to LM
				drawLine([484,230],[450,240],2) //Quad III to LM
				drawLine([632,280],[495,280],2) //Quad IV to LM (1)
				drawLine([495,280],[451,255],2) //Quad IV to LM (2)
				container('QUAD I', 40, 390, 127, 172);
				container('QUAD II', 167, 390, 127, 172);
				container('QUAD III', 294, 390, 127, 172);
				container('QUAD IV', 421, 390, 127, 172);
				longText(ctx,["Set % of thrust for each LM thruster.","Set burn time."],568,390,192, 20) 
				select_draw(); //Function to draw the things that change based on where the selection is.
				fireButton.draw();
				if(duration > burnMax){duration = burnMax}
				if(duration < 0){duration = 0}		
				break;
			case 3:
				if(durationTimer == 0){
					accelerate();
				}
				durationTimer++;
				if(durationTimer < tempDur*5+1){
					duration = Math.ceil(tempDur - durationTimer/5);
					
				}else{
					duration = '';
					countdown()
					durationTimer = 0;
					selection = 0;
					selectionArray = [adjustButton];
				}
				burn_update();
				taskTitle('LUNAR MODULE ORIENTATION', 61);
				container('X AXIS - YAW', 40, 110, 240, 345);
				container('Y AXIS - PITCH', 280, 110, 240, 345);
				container('Z AXIS - ROLL', 520, 110, 240, 345);
				ctx.font = '13pt apollo';
					//All the text that doesn't change
					ctx.fillText('TOP', 60, 145)
					ctx.fillText('LEFT', 300, 145)
					ctx.fillText('FRONT', 540, 145)
					ctx.fillText('Required RPM', 60, 400)
					ctx.fillText('Current', 60, 425)
					ctx.fillText('0.34', 220, 400)
					ctx.fillText('Limit (DEG)', 300, 400)
					ctx.fillText('Current', 300, 425)
					ctx.fillText('+-40.00', 430, 400)
					ctx.fillText('Limit (DEG)', 540, 400)
					ctx.fillText('Current', 540, 425)
					ctx.fillText('+-40.00', 670, 400)		
				ctx.strokeStyle = white;
				ctx.lineWidth = 1;
				ctx.beginPath();
					ctx.arc(160,250,105,0,2*Math.PI);	//Draw Yaw axis surrounding circle
					ctx.stroke();
					drawLine([160,135],[160,155],1) //Yaw 0Deg marker
					drawLine([275,250],[255,250],1) //Yaw 90Deg marker
					drawLine([160,345],[160,365],1) //Yaw 180Deg marker
					drawLine([45,250],[65,250],1) //Yaw 270Deg marker
				ctx.beginPath();
					ctx.arc(400,250,105,2*Math.PI,Math.PI);	//Draw Pitch axis surrounding circle
					ctx.lineWidth = 1;
					ctx.stroke();
					drawLine([473.4,337.7],[460.6,322.3],2) //Pitch -40Deg marker
					drawLine([326.6,337.7],[339.4,322.3],2) //Pitch 40Deg marker
				ctx.beginPath();
					ctx.arc(640,250,105,2*Math.PI,Math.PI);	//Draw Roll axis surrounding circle
					ctx.lineWidth = 1;
					ctx.stroke();
					drawLine([713.4,337.7],[700.6,322.3],2) //Roll -40Deg marker
					drawLine([566.6,337.7],[579.4,322.3],2) //Roll 40Deg marker
				overview_draw(); //Function to draw the dynamic parts of Phase 1
				container('FIRING RCS THRUSTERS', 40, 475, 720, 85);
				ctx.fillText(duration+' SECONDS REMAINING', 300, 527)
				break;
			default: console.log('Error - Invalid phase '+phase);
		}
	}

	//Phase 0
	contextButton = new button(190, 343, 203, 33,'ENTER', true);
	selectionArray.push(contextButton);
		//Add it to selection array
		contextButton.action = function(){
			//Action to run if enter button is selected
			phase = 1;
			selectionArray = [adjustButton];
			error_timer();
				//Set up the selection array for phase 1 with the adjust flight button
		}

	//Phase 1
	adjustButton = new button(40, 484, 240, 33,'ADJUST FLIGHT', true);
		adjustButton.action = function(){
			//Action to run if enter button is selected
			phase = 2;
				//Takes you to RCS control page by setting phase to 2
			selectionArray = thrust.concat(fireButton);
		}

	function overview_draw(){
		//Draw the LM top view
		var yawRad = (yaw * Math.PI)/180 //Convert to radians
		ctx.save();	//Save the current configuration of the canvas so we can restore it later and draw normally again.
			ctx.translate(160, 250); //Move the canvas to the point the image will rotate around.
			ctx.rotate(yawRad);	//Amount to rotate the image (in rad).
			ctx.drawImage(LM_top, 0, 0, 571, 579, -(160/2), -(162/2), 160, 162); //Draw the image with it's centre point over 0,0 of the new canvas position
			ctx.setLineDash([7,5])
			drawLine([0,-110],[0,110],2)
		ctx.restore(); //Return the canvas to the save point.
		//Draw the LM left view
		var pitchRad = (pitch * Math.PI)/180
		ctx.save();	
			ctx.translate(400, 250); 
			ctx.rotate(pitchRad);
			ctx.drawImage(LM_left, 0, 0, 248, 205, -(160/2), -(185/2), 160, 133);				
			ctx.setLineDash([7,5])
			drawLine([0,-100],[0,115],2)			
		ctx.restore();
		//Draw the LM front view
		var rollRad = (roll * Math.PI)/180
		ctx.save();	
			ctx.translate(640, 250); 
			ctx.rotate(rollRad);
			ctx.drawImage(LM_front, 0, 0, 332, 275, -(160/2), -(185/2), 160, 133);
			ctx.setLineDash([7,5])
			drawLine([0,-100],[0,115],2)
		ctx.restore();

		var y_text = y_speed.toFixed(2)
		var p_text;
		var r_text;
		//Adjust Pitch and Roll for displaying to the user.
			//Should better reflect the orientation of the LM this way.
		if(pitch%360 > 180){
			p_text = (pitch%360 - 360).toFixed(2)
		}else if(pitch%360 > -180 && pitch%360 <= 180){
			p_text = (pitch%360).toFixed(2)
		}else if(pitch%360 < -180){
			p_text = (pitch%360 + 360).toFixed(2)
		}
		if(roll%360 > 180){
			r_text = (roll%360 - 360).toFixed(2)
		}else if(roll%360 > -180 && roll%360 <= 180){
			r_text = (roll%360).toFixed(2)
		}else if(roll%360 < -180){
			r_text = (roll%360 + 360).toFixed(2)
		}

		var yPos = 260 - ctx.measureText(y_text).width;
		var pPos = 500 - ctx.measureText(p_text).width;
		var rPos = 740 - ctx.measureText(r_text).width;

		ctx.fillText(y_text, yPos, 425)
		ctx.fillText(p_text, pPos, 425)
		ctx.fillText(r_text, rPos, 425)

		warnings(y_text, p_text, r_text); //Draw the warning messages for exceeding limits
	}


	function warnings(y, p, r){
		//Warning Message function
			//Have to attract attention without being over the top and also have to look different to a selected button.
		if(y > 0.54){
			//This is for a margin of +- 0.2 RPM.
			//This can be changed based on difficulty of task.
			if(consoleTime%8 <= 3){
				ctx.beginPath();
				ctx.fillStyle = black;
				ctx.rect(65, 202, 190, 52)
				ctx.fill();
				ctx.strokeStyle = white;
				ctx.lineWidth = 2;
				ctx.stroke();
				ctx.fillStyle = white;
				ctx.font = '13pt apollo';
				ctx.fillText('Decrease Speed', 88, 245)
				ctx.fillStyle = white;
				ctx.font = '15pt apollo';
				ctx.fillText('WARNING', 115, 225)
			}
		}else if(y < 0.14 && y > 0){
			if(consoleTime%8 <= 3){
				ctx.beginPath();
				ctx.fillStyle = black;
				ctx.rect(65, 202, 190, 52)
				ctx.fill();
				ctx.strokeStyle = white;
				ctx.lineWidth = 2;
				ctx.stroke();
				ctx.fillStyle = white;
				ctx.font = '13pt apollo';
				ctx.fillText('Increase Speed', 88, 245)
				ctx.fillStyle = white;
				ctx.font = '15pt apollo';
				ctx.fillText('WARNING', 115, 225)
			}
		}else if(y < 0){
			//
			// Warning for if Yaw is negative.
			// Should this matter? Probably not.
			if(consoleTime%8 <= 3){
				ctx.beginPath();
				ctx.fillStyle = black;
				ctx.rect(65, 202, 190, 52)
				ctx.fill();
				ctx.strokeStyle = white;
				ctx.lineWidth = 2;
				ctx.stroke();
				ctx.fillStyle = white;
				ctx.font = '13pt apollo';
				ctx.fillText('Change Direction', 80, 245)
				ctx.fillStyle = white;
				ctx.font = '15pt apollo';
				ctx.fillText('WARNING', 115, 225)
			}
		}
		if(p > 40){
			if(consoleTime%8 <= 3){
				ctx.beginPath();
				ctx.fillStyle = black;
				ctx.rect(305, 202, 190, 52)
				ctx.fill();
				ctx.strokeStyle = white;
				ctx.lineWidth = 2;
				ctx.stroke();
				ctx.fillStyle = white;
				ctx.font = '13pt apollo';
				ctx.fillText('Decrease Pitch', 328, 245)
				ctx.fillStyle = white;
				ctx.font = '15pt apollo';
				ctx.fillText('WARNING', 355, 225)
			}
		}else if(p < -40){
			if(consoleTime%8 <= 3){
				ctx.beginPath();
				ctx.fillStyle = black;
				ctx.rect(305, 202, 190, 52)
				ctx.fill();
				ctx.strokeStyle = white;
				ctx.lineWidth = 2;
				ctx.stroke();
				ctx.fillStyle = white;
				ctx.font = '13pt apollo';
				ctx.fillText('Increase Pitch', 328, 245)
				ctx.fillStyle = white;
				ctx.font = '15pt apollo';
				ctx.fillText('WARNING', 355, 225)
			}
		}
		if(r > 40){
			if(consoleTime%8 <= 3){
				ctx.beginPath();
				ctx.fillStyle = black;
				ctx.rect(545, 202, 190, 52)
				ctx.fill();
				ctx.strokeStyle = white;
				ctx.lineWidth = 2;
				ctx.stroke();
				ctx.fillStyle = white;
				ctx.font = '13pt apollo';
				ctx.fillText('Decrease Roll', 575, 245)
				ctx.font = '15pt apollo';
				ctx.fillText('WARNING', 595, 225)
			}
		}else if(r < -40){
			if(consoleTime%8 <= 3){
				ctx.beginPath();
				ctx.fillStyle = black;
				ctx.rect(545, 202, 190, 52)
				ctx.fill();
				ctx.strokeStyle = white;
				ctx.lineWidth = 2;
				ctx.stroke();
				ctx.fillStyle = white;
				ctx.font = '13pt apollo';
				ctx.fillText('Increase Roll', 575, 245)
				ctx.font = '15pt apollo';
				ctx.fillText('WARNING', 595, 225)
			}
		}
	}


	function update_angles(){
    //Auto-decelerate pitch and roll rates to zero at the maximum rate at which they could be done manually
    var acc_yy = TQ / IYY * 2 / Math.sqrt(2) * RADS2_RPM2;
    var acc_zz = TQ / IZZ * 2 / Math.sqrt(2) * RADS2_RPM2;   
    /* if(Math.abs(p_speed) < acc_yy / (60 * fps) * 2) { p_speed = 0; }
		else if(p_speed > 0) { p_speed -= acc_yy / (60 * fps); }
    else if(p_speed < 0) { p_speed += acc_yy / (60 * fps); }
		if(Math.abs(r_speed) < acc_zz / (60 * fps) * 2) { r_speed = 0; }
    else if(r_speed > 0) { r_speed -= acc_zz / (60 * fps); }
    else if(r_speed < 0) { r_speed += acc_zz / (60 * fps); } */
		
		var adj = 2 //Slow down the auto-deceleration (Higher = slower)
		
		if(Math.abs(p_speed) < (acc_yy / (60 * fps) * 2)/adj){
			p_speed = 0; 
		}else if(p_speed > 0){ 
			p_speed -= (acc_yy / (60 * fps))/adj;
		}else if(p_speed < 0) {
			p_speed += (acc_yy / (60 * fps))/adj; 
		}
		if(Math.abs(r_speed) < (acc_zz / (60 * fps) * 2)/adj){
			r_speed = 0;
		}else if(r_speed > 0){ 
			(r_speed -= acc_zz / (60 * fps))/adj;
		}else if(r_speed < 0){ 
			(r_speed += acc_zz / (60 * fps))/adj; 
		} 
    
		var y_perFrame = (360*y_speed)/(60*fps) //Degrees per frame to increase yaw
		yaw += y_perFrame;

		var p_perFrame = (360*p_speed)/(60*fps) //Degrees per frame to increase yaw
		pitch += p_perFrame;

		var r_perFrame = (360*r_speed)/(60*fps) //Degrees per frame to increase yaw
		roll += r_perFrame;
	}
	
	//Functions for adding a bit of randomness and challenge to the task.
	function random_error(){
			if(Math.random() < 0.5){
				//Mess up Pitch
				p_speed = p_speed + (Math.random()*0.3 - 0.15)
			}else{
				//Mess up Roll
				r_speed = r_speed + (Math.random()*0.3 - 0.15)
			}
	}
	function error_timer(){
		var rand = Math.random()*12000 + 14000;
		setTimeout(function(){
			if(phase == 1){
				random_error();
				error_timer();
			}else{
				error_timer();
			}
		}, rand);
	}



	//Phase 2
	fireButton = new button(568, 527, 192, 33,'FIRE', false);
		fireButton.action = function(){
			//Action to run if enter button is selected
			phase = 3;
				//Takes you to RCS control page by setting phase to 2
			selectionArray = [];
			tempDur = duration;
			//countdown(); //Counts down the burn time. Not real time so it doesn't take too long
			fireButton.active = false;
		}


	function addInput(num){
		//function to add numbers to input
		if(duration.length > 5){
			duration = duration.substring(0,5);
		}
		duration += num;
	}


	function select_draw(){
		var x = 57.5;
		for(var i = 0; i < 16; i++){
			//Draw the bars at the bottom left
			var t = 'A';
			ctx.strokeStyle = white;
			ctx.fillStyle = white;
			if(i%4 == 1){t = 'B';};
			if(i%4 == 2){t = 'C';};
			if(i%4 == 3){t = 'D';};
			ctx.fillText(t, x + 3, 420)
			ctx.beginPath();
			if(i == selection && consoleTime%8 <= 3){
				ctx.lineWidth = 3;
				ctx.rect(x , 425, 18, 95);
			}else{
				ctx.lineWidth = 1;
				ctx.rect(x , 425, 18, 95);
			}
			ctx.stroke();
			//Draw the filled rect showing the percentage on the bar
			var h = thrust[i][1]*(95/100)
			ctx.beginPath();
			ctx.rect(x , 425 + (95 - h), 18, h);
			ctx.fill();


			x += 25
			if(i%4 == 3){x += 27}
		}


		//Draw the input box for the burn Duration
		ctx.font = '15pt apollo';
		var d = 660 - ctx.measureText(duration).width
		ctx.fillText(duration, d, 500)
		if(selection == 16 && consoleTime%8 <= 3){
			ctx.beginPath();
			ctx.lineWidth = 4;
			ctx.rect(567, 474, 107, 35);
			ctx.stroke();
		}else{
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.rect(568, 475, 105, 33);
			ctx.stroke();
		}


		if(selection < 4){
			//Statement to draw which thruster is selected
				//This should possibly be a switch statement.
			if(selection == 0 && consoleTime%8 <= 3){
				ctx.drawImage(thrust_left_A, 0, 0, 288, 370, 59, 175, 90, 115.6);
			}else if(selection == 1 && consoleTime%8 <= 3){
				ctx.drawImage(thrust_left_B, 0, 0, 288, 370, 59, 175, 90, 115.6);
			}else if(selection == 2 && consoleTime%8 <= 3){
				ctx.drawImage(thrust_left_C, 0, 0, 288, 370, 59, 175, 90, 115.6);
			}else if(selection == 3 && consoleTime%8 <= 3){
				ctx.drawImage(thrust_left_D, 0, 0, 288, 370, 59, 175, 90, 115.6);
			}else{
				ctx.drawImage(thrust_left, 0, 0, 288, 370, 59, 175, 90, 115.6);
			}
			ctx.drawImage(thrust_left, 0, 0, 288, 370, 207, 125, 90, 115.6);
			ctx.drawImage(thrust_right, 0, 0, 288, 370, 503, 125, 90, 115.6);
			ctx.drawImage(thrust_right, 0, 0, 288, 370, 651, 185, 90, 115.6);
			ctx.fillText(thrust[selection][0]+' '+thrust[selection][1]+'%', 60, 550)
		}else if(selection >= 4 && selection < 8){
			ctx.drawImage(thrust_left, 0, 0, 288, 370, 59, 175, 90, 115.6);
			if(selection == 4 && consoleTime%8 <= 3){
				ctx.drawImage(thrust_left_A, 0, 0, 288, 370, 207, 125, 90, 115.6);
			}else if(selection == 5 && consoleTime%8 <= 3){
				ctx.drawImage(thrust_left_B, 0, 0, 288, 370, 207, 125, 90, 115.6);
			}else if(selection == 6 && consoleTime%8 <= 3){
				ctx.drawImage(thrust_left_C, 0, 0, 288, 370, 207, 125, 90, 115.6);
			}else if(selection == 7 && consoleTime%8 <= 3){
				ctx.drawImage(thrust_left_D, 0, 0, 288, 370, 207, 125, 90, 115.6);
			}else{
				ctx.drawImage(thrust_left, 0, 0, 288, 370, 207, 125, 90, 115.6);
			}
			ctx.drawImage(thrust_right, 0, 0, 288, 370, 503, 125, 90, 115.6);
			ctx.drawImage(thrust_right, 0, 0, 288, 370, 651, 185, 90, 115.6);
			ctx.fillText(thrust[selection][0]+' '+thrust[selection][1]+'%', 187, 550)
		}else if(selection >= 8 && selection < 12){
			ctx.drawImage(thrust_left, 0, 0, 288, 370, 59, 175, 90, 115.6);
			ctx.drawImage(thrust_left, 0, 0, 288, 370, 207, 125, 90, 115.6);
			if(selection == 8 && consoleTime%8 <= 3){
				ctx.drawImage(thrust_right_A, 0, 0, 288, 370, 503, 125, 90, 115.6);
			}else if(selection == 9 && consoleTime%8 <= 3){
				ctx.drawImage(thrust_right_B, 0, 0, 288, 370, 503, 125, 90, 115.6);
			}else if(selection == 10 && consoleTime%8 <= 3){
				ctx.drawImage(thrust_right_C, 0, 0, 288, 370, 503, 125, 90, 115.6);
			}else if(selection == 11 && consoleTime%8 <= 3){
				ctx.drawImage(thrust_right_D, 0, 0, 288, 370, 503, 125, 90, 115.6);
			}else{
				ctx.drawImage(thrust_right, 0, 0, 288, 370, 503, 125, 90, 115.6);
			}
			ctx.drawImage(thrust_right, 0, 0, 288, 370, 651, 185, 90, 115.6);
			ctx.fillText(thrust[selection][0]+' '+thrust[selection][1]+'%', 314, 550)
		}else if(selection >= 12 && selection < 16){
			ctx.drawImage(thrust_left, 0, 0, 288, 370, 59, 175, 90, 115.6);
			ctx.drawImage(thrust_left, 0, 0, 288, 370, 207, 125, 90, 115.6);
			ctx.drawImage(thrust_right, 0, 0, 288, 370, 503, 125, 90, 115.6);
			if(selection == 12 && consoleTime%8 <= 3){
				ctx.drawImage(thrust_right_A, 0, 0, 288, 370, 651, 185, 90, 115.6);
			}else if(selection == 13 && consoleTime%8 <= 3){
				ctx.drawImage(thrust_right_B, 0, 0, 288, 370, 651, 185, 90, 115.6);
			}else if(selection == 14 && consoleTime%8 <= 3){
				ctx.drawImage(thrust_right_C, 0, 0, 288, 370, 651, 185, 90, 115.6);
			}else if(selection == 15 && consoleTime%8 <= 3){
				ctx.drawImage(thrust_right_D, 0, 0, 288, 370, 651, 185, 90, 115.6);
			}else{
				ctx.drawImage(thrust_right, 0, 0, 288, 370, 651, 185, 90, 115.6);
			}
			ctx.fillText(thrust[selection][0]+' '+thrust[selection][1]+'%', 441, 550)
		}else{
			ctx.drawImage(thrust_left, 0, 0, 288, 370, 59, 175, 90, 115.6);
			ctx.drawImage(thrust_left, 0, 0, 288, 370, 207, 125, 90, 115.6);
			ctx.drawImage(thrust_right, 0, 0, 288, 370, 503, 125, 90, 115.6);
			ctx.drawImage(thrust_right, 0, 0, 288, 370, 651, 185, 90, 115.6);
		}
	}


	//Phase 3
	function countdown(){
		phase = 1;
	}

	
	//Calculate what angles and speeds will be after the burn
  function accelerate(){
    var acc_xx = TQ / IXX * (thrust[1][1] + thrust[5][1] + thrust[9][1] + thrust[13][1] - thrust[3][1] - thrust[7][1] - thrust[11][1] - thrust[15][1]) / 100 * RADS2_RPM2;
    var acc_yy = TQ / IYY * (thrust[0][1] + thrust[6][1] + thrust[10][1] + thrust[12][1] - thrust[2][1] - thrust[4][1] - thrust[8][1] - thrust[14][1]) / Math.sqrt(2) / 100 * RADS2_RPM2;
		var acc_zz = TQ / IZZ * (thrust[2][1] + thrust[6][1] + thrust[8][1] + thrust[12][1] - thrust[0][1] - thrust[4][1] - thrust[10][1] - thrust[14][1]) / Math.sqrt(2) / 100 * RADS2_RPM2;
    
		//yaw += (y_speed * tempDur / 60 + 1/2 * acc_xx * Math.pow(tempDur / 60,2)) * REV_DEG;
		//pitch += (p_speed * tempDur / 60 + 1/2 * acc_yy * Math.pow(tempDur / 60,2)) * REV_DEG;
		//roll += (r_speed * tempDur / 60 + 1/2 * acc_zz * Math.pow(tempDur / 60,2)) * REV_DEG;
		
    y_speed += acc_xx * tempDur / 60;
    p_speed += acc_yy * tempDur / 60;
		r_speed += acc_zz * tempDur / 60;
  }

	function burn_update(){
		//Update the LM while the RCS burn is active
		
		var y_perFrame = (360*y_speed)/(60*fps) //Degrees per frame to increase yaw
		yaw += y_perFrame;

		var p_perFrame = (360*p_speed)/(60*fps) //Degrees per frame to increase yaw
		pitch += p_perFrame;

		var r_perFrame = (360*r_speed)/(60*fps) //Degrees per frame to increase yaw
		roll += r_perFrame;
	}

	BOOSTER_1_S02.input_Handler = function(params){
		for (var key in params) {
			var value = params[key];
			if(params['btn-act-enter']){
				if(phase == 0 || phase == 1){
					selectionArray[selection].action();
				}else if(phase == 2 && selection < 16){
					//Move the selection from the bars to the duration input
					selection = 16;
				}else if(phase == 2 && selection == 16){
					//Move the selection from duration input to fire button
					selection = 17;
					fireButton.active = true;
				}else if(phase == 2 && selectionArray[selection] == fireButton){
					fireButton.action();
				}
			}
			if(params['btn-num-back']){
				if(phase == 2){ 
					duration = duration.toString();
					duration = duration.substring(0, duration.length - 1); 
				};
			}
			if(params['btn-nav-up']){
				if(phase == 2 && selection < 16 && thrust[selection][1] < 100){
					thrust[selection][1]++;
				}else if(phase == 2 && selection == 16 && duration < burnMax){
					duration++;
				}
			}
			if(params['btn-nav-down']){
				if(phase == 2 && selection < 16 && thrust[selection][1] > 0){
					thrust[selection][1]--;
				}else if(phase == 2 && selection == 16 && duration > 0){
					duration--;
				}
			}
			if(params['btn-nav-left']){
				if(phase == 2){
					selection--;
					if(selection < 0){
						selection = selectionArray.length - 1;
					}
					if(selectionArray[selection] == fireButton){
						fireButton.active = true;
					}else{
						fireButton.active = false;
					}
				}
			}
			if(params['btn-nav-right']){
				if(phase == 2){
					selection++;
					selection = selection%selectionArray.length
					if(selectionArray[selection] == fireButton){
						fireButton.active = true;
					}else{
						fireButton.active = false;
					}
				}
			}
			if(params['btn-num-0']){
				if(phase == 2 && selection == 16){ addInput('0') };
			}
			if(params['btn-num-1']){
				if(phase == 2 && selection == 16){ addInput('1') };
			}
			if(params['btn-num-2abc']){
				if(phase == 2 && selection == 16){ addInput('2') };
			}
			if(params['btn-num-3def']){
				if(phase == 2 && selection == 16){ addInput('3') };
			}
			if(params['btn-num-4ghi']){
				if(phase == 2 && selection == 16){ addInput('4') };
			}
			if(params['btn-num-5jkl']){
				if(phase == 2 && selection == 16){ addInput('5') };
			}
			if(params['btn-num-6mno']){
				if(phase == 2 && selection == 16){ addInput('6') };
			}
			if(params['btn-num-7pqrs']){
				if(phase == 2 && selection == 16){ addInput('7') };
			}
			if(params['btn-num-8tuv']){
				if(phase == 2 && selection == 16){ addInput('8') };
			}
			if(params['btn-num-9wxyz']){
				if(phase == 2 && selection == 16){ addInput('9') };
			}
			if(params['btn-num-period']){
				if(phase == 2 && selection == 16){ addInput('.') };
			}
			if(params['btn-act-reset']){ //Delete
			}
		}
	}

	if(!BOOSTER_1_S02.test_mode){
		a13.registerHandler('io_change', BOOSTER_1_S02.input_Handler);
		a13.unsubscribeFromAllDataChanges();
	}else{
		window.onkeydown = function(e){
			//RETRO_12_PM00.input_Handler(keyTest(e.keyCode))
			BOOSTER_1_S02.input_Handler(keyTest(e.keyCode))
		}
	}

	//Start the task
	loop();
}