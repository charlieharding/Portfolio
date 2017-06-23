window.addEventListener("keydown", function(e) {
  // space and arrow keys
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);	
//Global Variables

//Current correct answer is 319.8

var consoleTime = 0;
var selection = 0;
var selectionArray = []; 
var phase = 0;
	
var sims = [];
var pressActive = true;
var input = '';
var num;

//Images
var earthImg = new Image();
	earthImg.src = "assets/earthArctic.png";
	

//Calculation Vars
	var calcStepMax = 2500;
	var calcStepMin = 1;
	var calcStep;
	var errorTol = 1e-4;
	var initOrbit = 190e3; // of rocket in m 
	var initAngle = -3.3 / 5; // * PI of moon in radians
	var massOfEarth = 5.972e24; // in kg
	var massOfMoon  = 7.34767309e22; // in kg
	var diameterOfEarth = 12742e3; // in m
	var reEntryRadius = 100e3; // in m
	var diameterOfMoon = 3474.8e3; // in m
	var distanceOfMoon = 384400e3; // in m
	var angularVelocityOfMoon = 2.66e-6; // in rad/s
	var G = 6.67384e-11;
	var trajLeft  = -2e8;
	var trajTop   = -4e8;
	var trajWidth = 5e8;
	var rocketV;
	var rocketP;
	var moonP;
	var moonV;
	var traj = new Array();
	var stillGoing = false;
	var isStepping = false;
	var hasStarted = false;
	var lostInSpace = false;
	var gotReEntry = false;
	var fuelEmpty = false;
	var hitMoon = false;
	var time;
	//delta v constants and variables 
	var ThrustF = 889644.3; // N
	var Craftmass = 88980; //kg S B IV Rocket
	var deltaVReq = 3181.22808;//m/s
	var deltaV =0;
	var i = 0;
	var perSucess = 0;
	var ResultString="";
	//input variables
	var burn = "";
	var istopped = true;
	var TLI_timeout;

	var scale = 600/(1.2*(diameterOfMoon/2+distanceOfMoon+diameterOfEarth/2));

var FIDO_12_PM01 = new task();
FIDO_12_PM01.draw = function(){
	input = '';
	
	function loop(){
		FIDO_12_PM01.loop = setTimeout(function() {
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
				context('TRANS-LUNAR INSERTION SIMULATION', "Simulate the Apollo craft's injection into a cruise on the trajectory that will bring Apollo to the moon (The trans-lunar coast).");
				contextButton.draw();
				break;
			case 1:
				taskTitle("TRANS-LUNAR INSERTION SIMULATION", 61);
				container('SIMULATION', 40, 110, 720, 282)
				container('INPUT', 484, 412, 276, 148)
				simButton.draw();
				ctx.fillStyle = white;
				//Adding input box. Line width flashes if selected (pressActive == true)
				ctx.beginPath();
				if(pressActive == true){
					if(consoleTime%8 <= 3){
						ctx.rect(505, 464, 108, 30);
						ctx.lineWidth = 4;
					}else{
						ctx.rect(504, 464, 110, 30);
						ctx.lineWidth = 2;
					}
					ctx.stroke();
				}else{
					ctx.rect(504, 464, 110, 30);
					ctx.lineWidth = 2;
					ctx.stroke();
				}
				ctx.font = '13pt apollo';
				ctx.fillText('SECONDS', 634, 488);
				ctx.fillText('S-IVB engine burn time', 504, 446);
				ctx.font = '15pt apollo';
				var w = ctx.measureText(input);
				ctx.fillText(input, 604 - w.width, 486);
				if(sims.length > 0){
					container('PREVIOUS SIMULATIONS', 40, 412, 424, 148)
					ctx.font = '13pt apollo';
					for(var i = 0; i < sims.length && i < 4; i++){
						var t;
						ctx.fillText(sims[i][0], 60, 450 + i*30);
						if(sims[i][1] == 0){
							t = 'SUCCESS'
							ctx.fillText('Craft re-entered', 240, 450 + i*30);
						}else if(sims[i][1] == 1){
							t = 'FAIL'
							ctx.fillText('Lost in space', 240, 450 + i*30);
						}else if(sims[i][1] == 2){
							t = 'FAIL'
							ctx.fillText('Collided with moon', 240, 450 + i*30);
						}
						ctx.fillText(t, 150, 450 + i*30);
					}
				}else{
					ctx.font = '13pt apollo';
					container('SIMULATOR INSTRUCTIONS', 40, 412, 424, 148);
					wrapText(ctx, "Simulate various outcomes of the trans-lunar injection (TLI) by setting the burn duration of the S-IVB's J-2 engine.", 60, 450, 384, 22);
				}
				initDynamic();
				drawEarth();
				wrapText(ctx, 'LUNAR ORBIT', 670, 135, 70, 20)
				break;
			case 2:
				taskTitle("TRANS-LUNAR INSERTION SIMULATION", 61);
				container('SIMULATION', 40, 110, 720, 282)
				container('INPUT', 484, 412, 276, 148)
				simButton.draw();
				ctx.fillStyle = white;
				//Adding input box. Line width flashes if selected (pressActive == true)
				ctx.beginPath();
				if(pressActive == true){
					if(consoleTime%8 <= 3){
						ctx.rect(505, 464, 108, 30);
						ctx.lineWidth = 4;
					}else{
						ctx.rect(504, 464, 110, 30);
						ctx.lineWidth = 2;
					}
					ctx.stroke();
				}else{
					ctx.rect(504, 464, 110, 30);
					ctx.lineWidth = 2;
					ctx.stroke();
				}
				
				if(consoleTime%8 <= 1){
					ctx.font = '10pt apollo';
					ctx.fillText('PROCESSING', 60, 135);
				}else if(consoleTime%8 <= 3 && consoleTime%8 > 1){
					ctx.font = '10pt apollo';
					ctx.fillText('PROCESSING.', 60, 135);
				}else if(consoleTime%8 <= 5 && consoleTime%8 > 3){
					ctx.font = '10pt apollo';
					ctx.fillText('PROCESSING..', 60, 135);
				}else if(consoleTime%8 > 4){
					ctx.font = '10pt apollo';
					ctx.fillText('PROCESSING...', 60, 135);
				}
				ctx.font = '13pt apollo';
				ctx.fillText('SECONDS', 634, 488);
				ctx.fillText('S-IVB engine burn time', 504, 446);
				ctx.font = '15pt apollo';
				var w = ctx.measureText(input);
				ctx.fillText(input, 604 - w.width, 486);
				if(sims.length > 0){
					container('PREVIOUS SIMULATIONS', 40, 412, 424, 148)
					ctx.font = '13pt apollo';
					ctx.fillText(sims[0][0], 60, 450);
					for(var i = 1; i < sims.length && i < 4; i++){
						var t;
						ctx.fillText(sims[i][0], 60, 450 + i*30);
						if(sims[i][1] == 0){
							t = 'SUCCESS'
							ctx.fillText('Craft re-entered', 240, 450 + i*30);
						}else if(sims[i][1] == 1){
							t = 'FAIL'
							ctx.fillText('Lost in space', 240, 450 + i*30);
						}else if(sims[i][1] == 2){
							t = 'FAIL'
							ctx.fillText('Collided with moon', 240, 450 + i*30);
						}
						ctx.fillText(t, 150, 450 + i*30);
					}
				}else{
					container('SIMULATOR INSTRUCTIONS', 40, 412, 424, 148)
				}
				drawEarth();
				drawMoon();
				if(stillGoing){
					drawCraft();
					animate();
				}
				break;
			case 3:
				pressActive = false;
				ctx.save();
				ctx.globalAlpha = .4;
					taskTitle("TRANS-LUNAR INSERTION SIMULATION", 61);
					container('SIMULATION', 40, 110, 720, 282)
					container('INPUT', 484, 412, 276, 148)
					simButton.draw();
					ctx.fillStyle = white;
					//Adding input box. Line width flashes if selected (pressActive == true)
					ctx.beginPath();
					if(pressActive == true){
						if(consoleTime%8 <= 3){
							ctx.rect(505, 464, 108, 30);
							ctx.lineWidth = 4;
						}else{
							ctx.rect(504, 464, 110, 30);
							ctx.lineWidth = 2;
						}
						ctx.stroke();
					}else{
						ctx.rect(504, 464, 110, 30);
						ctx.lineWidth = 2;
						ctx.stroke();
					}
					ctx.font = '13pt apollo';
					ctx.fillText('SECONDS', 634, 488);
					ctx.fillText('S-IVB engine burn time', 504, 446);
					ctx.font = '15pt apollo';
					var w = ctx.measureText(input);
					ctx.fillText(input, 604 - w.width, 486);
					if(sims.length > 0){
						container('PREVIOUS SIMULATIONS', 40, 412, 424, 148)
						ctx.font = '13pt apollo';
					for(var i = 0; i < sims.length && i < 4; i++){
						var t;
						ctx.fillText(sims[i][0], 60, 450 + i*30);
						if(sims[i][1] == 0){
							t = 'SUCCESS'
							ctx.fillText('Craft re-entered', 240, 450 + i*30);
						}else if(sims[i][1] == 1){
							t = 'FAIL'
							ctx.fillText('Lost in space', 240, 450 + i*30);
						}else if(sims[i][1] == 2){
							t = 'FAIL'
							ctx.fillText('Collided with moon', 240, 450 + i*30);
						}
						ctx.fillText(t, 150, 450 + i*30);
					}
					}else{
						container('SIMULATOR INSTRUCTIONS', 40, 412, 424, 148)
					}
					drawEarth();
					ctx.drawImage(hash, 0, 0, 800, 600, 0, 0, 800, 600)
				ctx.restore();
				ctx.beginPath();
				ctx.fillStyle = black;
				ctx.rect(195, 110, 410, 370);
				ctx.fill();
				container('RESULTS', 195, 110, 410, 370);
				ctx.fillStyle = white;
				ctx.font = '13pt apollo';
				ctx.fillText('SIMULATION SETTINGS', 235, 150);
				ctx.fillText('Burn duration', 235, 180);
				ctx.fillText(num + ' s', 404, 180);
				ctx.fillText('Delta V', 235, 205);
				ctx.fillText(String(deltaV).substr(0,6)+' m/s', 404, 205);
				drawLine([235,220],[565,220],2);
				ctx.fillText('OUTCOME', 235, 255);
				if(gotReEntry){
					ctx.fillText('Successful Re-entry', 235, 285);
					ctx.save();
						ctx.globalAlpha = .4;
						ctx.drawImage(hash, 235, 305, 20, 20, 235, 305, 20, 20)
						ctx.drawImage(hash, 235, 335, 20, 20, 235, 335, 20, 20)
						ctx.drawImage(hash, 235, 355, 20, 20, 235, 365, 20, 20)
					ctx.restore();
				}else{
					ctx.fillText('Mission failure', 235, 285);
				}
				ctx.fillText('Lost in space', 265, 320);
				ctx.beginPath();
				ctx.rect(235, 305, 20, 20);
				if(lostInSpace){
					ctx.fill();
				}else if(!lostInSpace && gotReEntry){
					ctx.save();
						ctx.globalAlpha = .4;
						ctx.stroke();
					ctx.restore();
				}else{
					ctx.stroke();
				}
				ctx.fillText('Collided with moon', 265, 350);
				ctx.beginPath();
				ctx.rect(235, 335, 20, 20);
				if(hitMoon){
					ctx.fill();
				}else if(!hitMoon && gotReEntry){
					ctx.save();
						ctx.globalAlpha = .4;
						ctx.stroke();
					ctx.restore();
				}else{
					ctx.stroke();
				}
				ctx.fillText('S-IVB out of fuel', 265, 380);
				ctx.beginPath();
				ctx.rect(235, 365, 20, 20);
				if(fuelEmpty){
					ctx.fill();
				}else if(!fuelEmpty && gotReEntry){
					ctx.save();
						ctx.globalAlpha = .4;
						ctx.stroke();
					ctx.restore();
				}else{
					ctx.stroke();
				}
				reSim_Button.draw();
				break;
			default: console.log('Error - Invalid phase '+phase);
		}
	}
	
	//Phase 0
	contextButton = new button(190, 313, 203, 33,'ENTER', true);
	selectionArray.push(contextButton);
		//Add it to selection array
		contextButton.action = function(){
			//Action to run if enter button is selected
			phase = 1;
			selectionArray = [simButton];
		}
	
	//Phase 1
	simButton = new button(504, 507, 203, 33,'SIMULATE', false);
		//Add it to selection array
		simButton.action = function(){
			//Action to run if enter button is selected
			num = parseFloat(input);
				//Converts input to an interger.
			burn = num + 0.2;
				//Adds 0.2 to the var before using it in calculations so that the correct number is harder to find
				//eg. is 319.8 not 320
				//Can be changed to two decimal places for added difficulty
			num = num.toFixed(2);
				//Adds two decimal places to the input number so that the displays will hint that decimal places can be added
			sims.unshift([num]);
				//Adds to the beginning of the array of stored inputs so that the latest will be displayed.
			calculate();
			phase = 2;
			stillGoing = true;
			if(num > 417.8){
				//Arbitrary number to determine if fuel was exhausted. 
				fuelEmpty = true;
			}else{
				fuelEmpty = false;
			}
		}
		
	function addInput(num){
		//function to add numbers to input
			if(input.length > 5){
				input = input.substring(0,5);
			}
			input += num;
	}
	
	function calculate(){
		var accleration = ThrustF/Craftmass;
		deltaV = accleration*burn;
		initDynamic();
		rocketV.x+=deltaV;
	}
	
	function initDynamic() {
		//sets variables up to begin simulation
		calcStep = (calcStepMin + calcStepMax) / 2.0;
		time=0;
		rocketP = {x: 0, y: diameterOfEarth / 2.0 + initOrbit}; // Initially in earth parking orbit
		tangV = Math.sqrt(G * massOfEarth / (diameterOfEarth / 2.0 + initOrbit));
		rocketV = {x: tangV, y: 0};
		traj.length = 0;

		moonP = {x: 0, y: 0, theta: initAngle * Math.PI};
		moonP.x = distanceOfMoon * Math.cos(moonP.theta);
		moonP.y = distanceOfMoon * Math.sin(moonP.theta);
		magV = distanceOfMoon * angularVelocityOfMoon;
		moonV = {x: -magV * Math.sin(moonP.theta), y: magV * Math.cos(moonP.theta)};
		
		lostInSpace = false;
		gotReEntry = false;
		hitMoon = false;
		stillGoing = true;
		time = 0;
	}
	
	
	function drawEarth(){
		EarthRadius=diameterOfEarth/2;
		ctx.beginPath();
		ctx.strokeStyle = white;
		ctx.arc((3*EarthRadius*scale)+150,250,15,0,2*Math.PI);
		ctx.drawImage(earthImg, 0, 0, 120, 93, (3*EarthRadius*scale)+130, 235, 40, 31);
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.save()
			ctx.beginPath()
			ctx.rect(40,110, 720, 282);
			ctx.clip();
			ctx.closePath();
			ctx.beginPath();
			ctx.arc((3*EarthRadius*scale)+150,250,487,0,2*Math.PI);
			ctx.lineWidth = 1;
			ctx.setLineDash([5,5]);
			ctx.stroke();
		ctx.restore();
	}
	
	function drawMoon(){
		MoonRadius=diameterOfMoon/2;
		ctx.fillStyle = white;
		var x = ((3*EarthRadius-moonP.y)*scale)+150
		var y = 250-moonP.x*scale
		if(x > 40 && x < 720 && y > 110 && y < 392){
			ctx.beginPath();
			ctx.arc(x,y,MoonRadius*scale,0,2*Math.PI);
			ctx.closePath();
			ctx.fill();
			ctx.beginPath();
			ctx.arc(x,y,10,0,2*Math.PI);
			ctx.lineWidth = 1;
			ctx.closePath();
			ctx.stroke();
		}
	}
	
	function drawCraft(){
		ctx.beginPath();
		ctx.strokeStyle = white;
		ctx.fillStyle = white;
		var x = (-rocketP.y*scale+3*EarthRadius*scale)+150;
		var y = 250-rocketP.x*scale;
		if(x > 40 && x < 720 && y > 110 && y < 392){
			ctx.beginPath();
			ctx.arc(x,y,1.5,0,2*Math.PI);
			ctx.fill();
			ctx.beginPath();
			ctx.arc(x,y,10,0,2*Math.PI);
			ctx.lineWidth = 1;
			ctx.stroke();
		}
	}
	
	function forces(rs, rocketP, rocketV, moonP) {
		//determines forces acting on the rocket
		var x = rocketP.x;
		var y = rocketP.y;
		var vx = rocketV.x;
		var vy = rocketV.y;
		var rEsqr = rs.rEsqr;
		var rE    = rs.rE;
		var rMsqr = rs.rMsqr;
		var rM    = rs.rM;
		var aE = G * massOfEarth / rEsqr;
		var xM = moonP.x;
		var yM = moonP.y;			
		var aM = G * massOfMoon / rMsqr;
		var cosangE = x / rE;
		var sinangE = y / rE;
		var aEx = aE * cosangE;
		var aEy = aE * sinangE;	
		var cosangM = (xM - x) / rM;
		var sinangM = (yM - y) /rM;
		var aMx = aM * cosangM;
		var aMy = aM * sinangM;
		var ax = aMx - aEx;
		var ay = aMy - aEy;
		return {dx: vx, dy: vy, dvx: ax, dvy: ay};
	}
	
	function animate() {
		//numerical integration of rocket position and velocity
		var x = rocketP.x;
		var y = rocketP.y;
		var rEsqr = x * x + y * y;
		var rE = Math.sqrt(rEsqr);
		var xM = moonP.x;
		var yM = moonP.y;
		var rMsqr = (xM - x) * (xM - x) + (yM - y) * (yM - y);
		var rM = Math.sqrt(rMsqr);
		var step = calcStep;
		var tooSmall = true;
		var tooBig   = true;
		var rocketPFull;
		var rocketVFull;
		var moonPFull;
		var moonVFull;
		var rocketP1;
		var rocketV1;
		var moonP1;
		var moonV1;
		var rocketP2;
		var rocketV2;
		var moonP2;
		var moonV2;
		var diffRP = {x: 0.0, y: 0.0};
		var diffRV = {x: 0.0, y: 0.0};
		var diffMP = {x: 0.0, y: 0.0};
		var diffMV = {x: 0.0, y: 0.0};	
		var rocketPEst;
		var rocketVEst;
		var moonPEst;
		var moonVEst;
		var normDiff;
		var normEst;
		
		delta1 = forces({rEsqr: rEsqr, rE: rE, rMsqr: rMsqr, rM: rM}, rocketP, rocketV, moonP, moonV);
		rocketP1 = {x: rocketP.x, y: rocketP.y};
		rocketV1 = {x: rocketV.x, y: rocketV.y};
		moonP1   = {theta: moonP.theta, x: moonP.x, y: moonP.y};
		rocketP1.x += step * delta1.dx;
		rocketP1.y += step * delta1.dy;
		rocketV1.x += step * delta1.dvx;
		rocketV1.y += step * delta1.dvy;
		moonP1.theta += step * angularVelocityOfMoon;
		moonP1.x = distanceOfMoon * Math.cos(moonP1.theta);
		moonP1.y = distanceOfMoon * Math.sin(moonP1.theta);
		magV = distanceOfMoon * angularVelocityOfMoon;
		moonV1 = {x: -magV * Math.sin(moonP1.theta), y: magV * Math.cos(moonP1.theta)};

		while (tooSmall || tooBig) {
			// Get Y1
			rocketPFull = {x: rocketP1.x, y: rocketP1.y};
			rocketVFull = {x: rocketV1.x, y: rocketV1.y};
			moonPFull   = {theta: moonP1.theta, x: moonP1.x, y: moonP1.y};
			moonVFull   = {x: moonV1.x, y: moonV1.y};

			// Get first part of Y2
			rocketP1 = {x: rocketP.x, y: rocketP.y};
			rocketV1 = {x: rocketV.x, y: rocketV.y};
			moonP1   = {theta: moonP.theta, x: moonP.x, y: moonP.y};
				rocketP1.x += step * delta1.dx / 2.0;
				rocketP1.y += step * delta1.dy / 2.0;
				rocketV1.x += step * delta1.dvx / 2.0;
				rocketV1.y += step * delta1.dvy / 2.0;
				moonP1.theta += step * angularVelocityOfMoon / 2.0;
					moonP1.x = distanceOfMoon * Math.cos(moonP1.theta);
					moonP1.y = distanceOfMoon * Math.sin(moonP1.theta);
					magV = distanceOfMoon * angularVelocityOfMoon;
					moonV1 = {x: -magV * Math.sin(moonP1.theta), y: magV * Math.cos(moonP1.theta)};

			// Get Y2
			delta2 = forces({rEsqr: rEsqr, rE: rE, rMsqr: rMsqr, rM: rM}, rocketP1, rocketV1, moonP1, moonV1);
			rocketP2 = {x: rocketP1.x, y: rocketP1.y};
			rocketV2 = {x: rocketV1.x, y: rocketV1.y};
			moonP2   = {theta: moonP1.theta, x: moonP1.x, y: moonP1.y};
				rocketP2.x += step * delta2.dx / 2.0;
				rocketP2.y += step * delta2.dy / 2.0;
				rocketV2.x += step * delta2.dvx / 2.0;
				rocketV2.y += step * delta2.dvy / 2.0;
				moonP2.theta += step * angularVelocityOfMoon / 2.0;
					moonP2.x = distanceOfMoon * Math.cos(moonP2.theta);
					moonP2.y = distanceOfMoon * Math.sin(moonP2.theta);
					magV = distanceOfMoon * angularVelocityOfMoon;
					moonV2 = {x: -magV * Math.sin(moonP2.theta), y: magV * Math.cos(moonP2.theta)};
			
			// Get Y
			rocketPEst = {x: (16 * rocketP2.x - rocketPFull.x) / 15.0,
										y: (16 * rocketP2.y - rocketPFull.y) / 15.0};
			rocketVEst = {x: (16 * rocketV2.x - rocketVFull.x) / 15.0,
										y: (16 * rocketV2.y - rocketVFull.y) / 15.0};
			moonPEst   = {theta: (16 * moonP2.theta - moonPFull.theta) / 15.0,
										x: (16 * moonP2.x - moonPFull.x) / 15.0,
										y: (16 * moonP2.y - moonPFull.y) / 15.0};
			moonVEst   = {x: (16 * moonV2.x - moonVFull.x) / 15.0,
										y: (16 * moonV2.y - moonVFull.y) / 15.0};
			
			// Check error
			
			// Get Y2 - Y1
			diffRP.x = rocketP2.x - rocketPFull.x;
			diffRP.y = rocketP2.y - rocketPFull.y;
			diffRV.x = rocketV2.x - rocketVFull.x;
			diffRV.y = rocketV2.y - rocketVFull.y;
			diffMP.theta = moonP2.theta - moonPFull.theta;
			diffMP.x = moonP2.x - moonPFull.x;
			diffMP.y = moonP2.y - moonPFull.y;
			diffMV.x = moonV2.x - moonVFull.x;
			diffMV.y = moonV2.y - moonVFull.y;
			
			// Get ||Y2 - Y1||
			normDiff = Math.sqrt(diffRP.x * diffRP.x +
								 diffRP.y * diffRP.y +
								 diffRV.x * diffRV.x +
								 diffRV.y * diffRV.y +
								 diffMP.theta * diffMP.theta +
								 diffMP.x * diffMP.x +
								 diffMP.y * diffMP.y +
								 diffMV.x * diffMV.x +
								 diffMV.y * diffMV.y);
			// Get ||Y||
			normEst = Math.sqrt(rocketPEst.x * rocketPEst.x +
									rocketPEst.y * rocketPEst.y +
									rocketVEst.x * rocketVEst.x +
									rocketVEst.y * rocketVEst.y +
									moonPEst.theta * moonPEst.theta +
									moonPEst.x * moonPEst.x +
									moonPEst.y * moonPEst.y +
									moonVEst.x * moonVEst.x +
									moonVEst.y * moonVEst.y);

				if (normDiff < errorTol * normEst) {
					tooBig = false;
				if (tooSmall)
					step *= 2.0;
				if (step > calcStepMax) {
						step = calcStepMax;
					tooSmall = false;
				}
			} else {
					tooSmall = false;
				if (tooBig)
					step /= 2.0;
				if (step < calcStepMin) {
					step = calcStepMin;
					tooBig = false;
				}
			}
		}
		calcStep = step;
		
		rocketP = {x: rocketPEst.x, y: rocketPEst.y};
		rocketV = {x: rocketVEst.x, y: rocketVEst.y};
		moonP   = {theta: moonPEst.theta, x: moonPEst.x, y: moonPEst.y};
		moonV   = {x: moonVEst.x, y: moonVEst.y};
		time    = time + (calcStep * 20);

		-rocketP.y[i]*scale+3*EarthRadius*scale,200-rocketP.x[i]*scale
		if ( ((-rocketP.y*scale+3*EarthRadius*scale)<0) || ((-rocketP.y*scale+3*EarthRadius*scale)>800) || ((200-rocketP.x*scale)<0)  || ((200-rocketP.x*scale)>600) ){
			lostInSpace = true;
			sims[0][1] = 1;
			results();
		}else if (rE < (diameterOfEarth / 2) + reEntryRadius){
			gotReEntry = true;
			sims[0][1] = 0;
			results();
		}else if (rM < diameterOfMoon / 2){
			hitMoon = true;
			sims[0][1] = 2;
			results();
		}
		stillGoing = !(lostInSpace || gotReEntry || hitMoon);
	}
	
// Phase 3
	
	function results(){
		setTimeout(function() {
			phase = 3;
			pressActive = true;
			simButton.active = false;
		}, 1000);
	}
	
	reSim_Button = new button(235, 410, 203, 33,'RESIMULATE', true);
		//Add it to selection array
		reSim_Button.action = function(){
			//Action to run if enter button is selected
			phase = 1;
			input = '';
			pressActive = true;
			selectionArray = [simButton];
		}
	
	FIDO_12_PM01.input_Handler = function(params){
		for (var key in params) {
			var value = params[key];
			if(params['btn-act-enter']){
				if(phase == 0){
					selectionArray[selection].action();
				}else if(phase == 1){
					if(pressActive == true){
						if(input !== ''){
							pressActive = false;
							simButton.active = true;
						}else{
							input = 0;
						}
					}else if(simButton.active == true){
						simButton.action();
					}
				}else if(phase == 3){
					reSim_Button.action();
				}
			}
			if(params['btn-num-back']){
				if(phase == 1 && pressActive){ input = input.substring(0, input.length - 1); };
			}
			if(params['btn-nav-up']){
				if(phase == 1){
					if(phase == 1 && pressActive == false){ 
						pressActive = true;
						simButton.active = false;
					}
				}
			}
			if(params['btn-nav-down']){
				if(phase == 1){
					selection++;
					selection = selection%selectionArray.length
				}
			}
			if(params['btn-nav-left']){
			}
			if(params['btn-nav-right']){
			}
			if(params['btn-num-0']){
				if(phase == 1 && pressActive){ addInput('0') };
			}
			if(params['btn-num-1']){
				if(phase == 1 && pressActive){ addInput('1') };
			}
			if(params['btn-num-2abc']){
				if(phase == 1 && pressActive){ addInput('2') };
			}
			if(params['btn-num-3def']){
				if(phase == 1 && pressActive){ addInput('3') };
			}
			if(params['btn-num-4ghi']){
				if(phase == 1 && pressActive){ addInput('4') };
			}
			if(params['btn-num-5jkl']){
				if(phase == 1 && pressActive){ addInput('5') };
			}
			if(params['btn-num-6mno']){
				if(phase == 1 && pressActive){ addInput('6') };
			}
			if(params['btn-num-7pqrs']){
				if(phase == 1 && pressActive){ addInput('7') };
			}
			if(params['btn-num-8tuv']){
				if(phase == 1 && pressActive){ addInput('8') };
			}
			if(params['btn-num-9wxyz']){
				if(phase == 1 && pressActive){ addInput('9') };
			}
			if(params['btn-num-period']){
				if(phase == 1 && pressActive){ addInput('.') };
			}
			if(params['btn-act-reset']){ //Delete
				if(phase == 1 && pressActive == false){ 
					pressActive = true;
					simButton.active = false;
				}
			}
		}
	}

	FIDO_12_PM01.test_mode = true;

	if(!FIDO_12_PM01.test_mode){
		a13.registerHandler('io_change', FIDO_12_PM01.input_Handler);
		a13.unsubscribeFromAllDataChanges();
	}else{
		window.onkeydown = function(e){
			FIDO_12_PM01.input_Handler(keyTest(e.keyCode))
		}
	}
	
	//Start the task
	loop();
}