	
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
	

var coverage = 1;
var covPercent = 0;

//Images
var samoa = new Image();
	samoa.src = "images/samoa.png";	
	
//Ships
	var shipArray = [];
	
	function ship(x, y, speed, active, name){
		this.x = x;
		this.moveX = x;
			//Longitude between 145 ans 175
		this.y = y;
		this.moveY = y;
			//Latitude between 0 and 30
		this.speed = speed;
			//Speed on ship in knots. Creates radius
		this.active = active;
			//If this ship is selected
		this.name = name;
			//Name of the vessel
		shipArray.push(this)
	}
	
	ship1 = new ship(150, 5, 22, false, 'USS IWO JIMA')
	ship2 = new ship(173, 3, 33, false, 'USS BENJAMIN STODDERT')
	ship3 = new ship(168, 16, 20, false, 'USS KAWISHIWI')
	ship4 = new ship(160, 8, 10, false, 'USS GRANVILLE S HALL')
	ship5 = new ship(170, 26, 27, false, 'HMS NUBIAN')
	ship6 = new ship(152, 6, 27, false, 'HMS PHOEBE')
	ship7 = new ship(148, 27, 17, false, 'RFA TIDEFLOW ')
	
	var newPos = {x: 150, y: 5};
	

var RETRO_12_S01 = new task()

RETRO_12_S01.draw = function(){
	RETRO_12_S01.test_mode = true;
	function loop(){
		RETRO_12_S01.loop = setTimeout(function() {
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
				context('REFINE SHIP PLACEMENT', ["Splashdown of APOLLO 13 will occur in the Pacific Ocean.", "Arrange the ships in the area within the predicted splashdown zone that surrounds APOLLO 13's flight path."]);
				contextButton.draw();
				break;
			case 1:
				taskTitle('PACIFIC OCEAN SHIP PLACEMENT', 61);
				container('PLACEMENT', 40, 110, 496, 450);
				wrapText(ctx, 'Optimize placement of available recovery ships by maximizing coverage of the predicted splashdown line.', 556, 123, 203, 20)
				mapGrid();
				ctx.drawImage(samoa, 0, 0, 530, 153, 82, 290, 105, 33);
				ctx.font = '10pt apollo';
				ctx.fillText('AMERICAN SAMOA', 115, 293);
				drawLine([556,250],[760,250],2)
				ctx.font = '13pt apollo';
				ctx.fillText('COVERAGE', 556, 280);
				ctx.fillText('Selected Ship', 556, 370);
				ctx.font = '15pt apollo';
				ctx.fillText(Math.floor(covPercent * 100) / 100 + ' %', 556, 310);
				drawLine([556,330],[760,330],2)
				updateShips();
				moveButton.draw();
				break;
			case 2:
				taskTitle('PACIFIC OCEAN SHIP PLACEMENT', 61);
				container('PLACEMENT', 40, 110, 496, 450);
				mapGrid();
				reposition();
				updateShips();
				ctx.drawImage(samoa, 0, 0, 530, 153, 82, 290, 105, 33);
				ctx.font = '10pt apollo';
				ctx.fillText('AMERICAN SAMOA', 115, 293);
				drawLine([556,195],[760,195],2)
				sendButton.draw();
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
				selectionArray = [];
				coverageCalc();
			}
	
	//Phase 1
		moveButton = new button(556, 527, 204, 33,'ADJUST PLACEMENT', true);
			//Add it to selection array
			moveButton.action = function(){
				//Action to run if enter button is selected
				phase = 2;
				newPos.x = shipArray[selection].x
				newPos.y = shipArray[selection].y
			}
		
		mapGrid = function(){
			ctx.font = '12pt apollo';
			for(var i = 0; i < 5; i++){
				//Draws horizontal lines
				var y = 185 + (i*75);
				drawLine([40,y],[536,y],1)
				if(i%2 == 0){
					ctx.beginPath();
					ctx.rect(50, y - 15, 60, 33);
					ctx.fillStyle = black;
					ctx.fill();
					ctx.fillStyle = white;
					var t = 5+(i*5)+ " S";
					ctx.fillText(t, 60, y + 5)
				}
			}
			for(var i = 0; i < 5; i++){
				//Draws vertical lines
				var x = 127 + (i*82);
				drawLine([x,110],[x,560],1)
				if(i%2 == 0){
					ctx.beginPath();
					ctx.rect(x-5, 120, 10, 33);
					ctx.fillStyle = black;
					ctx.fill();
					ctx.fillStyle = white;
					var t = 170-(i*5)+ " W";
					ctx.fillText(t, x - 20, 140)
				}
			}
			//Line of the predicted splashdown
			ctx.beginPath();
			ctx.moveTo(40, 455);
			ctx.quadraticCurveTo(360, 440, 536, 220);
			ctx.lineWidth = 3;
			ctx.setLineDash([12,8]);
			ctx.stroke();
			ctx.setLineDash([0]);
			//Hash area.
			ctx.save();
				ctx.beginPath();
				ctx.moveTo(40, 408);
				ctx.quadraticCurveTo(360, 392, 536, 155);
				ctx.lineTo(536, 280);
				ctx.quadraticCurveTo(360, 486, 40, 518);
				ctx.clip();
				ctx.globalAlpha = .4
				ctx.drawImage(hash, 0, 0, 800, 600, 0, 0, 800, 600);
			ctx.restore();
				
			//Draw the ships
			ctx.save();
				ctx.rect(40, 110, 496, 450)
				ctx.clip();
					//To keep radius bound by map box
				for(var i = 0; i < shipArray.length; i++){
					x = (175 - shipArray[i].x)*16.5 + 40 
					y = (shipArray[i].y)*15 + 110
					r = (shipArray[i].speed*5)*(15.75 / 60)
						//Radius has been increased to show distance ship can travel in 5 hours
					ctx.beginPath();
					ctx.arc(x,y,5,0,2*Math.PI);
					ctx.fill();
					
					ctx.beginPath();
					ctx.arc(x,y,r,0,2*Math.PI);
					if(i == selection && consoleTime%8 <= 3 && phase == 1){
						ctx.lineWidth = 4;
					}else{
						ctx.lineWidth = 1.5;
					}
					ctx.stroke();
				}
			ctx.restore();
			
			ctx.font = '13pt apollo';
			if(phase == 1){
				ctx.fillText(shipArray[selection].name, 556, 405);
				var coord = Math.floor(shipArray[selection].y * 10)/10 + ' S, ' + Math.floor(shipArray[selection].x * 10)/10 + ' W';
				ctx.fillText(coord, 556, 430);
				ctx.fillText(shipArray[selection].speed + ' knots', 556, 455);
				if(shipArray[selection].active == true){
					ctx.fillText('RESET to cancel move', 556, 520);
					moveButton.active = false;
					moveButton.hashed = true;
				}else{
					moveButton.active = true;
					moveButton.hashed = false;
				}
			}
		}
		
	function coverageCalc(){
		//V. Very rough approximation. Should work well enough
		//Values in pixels
		var tempCov = 0
		for(var i = 0; i < shipArray.length; i++){
			var x = ((175 - shipArray[i].x)*16.5)/496 //Convert to % of total width
			var aT = (1-x)
			var y = (aT * aT) * 455 + 2 * aT * x * 460 + (x * x) * 220 
				//Calculates the y position of the predicted splashdown quadratic
			var y1 = y - 50;
			var y2 = y + 60;
			var r = (shipArray[i].speed*5)*(15.75 / 60);
			var sY = (shipArray[i].y)*15 + 110
			
			/* Check how the boundaries matched up.
			ctx.beginPath();
			ctx.rect((175 - shipArray[i].x)*16.5 + 40, y1, 2, (y2-y1))
			ctx.fill();
			*/
			
			if(sY - r < y2 && sY + r > y1){
				if(sY - r > y1 && sY + r < y2){
					tempCov += (2*r) * ( 2*r)
				}else if(sY - r < y1){
					tempCov += ((2*r) * ( 2*r)) - (y1 - (sY - r))*(2 * r)
				}else if(sY + r > y2){
					tempCov += ((2*r) * ( 2*r)) - ((sY -+r) - y2)*(2 * r)
				}
			}
		}
		coverage = tempCov
		covPercent = ((coverage/2) / 49600)* 100
	}
		
	function updateShips(){
		for(var i = 0; i < shipArray.length; i++){
			//Values are in lat/long not pixels
			
			if(shipArray[i].x != shipArray[i].moveX || shipArray[i].y != shipArray[i].moveY){
				shipArray[i].active = true;
				coverageCalc();
			}else{
				shipArray[i].active = false
			}
			
			var moveSpeed = shipArray[i].speed / 1500
			
			if(shipArray[i].x < shipArray[i].moveX){
				if(shipArray[i].x + moveSpeed > shipArray[i].moveX){
					shipArray[i].x = shipArray[i].moveX
				}else{
					shipArray[i].x += moveSpeed;
				}
			}else if(shipArray[i].x > shipArray[i].moveX){
				if(shipArray[i].x - moveSpeed < shipArray[i].moveX){
					shipArray[i].x = shipArray[i].moveX
				}else{
					shipArray[i].x -= moveSpeed;
				}
			}
			
			if(shipArray[i].y < shipArray[i].moveY){
				if(shipArray[i].y + moveSpeed > shipArray[i].moveY){
					shipArray[i].y = shipArray[i].moveY
				}else{
					shipArray[i].y += moveSpeed;
				}
			}else if(shipArray[i].y > shipArray[i].moveY){
				if(shipArray[i].y - moveSpeed < shipArray[i].moveY){
					shipArray[i].y = shipArray[i].moveY
				}else{
					shipArray[i].y -= moveSpeed;
				}
			}
		}
	}
	
	//Phase 2
		sendButton = new button(556, 280, 204, 33,'SEND COORDINATES', true);
		//Add it to selection array
		sendButton.action = function(){
			//Action to run if enter button is selected
			shipArray[selection].moveX = newPos.x
			shipArray[selection].moveY = newPos.y
			phase = 1;
		}
			
		function reposition(){
			//Ship details
			ctx.fillText(shipArray[selection].name, 556, 123);
			ctx.fillText('Current Coordinates', 556, 156);
			var coord = shipArray[selection].y + ' S, ' + shipArray[selection].x + ' W';
			ctx.fillText(coord, 556, 180);
			ctx.fillText('New Coordinates', 556, 240);
			var newCoord = newPos.y + ' S, ' + newPos.x + ' W';
			ctx.fillText(newCoord, 556, 265);
			ctx.fillText('CURSOR KEYS to move', 556, 535);
			ctx.fillText('RESET to cancel', 556, 560);
			
			//NEW POSITION 
			var oldX = (175 - shipArray[selection].x)*16.5 + 40 
			var oldY = (shipArray[selection].y)*15 + 110
			var newX = (175 - newPos.x)*16.5 + 40 
			var newY = (newPos.y)*15 + 110
			//Draw the new position marker
			ctx.beginPath();
			ctx.arc(newX,newY,4,0,2*Math.PI);
			if(consoleTime%8 <= 3){
				ctx.fillStyle = white;
			}else{
				ctx.fillStyle = black;
			}
			ctx.fill();
			ctx.fillStyle = white;
			//Connect the new and old point
			ctx.setLineDash([5])
			ctx.lineDashOffset = -consoleTime%10;
			drawLine([oldX,oldY],[newX,newY],2)
			ctx.lineDashOffset = 0;
			ctx.setLineDash([0])
		}

	RETRO_12_S01.input_Handler = function(params){
		for (var key in params) {
			var value = params[key];
			if(params['btn-act-enter']){
				if(phase == 0){
					selectionArray[selection].action();
				}else if(phase == 1){
					moveButton.action();
				}else if(phase == 2){
					sendButton.action();
				}
			}
			if(params['btn-nav-up']){
				if(phase == 2){
					if(newPos.y > 0){
						newPos.y-=0.2;
						newPos.y = Math.round(newPos.y * 10)/10;
					}
				}
			}
			if(params['btn-nav-down']){
				if(phase == 2){
					if(newPos.y < 30){
						newPos.y += 0.2;
						newPos.y = Math.round(newPos.y * 10)/10;;
					}
				}
			}
			if(params['btn-nav-left']){
				if(phase == 1){
					selection--;
					if(selection < 0){
						selection = shipArray.length - 1;
					}
				}else if(phase == 2){
					if(newPos.x < 175){
						newPos.x += 0.2;
						newPos.x = Math.round(newPos.x * 10)/10;
					}
				}
			}
			if(params['btn-nav-right']){
				if(phase == 1){
					selection++;
					selection = selection%shipArray.length
				}else if(phase == 2){
					if(newPos.x > 145){
						newPos.x -= 0.2;
						newPos.x = Math.round(newPos.x * 10)/10;
					}
				}
			}
			if(params['btn-act-reset']){ //Delete
				if(phase == 1){
					shipArray[selection].moveX = shipArray[selection].x
					shipArray[selection].moveY = shipArray[selection].y
				}else if(phase == 2){
					phase = 1
				}
			}
		}
	}
	
	if(!RETRO_12_S01.test_mode){
		a13.registerHandler('io_change', RETRO_12_S01.input_Handler);
		a13.unsubscribeFromAllDataChanges();
	}else{
		window.onkeydown = function(e){
			RETRO_12_S01.input_Handler(keyTest(e.keyCode))
		}
	}

	//Start the task
	loop();
}