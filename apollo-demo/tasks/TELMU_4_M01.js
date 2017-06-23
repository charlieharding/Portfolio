	
//Global Variables

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

//Images
var LMCM = new Image();
	LMCM.src = "assets/LM-CM.png";

function moveSelection(dir, i){
	//Function to move through the buttons in the selection array
	if(i == null){
		i = 0;
	}
	selectionArray[selection].active = false;
	if(selection + dir < 0){
		selection = selectionArray.length - 1;
	}else if(selection + dir > selectionArray.length - 1){
		selection = 0
	}else{
		selection += dir
	}
	if(selectionArray[selection].hashed == true){
		//Skips over un-selectable buttons (hashed)
		i++
		if(i < selectionArray.length){
			if(dir == 0){
				dir = 1;
			}
			moveSelection(dir, i);
		}
	}
	selectionArray[selection].active = true;
}

function arrow(s,e,w,o,a){
	//Start[], End[], Weight, Orientation, Active
	//Function to draw arrows used in schematics.
	var x = 9;
	var y = 7;
	ctx.lineWidth = 1;
	function arrowHead(){
		if(a){
			ctx.fill();
			ctx.stroke();
		}else{
			ctx.stroke();
		}
	}
	
	if(o == 0){
		e[1] = e[1]+3
		ctx.beginPath();
			ctx.moveTo(e[0],e[1])
			ctx.lineTo(e[0]-y,e[1]+x)
			ctx.lineTo(e[0]+y,e[1]+x)
			ctx.lineTo(e[0],e[1]);
		arrowHead()
		e[1] = e[1]+x
		drawLine(s,e,w);
	}else if(o == 1){
		e[0] = e[0]-3
		ctx.beginPath();
			ctx.moveTo(e[0],e[1])
			ctx.lineTo(e[0]-x,e[1]-y)
			ctx.lineTo(e[0]-x,e[1]+y)
			ctx.lineTo(e[0],e[1]);
		arrowHead()
		e[0] = e[0]-x
		drawLine(s,e,w);
	}else if(o == 2){
		e[1] = e[1]-3
		ctx.beginPath();
			ctx.moveTo(e[0],e[1])
			ctx.lineTo(e[0]-y,e[1]-x)
			ctx.lineTo(e[0]+y,e[1]-x)
			ctx.lineTo(e[0],e[1]);
		arrowHead()
		e[1] = e[1]-x
		drawLine(s,e,w);
	}else{
		e[0] = e[0]+3
		ctx.beginPath();
			ctx.moveTo(e[0],e[1])
			ctx.lineTo(e[0]+x,e[1]+y)
			ctx.lineTo(e[0]+x,e[1]-y)
			ctx.lineTo(e[0],e[1]);
		arrowHead()
		e[0] = e[0]+x
		drawLine(s,e,w);
	}
}

//Lunar module batteries
var battAr = []
function battery(id, name, amps, status){
	this.id = id;
	this.name = name;
	this.amps = amps;
	this.status = status;
	battAr.push(this);
}
var bat1 = new battery(1, 'Descent 1', 400, false);
var bat2 = new battery(2, 'Descent 2', 400, false);
var bat3 = new battery(5, 'Ascent 1', 290, false);
var bat4 = new battery(6, 'Ascent 2', 290, false);
var bat5 = new battery(3, 'Descent 3', 400, false);
var bat6 = new battery(4, 'Descent 4', 400, false);

//Power Buses
var busAr = []
function bus(name, status, power){
	this.name = name;
	this.status = status;
	busAr.push(this);
}
var bus4 = new bus('LMP BUS', false, false);
var bus1 = new bus('AC BUS A', false, false);
var bus2 = new bus('AC BUS B', false, false);
var bus3 = new bus('CDR BUS', false, false);

//Input Method components 
var componentAr = [];
function component(name, power, status){
	this.name = name;
	this.power = power;
	this.status = status;
	componentAr.push(this);
}

var dcBusA = new component('DC MAIN BUS A', true, false)
var dcBusB = new component('DC MAIN BUS B', true, false)
var battBus = new component('BATTERY RELAY BUS', false, false)
var controlCircuit = new component('AC/DC CONT. CIRCUIT', false, false)
var acInvert1 = new component('AC INVERTER 1', false, false)
var acInvert2 = new component('AC INVERTER 2', false, false)

//Input Method, switches
var inputAr = [];
function input(name, status){
	this.name = name;
	this.status = status;
	inputAr.push(this);
}

var switch1 = new input('SOURCE - DC MB A', false)
var switch2 = new input('SOURCE - DC MB B', false)
var switch3 = new input('DC MB A - BRB', false)
var switch4 = new input('DC MB A - AC/DC CC',false)
var switch5 = new input('DC MB B - AC/DC CC', false)
var switch6 = new input('BRB - AC/DC CC', false)
var switch7 = new input('AC/DC CC - AC I 1', false)
var switch8 = new input('AC/DC CC - CHARGER', false)
var switch9 = new input('AC/DC CC - AC I 2', false)

//Array and function for saving simulation results
var simAr = [];
function simulation(batts, source, switches, current, voltage, method, efficiency){
	this.batteries = [];
	for(var i = 0; i < batts.length; i++){
		this.batteries.push(batts[i].status)
	}
	this.source = source;
	this.switches = [];
	for(var i = 0; i < switches.length; i++){
		this.switches.push(switches[i].status)
	}
	this.current = current;
	this.voltage = voltage;
	this.method = method;
	this.efficiency = efficiency;
	simAr.push(this);
}

function testSim(batts, source, switches, current, voltage){
	this.batteries = [];
	for(var i = 0; i < batts.length; i++){
		this.batteries.push(batts[i].status)
	}
	this.source = source;
	this.switches = [];
	for(var i = 0; i < switches.length; i++){
		this.switches.push(switches[i].status)
	}
	this.current = current;
	this.voltage = voltage;
}

var TELMU_4_M01 = new task();
TELMU_4_M01.draw = function(){

	consoleTime = 0;
	selection = 0;
	selectionArray = []; 
	phase = 0;
	
	var source;
		var route;
	var method;
	var mode;
		var current;
		var voltage;
		
	var setting = 'source'; //Var to tell which element is being configured
	var step = 0;
	var setSelect = true; // True if the selection is on the button array. False if is on the container.
	
	var battSelect = 0; // For the battery selection menu
	var battPos = 0; // For the battery selection menu
	
	var busSelect = 0; // For the power bus selection menu
	
	var inputSelect = 0; // For the input component menu
	var inputPos = 0; // For the input component menu
	
	var modeSelect = 0; // For the mode menu
	
	var simmed = false; // For checking previously simmed setups
	var currentSetup = new testSim(battAr, source, inputAr, current, voltage);
	var currentEff; 		//For displaying efficiency on already simmed setups
	var simEff = 0.038888;					//For using the current efficiency in sim.
	
	var progress = 0; //For animating the simulation screen

	var stage = 0; //For advancing the selection on returning to phase 1
	
	function loop(){
		TELMU_4_M01.loop = setTimeout(function() {
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
				context('RUN EFFICIENCY CHECK FOR POWER TRANSFER', ['Test possible set ups for a transfer of the remaining LUNAR MODULE battery power into the COMMAND MODULE','Find the most efficient configuration to so the most power possible is tansferred.']);
				contextButton.draw();
				break;
			case 1:
				//Simulation set up overview. 
				taskTitle('CHECK POWER TRANSFER EFFICIENCY', 61);
				container('CURRENT SIMULATION SETUP', 40, 155, 456, 405);
				container('BEST SETUP', 517, 155, 243, 405);
				if(simAr.length < 1){
					wrapText(ctx, "No completed simulations", 537, 190, 203, 20)
				}else{
					drawBestSim();
				}
				wrapText(ctx, "Simulate to find a set up with a transfer efficiency of at least 49%", 40, 110, 760, 20)
				wrapText(ctx, "1 - SOURCE", 60, 190, 203, 20)
				if(source == null || source == undefined){
					wrapText(ctx, "Source invalid or missing", 60, 220, 203, 20)
				}else{
					wrapText(ctx, source, 60, 220, 203, 20)
				}
				drawLine([60,260.5],[476,260.5],1);
				wrapText(ctx, "2 - INPUT METHOD", 60, 300, 203, 20)
				if(method == null || method == undefined){
					wrapText(ctx, "Method invalid or missing", 60, 330, 203, 20)
				}else{
					wrapText(ctx, method, 60, 330, 203, 20)
				}
				drawLine([60,370.5],[476,370.5],1);
				wrapText(ctx, "3 - MODE", 60, 410, 203, 20)
				if(mode == null || mode == undefined){
					wrapText(ctx, "Mode invalid or missing", 60, 440, 203, 20)
				}else{
					wrapText(ctx, mode, 60, 440, 203, 20)
				}
				drawLine([40,480],[496,480],2);
				source_button.draw();
				method_button.draw();
				mode_button.draw();
				sim_button.draw();
				if(simmed && source != null && source != undefined && method != null && method != undefined && mode != null && mode != undefined){
					wrapText(ctx, "This setup has been simulated - "+Math.round(currentEff*10000)/10 + ' %', 60, 520, 203, 20)
				}
				break;
			case 2:
				//Source selection
				taskTitle('SET SOURCE FOR POWER TRANSFER', 61);
				container('CONFIGURATION DIAGRAM', 40, 110, 720, 220);
				cancel_button.draw();
				route_button.draw();
				battery_button.draw();
				lines_button.draw();
				if(step == 1){
					container('SELECT POWER ROUTE', 263, 350, 497, 210);
					drawRoute(); //Function to draw 'Set SRC Pow route' container
				}else if(step == 2){
					container('SELECT LM BATTERIES', 263, 350, 497, 210);
					drawBattery(); //Function to draw 'Set SRC Pow route' container
				}else if(step == 3){
					container('SELECT POWER BUS', 263, 350, 497, 210);
					drawBattery(); //Function to draw 'Set SRC Pow route' container
				}
				break;
			case 3:
				//Input selection
				taskTitle('SET INPUT METHOD FOR POWER TRANSFER', 61);
				container('CONFIGURATION DIAGRAM', 40, 110, 720, 260);
				container('SET INPUT COMPONENTS', 263, 390, 497, 170);
				drawInput();
				config_button.draw();
				back_button.draw();
				inputConfirm_button.draw();
				break;
			case 4:
				//Mode selection
				taskTitle('SET MODE FOR POWER TRANSFER', 61);
				container('CONFIGURATION DIAGRAM', 40, 110, 720, 220);
				drawCharger();
				container('SELECT MODE', 263, 350, 497, 210);
				back_button.draw();
				inputConfirm_button.draw();
				modeSet_button.draw();
				break;
			case 5:
				ctx.save()
					ctx.globalAlpha = 0.4;
					taskTitle('CHECK POWER TRANSFER EFFICIENCY', 61);
					container('CURRENT SIMULATION SETUP', 40, 155, 456, 405);
					container('BEST SETUP', 517, 155, 243, 405);
					if(simAr.length < 1){
						wrapText(ctx, "No completed simulations", 537, 190, 203, 20)
					}else{
					}
					wrapText(ctx, "Simulate to find a set up with a transfer efficiency of at least 49%", 40, 110, 760, 20)
					wrapText(ctx, "1 - SOURCE", 60, 190, 203, 20)
					if(source == null || source == undefined){
						wrapText(ctx, "Source invalid or missing", 60, 220, 203, 20)
					}else{
						wrapText(ctx, source, 60, 220, 203, 20)
					}
					drawLine([60,260.5],[476,260.5],1);
					wrapText(ctx, "2 - INPUT METHOD", 60, 300, 203, 20)
					if(method == null || method == undefined){
						wrapText(ctx, "Method invalid or missing", 60, 330, 203, 20)
					}else{
						wrapText(ctx, method, 60, 330, 203, 20)
					}
					drawLine([60,370.5],[476,370.5],1);
					wrapText(ctx, "3 - MODE", 60, 410, 203, 20)
					if(mode == null || mode == undefined){
						wrapText(ctx, "Mode invalid or missing", 60, 440, 203, 20)
					}else{
						wrapText(ctx, mode, 60, 440, 203, 20)
					}
					drawLine([40,480],[496,480],2);
					source_button.draw();
					method_button.draw();
					mode_button.draw();
					sim_button.draw();
					ctx.drawImage(hash,0,0,800,600,0,0,800,600)
				ctx.restore();
				ctx.fillStyle = black;
				ctx.fillRect(130, 145, 540, 415);
				container('SIMULATION RUNNING', 130, 145, 540, 415);
				ctx.drawImage(LMCM,0,0,971,399,200,180,400,165);
				drawSim();
				return_button.draw();
				break;
			default: console.log('Error - Invalid phase '+phase);
		}
	}
	
	//Phase 0
	contextButton = new button(190, 343, 203, 33,'ENTER', true);
	selectionArray.push(contextButton);
		contextButton.action = function(){
			phase = 1;
			if(source != null && method != null && mode != null && source != undefined && method != undefined && mode != undefined){
				sim_button.hashed = false;
				checkSims();
			}else{
				sim_button.hashed = true;
			}
			selectionArray = [source_button, method_button, mode_button, sim_button];
		}
	
	//Phase 1
	source_button = new button(278, 203, 200, 33,'SOURCE SETUP', true);
		source_button.action = function(){
			source_button.active = false;
			phase = 2;
			stage = 0;
			setSelect = true;
			route_button.active = true;
			selection = 0;
			step = 1;
			selectionArray = [route_button, battery_button, lines_button, cancel_button]
		}
		
	method_button = new button(278, 313, 200, 33,'METHOD SETUP', false);
		method_button.action = function(){
			method_button.active = false;
			back_button.active = true;
			phase = 3;
			setSelect = true;
			selection = 0;
			stage = 1;
			selectionArray = [back_button, inputConfirm_button, config_button];
		}
		
	mode_button = new button(278, 423, 200, 33,'MODE SETUP', false);
		mode_button.action = function(){
			mode_button.active = false;
			phase = 4;
			modeSet_button.active = true;
			setSelect = true;
			selection = 0;
			stage = 2;
			selectionArray = [modeSet_button, back_button, inputConfirm_button];
			if(mode == undefined || mode == null){
				inputConfirm_button.hashed = true;
			}else{
				inputConfirm_button.hashed = false;
			}
		}
		
	sim_button = new button(278, 510, 200, 33,'SIMULATE', false);
		sim_button.action = function(){
			sim_button.active = false;
			phase = 5;
			calcEff()
			selection = 0;
			selectionArray = [return_button];
		}
		sim_button.hashed = true;
		
	//General
		cancel_button = new button(40, 527, 203, 33,'BACK', false);
			cancel_button.action = function(){
				cancel_button.active = false;
				source_button.active = true;
				phase = 1;
				if(source != null && method != null && mode != null && source != undefined && method != undefined && mode != undefined){
					sim_button.hashed = false;
					checkSims();
				}else{
					sim_button.hashed = true;
				}
				selectionArray = [source_button, method_button, mode_button, sim_button];
				selection = stage;
				if(source != null && source != undefined){
					moveSelection(1)
				}
			}
		
	//Phase 2
		route_button = new button(40, 350, 203, 33,'SET ROUTE', true);
			route_button.action = function(){
				route_button.active = false;
				step = 1;
				selection = 0;
				setSelect = false;
			}
			//route_button.hashed = true;

		battery_button = new button(40, 405, 203, 33,'SET BATTERIES', false);
			battery_button.action = function(){
				battery_button.active = false;
				step = 2;
				setSelect = false;
			}
			battery_button.hashed = true;

		lines_button = new button(40, 460, 203, 33,'SET BUS', false);
			lines_button.action = function(){
				lines_button.active = false;
				step = 3;
				setSelect = false;
			}
			lines_button.hashed = true;
	
	//Phase 3 
		config_button = new button(40, 390, 203, 33,'CONFIGURE CIRCUITS', false);
			config_button.action = function(){
			}
			config_button.hashed = true;

		back_button = new button(40, 443, 203, 33,'BACK', false);
			back_button.action = function(){
				back_button.active = false;
				if(source != null && method != null && mode != null && source != undefined && method != undefined && mode != undefined){
					sim_button.hashed = false;
					checkSims();
				}else{
					sim_button.hashed = true;
				}
				phase = 1;
				selectionArray = [source_button, method_button, mode_button, sim_button];
				selection = stage;
				selectionArray[selection].active = true;
			}

		inputConfirm_button = new button(40, 527, 203, 33,'CONFIRM', false);
			inputConfirm_button.action = function(){
				inputConfirm_button.active = false;
				selectionArray = [source_button, method_button, mode_button, sim_button];
				phase = 1;
				if(source != null && method != null && mode != null && source != undefined && method != undefined && mode != undefined){
					sim_button.hashed = false;
					checkSims();
				}else{
					sim_button.hashed = true;
				}
				moveSelection(1)
			}
			inputConfirm_button.hashed = true;
	
	//Phase 4
		modeSet_button = new button(40, 390, 203, 33,'SET MODE', false);
			modeSet_button.action = function(){
				modeSet_button.active = false;
				setSelect = false;
			}
		
	//Phase 5
		return_button = new button(377, 507, 203, 33,'RETURN', false);
			return_button.action = function(){
				return_button.active = false;
				source_button.active = true;
				selection = 0;
				phase = 1;
				progress = 0;
				if(source != null && method != null && mode != null && source != undefined && method != undefined && mode != undefined){
					sim_button.hashed = false;
					checkSims();
				}else{
					sim_button.hashed = true;
				}
				selectionArray = [source_button, method_button, mode_button, sim_button];
			}
		return_button.hashed = true;
		
		function drawRoute(){
			var directPath;
			var surgePath;
			var directArrow;
			var surgeArrow;
			
			if(route == 'direct'){
				ctx.fillRect(283, 380, 16, 16);		
				ctx.strokeRect(283, 462, 16, 16);
				directPath = 4;
				surgePath = 1;
				directArrow = true;
				surgeArrow = false;
			}else if(route == 'viaBus'){
				directPath = 1;
				surgePath = 4;
				directArrow = false;
				surgeArrow = true;
				ctx.strokeRect(283, 380, 16, 16);	
				ctx.fillRect(283, 462, 16, 16);
			}else{
				ctx.strokeRect(283, 380, 16, 16);	
				ctx.strokeRect(283, 462, 16, 16);
			}
			if(setSelect){
				ctx.fillText('DIRECT', 333, 395);
				ctx.fillText('VIA BUS', 333, 477);
			}else{
				if(selection == 0){
					directPath = 4;
					surgePath = 1;
					directArrow = true;
					surgeArrow = false;
					if(consoleTime%8 <= 3){
						ctx.fillStyle = white;
						ctx.fillRect(313, 375, 400, 30);
						ctx.fillStyle = black;
						ctx.fillText('DIRECT', 333, 395);
						ctx.fillStyle = white;
					}else{
						ctx.fillText('DIRECT', 333, 395);
					}
					ctx.fillText('VIA BUS', 333, 477);
				}else{
					directPath = 1;
					surgePath = 4;
					directArrow = false;
					surgeArrow = true;
					if(consoleTime%8 <= 3){
						ctx.fillStyle = white;
						ctx.fillRect(313, 457, 400, 30);
						ctx.fillStyle = black;
						ctx.fillText('VIA BUS', 333, 477);
						ctx.fillStyle = white;
					}else{
						ctx.fillText('VIA BUS', 333, 477);
					}
					ctx.fillText('DIRECT', 333, 395);			
				}
			}
			wrapText(ctx,'Route power via a surge line and BUS', 333, 513, 417, 20);
			wrapText(ctx,'Route power to the CSM directly', 333, 430, 417, 20);
			ctx.fillText('TO CSM', 680, 155);
			ctx.lineWidth = 4;
			ctx.strokeRect(100, 145, 200, 70)
			wrapText(ctx,'LUNAR MODULE BATTERIES', 120, 175, 160, 20);		
			arrow([300, 180],[760,180],directPath,1,directArrow); //Direct line
			arrow([150, 215],[150,235],surgePath,2,surgeArrow); //Battery to surge
			drawLine([300, 270],[450,270],surgePath,1); //Surge to link... 
			drawLine([449, 270],[449,200],surgePath,1); 
			arrow([448, 200],[760,200],surgePath,1,surgeArrow); 
			ctx.lineWidth = surgePath;
			ctx.strokeRect(100, 235, 200, 70)
			wrapText(ctx,'POWER BUS SETUP', 120, 265, 160, 20);
		}
		
		function drawBattery(){
			if(route == 'direct'){
				var batOn = false
				for(var i = 0; i < battAr.length; i++){
					var x = 80+(i*110);
					if(!battAr[i].status){
						ctx.lineWidth = 1;
						ctx.strokeRect(x, 185, 90, 70)
						ctx.fillText('B'+battAr[i].id.toString(), x+20, 215);
						ctx.fillText(battAr[i].amps.toString()+'Ah', x+20, 235);
						drawLine([x+40, 185],[x+40, 155], 1);
					}else{
						batOn = true;
						ctx.lineWidth = 1;
						ctx.fillRect(x, 185, 90, 70)
						ctx.fillStyle = black;
						ctx.fillText('B'+battAr[i].id.toString(), x+20, 215);
						ctx.fillText(battAr[i].amps.toString()+'Ah', x+20, 235);
						ctx.fillStyle = white;
						drawLine([x+40, 185],[x+40, 155], 4);
						drawLine([x+38, 155],[754, 155], 4);
					}
				}
				arrow([119, 155],[760, 155], 1, 1, batOn);
			}else{
				for(var i = 0; i < battAr.length; i++){
					var x = 80+(i*110);
					if(!battAr[i].status){
						ctx.lineWidth = 1;
						ctx.strokeRect(x, 145, 90, 70)
						ctx.fillText('B'+battAr[i].id.toString(), x+20, 175);
						ctx.fillText(battAr[i].amps.toString()+'Ah', x+20, 195);
						if(i != 1){
							drawLine([x+70, 215],[x+70, 235], 1);
						}else{
							drawLine([x+20, 215],[x+20, 235], 1);
						}
					}else{
						ctx.lineWidth = 1;
						ctx.fillRect(x, 145, 90, 70);
						ctx.fillStyle = black;
						ctx.fillText('B'+battAr[i].id.toString(), x+20, 175);
						ctx.fillText(battAr[i].amps.toString()+'Ah', x+20, 195);
						ctx.fillStyle = white;
						if(i != 1){
							drawLine([x+70, 215],[x+70, 235], 4);
						}else{
							drawLine([x+20, 215],[x+20, 235], 4);
						}
					}
				}
				//Draw the power buses if via surge lines.
				var busOn = false;
				for(var i = 0; i < busAr.length; i++){
					var x = 80+(i*165);
					if(!busAr[i].status){
						ctx.lineWidth = 1;
						if(busAr[i].power){
							ctx.lineWidth = 4;
						}else{
							ctx.lineWidth = 1
						}
						ctx.strokeRect(x, 235, 145, 33)
						ctx.fillText(busAr[i].name, x+20, 255);
						drawLine([x+50, 268],[x+50, 310], 1);
					}else{
						busOn = true;
						ctx.lineWidth = 1;
						ctx.fillRect(x, 235, 145, 33)
						ctx.fillStyle = black;
						ctx.fillText(busAr[i].name, x+20, 255);
						ctx.fillStyle = white;
						drawLine([x+50, 268],[x+50, 310], 4);
						drawLine([x+48, 310],[750, 310], 4);
					}
				}
				arrow([129, 310],[760, 310], 1, 1, busOn);
			}
			if(step == 2){
				//Battery scroll menu
				ctx.fillText('Select LUNAR MODULE Batteries to use.', 283, 385);
				drawLine([263, 395],[760, 395], 2);
				drawLine([730, 395],[730, 560], 2);
				for(var i = 0; i < 4; i++){
					var p = i + battSelect - battPos;
					var y = 425 + i * 38;
					if(i == battPos && consoleTime%8 <= 3 && !setSelect){
						ctx.fillStyle = white;
						ctx.fillRect(273, y - 22, 340, 33);
						ctx.fillStyle = black;
						ctx.fillText("B" + battAr[p].id, 303, y);
						ctx.fillText(battAr[p].name, 363, y);
						ctx.fillText(battAr[p].amps+' A-h', 493, y);
						ctx.fillStyle = white;				
					}else{
						ctx.fillText("B" + battAr[p].id, 303, y);
						ctx.fillText(battAr[p].name, 363, y);
						ctx.fillText(battAr[p].amps+' A-h', 493, y);
					}
					if(battAr[p].status){
						ctx.fillRect(645, y - 16, 20, 20);
					}else{
						ctx.lineWidth = 2;
						ctx.strokeRect(645, y - 16, 20, 20);
					}
				}
				//scroll indicator
				var scrollY = 400 + ((battSelect - battPos) * (155 / battAr.length))
				var height = (155 / battAr.length) * 4
				ctx.fillStyle = white;
				ctx.fillRect(735, scrollY, 20, height);
			}else if(step == 3){
				//Power Bus list
				ctx.fillText('Select a POWER BUS to route power through.', 283, 385);
				for(var i = 0; i < busAr.length; i++){
					var y = 425 + i * 38;
					if(i == busSelect && consoleTime%8 <= 3 && !setSelect){
						ctx.fillStyle = white;
						ctx.fillRect(273, y - 22, 160, 33);
						ctx.fillStyle = black;
						ctx.fillText(busAr[i].name, 283, y);
						ctx.fillStyle = white;				
					}else{
						ctx.fillText(busAr[i].name, 283, y);
					}
					if(busAr[i].status){
						ctx.fillRect(500, y - 16, 20, 20);
					}else{
						ctx.lineWidth = 2;
						ctx.strokeRect(500, y - 16, 20, 20);
					}
				}
			}
		}
		
		function drawInput(){
			wrapText(ctx,'FROM SOURCE', 50, 180, 100, 20);		
			//Source to Bus A
			drawLine([40, 220],[120, 220], 4)
			if(switch1.status){
				arrow([118, 220],[180, 220], 4, 1, true);
				//DC MAIN BUS A
				ctx.fillRect(180, 183, 140, 60);
				ctx.fillStyle = black;
				wrapText(ctx, 'DC MAIN BUS A', 200, 210, 100, 20)
				ctx.fillStyle = white;
			}else{
				arrow([120, 220],[180, 220], 1, 1, false);
				//DC MAIN BUS A
				ctx.strokeRect(180, 183, 140, 60);
				wrapText(ctx, 'DC MAIN BUS A', 200, 210, 100, 20)
			}
			
			//Source to Bus B
			if(switch2.status){
				arrow([118, 290],[180, 290], 4, 1, true);
				drawLine([120, 220],[120, 290], 4)
				// DC MAIN BUS B
				ctx.fillRect(180, 263, 140, 60);
				ctx.fillStyle = black;
				wrapText(ctx, 'DC MAIN BUS B', 200, 290, 100, 20)
				ctx.fillStyle = white;
			}else{
				arrow([120, 290],[180, 290], 1, 1, false);
				drawLine([120, 220],[120, 290], 1)
				// DC MAIN BUS B
				ctx.strokeRect(180, 263, 140, 60);
				wrapText(ctx, 'DC MAIN BUS B', 200, 290, 100, 20)
			}
			//BATTERY RELAY BUS
			if(switch3.status){
				arrow([220, 183],[220, 163], 4, 0, true);
				ctx.fillRect(180, 130, 240, 33);
				ctx.fillStyle = black;
				ctx.fillText('BATTERY RELAY BUS', 220, 150);
				ctx.fillStyle = white;
			}else{
				arrow([220, 183],[220, 163], 1, 0, false);
				ctx.strokeRect(180, 130, 240, 33);
				ctx.fillText('BATTERY RELAY BUS', 220, 150)
			}
			ctx.lineWidth = 1;
			//AC/DC CONTROL
			if(switch4.status || switch5.status || switch6.status){
				ctx.fillRect(350, 183, 140, 110);
				ctx.fillStyle = black;
				wrapText(ctx, 'AC/DC CONTROL CIRCUITS', 370, 210, 100, 20)
				ctx.fillStyle = white;
			}else{
				ctx.strokeRect(350, 183, 140, 110);
				wrapText(ctx, 'AC/DC CONTROL CIRCUITS', 370, 210, 100, 20)
			}		
			if(switch4.status){
				//DC Bus A to circuits
				arrow([320, 220],[350, 220], 4, 1, true);
			}else{
				arrow([320, 220],[350, 220], 1, 1, false);
			}
			if(switch5.status){
				//DC Bus B to circuits
				arrow([320, 280],[350, 280], 4, 1, true);
			}else{
				arrow([320, 280],[350, 280], 1, 1, false);
			}
			if(switch6.status){
				//BRB to circuits
				arrow([370, 163],[370, 183], 4, 2, true);
			}else{
				arrow([370, 163],[370, 183], 1, 2, false);
			}
			
			//AC Inverter 1
			if(switch7.status){
				arrow([490, 230],[520, 230], 4, 1, true);
				arrow([660, 230],[760, 230], 4, 1, true);
				ctx.fillRect(520, 183, 140, 60);
				ctx.fillStyle = black;
				wrapText(ctx, 'AC INVERTER 1', 540, 210, 110, 20)
				ctx.fillStyle = white;
			}else{
				arrow([490, 230],[520, 230], 1, 1, false);
				arrow([660, 230],[760, 230], 1, 1, false);
				ctx.strokeRect(520, 183, 140, 60);
				wrapText(ctx, 'AC INVERTER 1', 540, 210, 110, 20)
			}
			//AC Inverter 2
			if(switch9.status){
				drawLine([470, 293],[470, 320], 4)
				arrow([468, 320],[520, 320], 4, 1, true);
				arrow([660, 300],[760, 300], 4, 1, true);
				ctx.fillRect(520, 287, 140, 60);
				ctx.fillStyle = black;
				wrapText(ctx, 'AC INVERTER 2', 540, 316, 110, 20)
				ctx.fillStyle = white;
			}else{
				drawLine([470, 293],[470, 320], 1)
				arrow([470, 320],[520, 320], 1, 1, false);
				arrow([660, 300],[760, 300], 1, 1, false);
				ctx.strokeRect(520, 287, 140, 60);	
				wrapText(ctx, 'AC INVERTER 2', 540, 316, 110, 20)
			}
			//Circuits to Charger
			if(switch8.status){
				arrow([490, 265],[760, 265], 4, 1, true);
			}else{
				arrow([490, 265],[760, 265], 1, 1, false);
			}
			//Input components scroll menu
			drawLine([730, 390],[730, 560], 2);
			for(var i = 0; i < 4; i++){
				var p = i + inputSelect - inputPos;
				var y = 425 + i * 38;
				if(i == inputPos && consoleTime%8 <= 3 && !setSelect){
					ctx.fillStyle = white;
					ctx.fillRect(273, y - 22, 340, 33);
					ctx.fillStyle = black;
					ctx.fillText(inputAr[p].name, 293, y);
					ctx.fillStyle = white;				
				}else{
					ctx.fillText(inputAr[p].name, 293, y);
				}
				if(inputAr[p].status){
						ctx.fillRect(645, y - 16, 20, 20);
					}else{
						ctx.lineWidth = 2;
						ctx.strokeRect(645, y - 16, 20, 20);
					}
			}
			//scroll indicator
			var scrollY = 400 + ((inputSelect - inputPos) * (155 / inputAr.length))
			var height = (155 / inputAr.length) * 4
			ctx.fillStyle = white;
			ctx.fillRect(735, scrollY, 20, height);
			ctx.lineWidth = 2;
			ctx.fillStyle = white;
		}
	
	function checkPowSetup(){
		//Check if source configuration is allowable. Un-lock buttons.
		lines_button.hashed = true;
		source = null;
		//method = null;
		
		cancel_button.text = 'BACK'
		var batOn = false;
		for(var i = 0; i < battAr.length; i++){
			if(battAr[i].status){
				batOn = true;
			}
		}
		if(bat1.status || bat2.status){
			bus4.power = true;
		}else{
			bus4.power = false;
			bus4.status = false;
		}
		if(bat3.status){
			bus1.power = true;
		}else{
			bus1.power = false;
			bus1.status = false;
		}
		if(bat4.status){
			bus2.power = true;
		}else{
			bus2.power = false;
			bus2.status = false;
		}
		if(bat5.status || bat6.status){
			bus3.power = true;
		}else{
			bus3.power = false;
			bus3.status = false;
		}
		if(route == 'viaBus' && batOn){
			lines_button.hashed = false;
			var busOn = false;
			for(var i = 0; i < busAr.length; i++){
				if(busAr[i].status){
					busOn = true;
					source = busAr[i].name
					cancel_button.text = 'CONFIRM'
				}
			}
		}
		if(route == 'direct'){
			if(batOn){
				source = 'DIRECT'
				cancel_button.text = 'CONFIRM'
			}
		}
	}
	
	function checkInput(){
		//Check if the input method config is allowable. React to user changes in real time.
		mode = null;
		current = null;
		voltage = null;
		
		if(!switch1.status){
			switch3.status = false;
			switch4.status = false;
			dcBusA.status = false;
			dcBusA.power = false;
			battBus.status = false;
			battBus.power = false;
		}
		if(!switch2.status){
			switch5.status = false
		}
		if(!switch3.status){
			switch6.status = false;
		}
		if(!switch4.status && !switch5.status && !switch6.status){
			switch7.status = false;
			switch8.status = false;
			switch9.status = false;
			controlCircuit.status = false;
			controlCircuit.power = false;
			acInvert1.status = false;
			acInvert1.power = false;
			acInvert2.status = false;
			acInvert2.power = false;
		}
		
		if(switch7.status && !switch8.status && !switch9.status){
			//Method = AC Inverter 1
			inputConfirm_button.hashed = false;
			method = 'AC INVERTER 1';
			current = 'AC';
		}else if(switch9.status && !switch7.status && !switch8.status){
			//Method = AC Inverter 2
			inputConfirm_button.hashed = false;
			method = 'AC INVERTER 2';
			current = 'AC';
		}else if(switch8.status && !switch7.status && !switch9.status){
			if(switch6.status && !switch5.status && !switch4.status){
				//Method = Battery Relay Bus
				inputConfirm_button.hashed = false;
				method = 'BATTERY RELAY BUS';
				current = 'DC';
			}else if(switch4.status && !switch5.status && !switch6.status){
				//Method = DC MAIN BUS A
				inputConfirm_button.hashed = false;
				method = 'DC MAIN BUS A';
				current = 'DC';
			}else if(switch5.status && !switch6.status && !switch4.status){
				//Method = DC MAIN BUS B
				inputConfirm_button.hashed = false;
				method = 'DC MAIN BUS B';
				current = 'DC';
			}else{
				inputConfirm_button.hashed = true;
				method = null;
			}
		}else{
			inputConfirm_button.hashed = true;
			method = null;
		}
	}
	
	function drawCharger(){	
		var h = 1;
		var hOn = false;
		var l = 1;
		var lOn = false;
		
		if(current == 'AC'){
			//AC
			ctx.fillRect(250, 175, 60, 33);
			ctx.fillStyle = black;
			ctx.fillText('AC', 270, 197);
			ctx.fillStyle = white;
			drawLine([310, 190],[360, 190], 4);
			drawLine([40, 190],[250, 190], 4);
		
			ctx.lineWidth = 1;
			ctx.strokeRect(250, 240, 60, 33);
			ctx.fillText('DC', 270, 262);
			drawLine([310, 255],[360, 255], 1);
			drawLine([40, 255],[250, 255], 1);
				
			if(voltage == 'low'){
				l = 4;
				lOn = true;
				drawLine([360, 190],[400, 197],4);
				//drawLine([360, 255],[400, 262],1);
			}else if(voltage == 'high'){
				h = 4;
				hOn = true;
				drawLine([360, 190],[400, 177],4);
				//drawLine([360, 255],[400, 242],1);
			}
			
		}else if(current == 'DC'){
			//DC
			ctx.fillRect(250, 240, 60, 33);
			ctx.fillStyle = black;
			ctx.fillText('DC', 270, 262);
			ctx.fillStyle = white;
			drawLine([310, 255],[360, 255], 4);
			drawLine([40, 255],[250, 255], 4);
			
			ctx.lineWidth = 1;
			ctx.strokeRect(250, 175, 60, 33);
			ctx.fillText('AC', 270, 197);
			drawLine([310, 190],[360, 190], 1);
			drawLine([40, 190],[250, 190], 1);
			
			if(voltage == 'low'){
				l = 4;
				lOn = true;
				drawLine([360, 255],[400, 262],4);
			}else if(voltage == 'high'){
				h = 4;
				hOn = true;
				drawLine([360, 255],[400, 242],4);
			}
		}
		
		ctx.fillRect(570, 135, 170, 40);
		ctx.fillStyle = black;
		ctx.fillText('CM BATTERY A', 590, 162);
		ctx.fillStyle = white;
		
		ctx.fillRect(570, 200, 170, 40);
		ctx.fillStyle = black;
		ctx.fillText('CM BATTERY B', 590, 227);
		ctx.fillStyle = white;
		
		ctx.fillRect(570, 265, 170, 40);
		ctx.fillStyle = black;
		ctx.fillText('CM BATTERY C', 590, 292);
		ctx.fillStyle = white;

		//High Voltage
		arrow([500, 145],[570, 145], h, 1, hOn);
		arrow([500, 210],[570, 210], h, 1, hOn);
		arrow([500, 275],[570, 275], h, 1, hOn);
		drawLine([500, 145],[500, 275], h);
		drawLine([400, 177],[500, 177], h);
		drawLine([400, 242],[500, 242], h);
		
		//Low Voltage
		arrow([450, 165],[570, 165], l, 1, lOn);
		arrow([450, 230],[570, 230], l, 1, lOn);
		arrow([450, 295],[570, 295], l, 1, lOn);
		drawLine([450, 165],[450, 295], l);
		drawLine([400, 197],[450, 197], l);
		drawLine([400, 262],[450, 262], l)
		
		ctx.fillText('Set voltage mode for power transfer.', 283, 385);
		for(var i = 0; i < 4; i++){
			var y = 425 + i * 38;
			ctx.lineWidth = 2;
			if(i == modeSelect && consoleTime%8 <= 3 && !setSelect){
				switch(i){
					case 0:
						ctx.fillStyle = white;
						ctx.fillRect(273, y - 22, 340, 33);
						ctx.fillStyle = black;
						ctx.fillText("AC - HIGH VOLTAGE", 303, y);
						ctx.fillStyle = white;
						if(current == 'AC' && voltage == 'high'){
							ctx.fillRect(645, y - 16, 20, 20);
						}else{
							ctx.strokeRect(645, y - 16, 20, 20);
						}
					break;
					case 1:
						ctx.fillStyle = white;
						ctx.fillRect(273, y - 22, 340, 33);
						ctx.fillStyle = black;
						ctx.fillText("AC - LOW VOLTAGE", 303, y);
						ctx.fillStyle = white;
						if(current == 'AC' && voltage == 'low'){	
							ctx.fillRect(645, y - 16, 20, 20);
						}else{
							ctx.strokeRect(645, y - 16, 20, 20);
						}
					break;
					case 2:
						ctx.fillStyle = white;
						ctx.fillRect(273, y - 22, 340, 33);
						ctx.fillStyle = black;
						ctx.fillText("DC - HIGH VOLTAGE", 303, y);
						ctx.fillStyle = white;
						if(current == 'DC' && voltage == 'high'){
							ctx.fillRect(645, y - 16, 20, 20);
						}else{
							ctx.strokeRect(645, y - 16, 20, 20);
						}
					break;
					case 3:
						ctx.fillStyle = white;
						ctx.fillRect(273, y - 22, 340, 33);
						ctx.fillStyle = black;
						ctx.fillText("DC - LOW VOLTAGE", 303, y);
						ctx.fillStyle = white;
						if(current == 'DC' && voltage == 'low'){
							ctx.fillRect(645, y - 16, 20, 20);
						}else{
							ctx.strokeRect(645, y - 16, 20, 20);
						}
					break;
					default: console.log('error');
				}
			}else{
				switch(i){
					case 0:
						ctx.fillText("AC - HIGH VOLTAGE", 303, y);
						if(current == 'AC' && voltage == 'high'){
							ctx.fillRect(645, y - 16, 20, 20);
						}else{
							ctx.strokeRect(645, y - 16, 20, 20);
						}
					break;
					case 1:
						ctx.fillText("AC - LOW VOLTAGE", 303, y);
						if(current == 'AC' && voltage == 'low'){
							ctx.fillRect(645, y - 16, 20, 20);
						}else{
							ctx.strokeRect(645, y - 16, 20, 20);
						}
					break;
					case 2:
						ctx.fillText("DC - HIGH VOLTAGE", 303, y);
						if(current == 'DC' && voltage == 'high'){
							ctx.fillRect(645, y - 16, 20, 20);
						}else{
							ctx.strokeRect(645, y - 16, 20, 20);
						}
					break;
					case 3:
						ctx.fillText("DC - LOW VOLTAGE", 303, y);
						if(current == 'DC' && voltage == 'low'){
							ctx.fillRect(645, y - 16, 20, 20);
						}else{
							ctx.strokeRect(645, y - 16, 20, 20);
						}
					break;
					default: console.log('error');
				}
			}
		}
	}
	
	function calcEff(){
		//Calculate the set up's efficiency
		
		//Divide power over batteries. Penalties for more than 1 battery, using Ascent.
		//Lose power from batteries that are on but unused
		var startAmps = 400;
		var batts = 0;
		for(var i = 0; i < battAr.length; i++){
			if(battAr[i].status){ batts++ }
		}
		if(batts == 1 && (bat3.status || bat4.status)){
			startAmps = 290;
		}
		if(batts > 1){
			startAmps = startAmps - batts*20
		}
		if(route == 'viaBus'){
			if(source == 'LMP BUS'){
				for(var i = 0; i < battAr.length; i++){
					if(battAr[i].status && battAr[i] != bat1 && battAr[i] != bat2){ 
						startAmps = startAmps*0.7
					}
				}
			}else if(source == 'AC BUS A'){
				for(var i = 0; i < battAr.length; i++){
					if(battAr[i].status && battAr[i] != bat3){ 
						startAmps = startAmps*0.7
					}
				}
			}else if(source == 'AC BUS B'){
				for(var i = 0; i < battAr.length; i++){
					if(battAr[i].status && battAr[i] != bat4){ 
						startAmps = startAmps*0.7
					}
				}
			}else if(source == 'CDR BUS'){
				for(var i = 0; i < battAr.length; i++){
					if(battAr[i].status && battAr[i] != bat5 && battAr[i] != bat6){ 
						startAmps = startAmps*0.7
					}
				}
			}
		}
		
		var penalty = 0;
		//Penalty for wrong voltage
		if(voltage == 'high'){
			penalty = penalty + 0.0032;
		}
		
		//Penalties for extraneous switches & method choice
		if(method == 'AC INVERTER 1'){
			if(switch4.status){
				//AC inverter via main bus A
				if(route == 'viaBus'){
					if(source == 'LMP BUS'){
						penalty = penalty + 0.036;
					}else if(source == 'AC BUS A'){
						penalty = penalty + 0.022;
					}else if(source == 'AC BUS B'){
						penalty = penalty + 0.023;
					}else if(source == 'CDR BUS'){
						penalty = penalty + 0.01;
					}
				}else{
					penalty = penalty + 0.042;
				}
				for(var i = 0; i < inputAr.length; i++){
					if(inputAr[i].status && inputAr[i] != switch1 && inputAr[i] != switch4 && inputAr[i] != switch7){
					penalty = penalty + 0.002;
					}
				}
			}else if(switch5.status){
				//AC inverter via main bus B
				if(route == 'viaBus'){
					if(source == 'LMP BUS'){
						penalty = penalty + 0.034;
					}else if(source == 'AC BUS A'){
						penalty = penalty + 0.02;
					}else if(source == 'AC BUS B'){
						penalty = penalty + 0.021;
					}else if(source == 'CDR BUS'){
						penalty = penalty + 0.008;
					}
				}else{
					penalty = penalty + 0.04;
				}
				for(var i = 0; i < inputAr.length; i++){
					if(inputAr[i].status && inputAr[i] != switch2 && inputAr[i] != switch5 && inputAr[i] != switch7){
					penalty = penalty + 0.002;
					}
				}
			}else if(switch6.status){
				//AC inverter via Battery Relay Bus
				if(route == 'viaBus'){
					if(source == 'LMP BUS'){
						penalty = penalty + 0.037;
					}else if(source == 'AC BUS A'){
						penalty = penalty + 0.023;
					}else if(source == 'AC BUS B'){
						penalty = penalty + 0.025;
					}else if(source == 'CDR BUS'){
						penalty = penalty + 0.012;
					}
				}else{
					penalty = penalty + 0.043;
				}
				for(var i = 0; i < inputAr.length; i++){
					if(inputAr[i].status && inputAr[i] != switch1 && inputAr[i] != switch3 && inputAr[i] != switch6 && inputAr[i] != switch7){
					penalty = penalty + 0.002;
					}
				}
			}
		}else if(method == 'AC INVERTER 2'){
			if(switch4.status){
				//AC inverter via main bus A
				if(route == 'viaBus'){
					if(source == 'LMP BUS'){
						penalty = penalty + 0.039;
					}else if(source == 'AC BUS A'){
						penalty = penalty + 0.025;
					}else if(source == 'AC BUS B'){
						penalty = penalty + 0.024;
					}else if(source == 'CDR BUS'){
						penalty = penalty + 0.02;
					}
				}else{
					penalty = penalty + 0.0404;
				}
				for(var i = 0; i < inputAr.length; i++){
					if(inputAr[i].status && inputAr[i] != switch1 && inputAr[i] != switch4 && inputAr[i] != switch9){
					penalty = penalty + 0.002;
					}
				}
			}else if(switch5.status){
				//AC inverter via main bus B
				if(route == 'viaBus'){
					if(source == 'LMP BUS'){
						penalty = penalty + 0.032;
					}else if(source == 'AC BUS A'){
						penalty = penalty + 0.018;
					}else if(source == 'AC BUS B'){
						penalty = penalty + 0.0221;
					}else if(source == 'CDR BUS'){
						penalty = penalty + 0.009;
					}
				}else{
					penalty = penalty + 0.039;
				}
				for(var i = 0; i < inputAr.length; i++){
					if(inputAr[i].status && inputAr[i] != switch2 && inputAr[i] != switch5 && inputAr[i] != switch9){
					penalty = penalty + 0.002;
					}
				}
			}else if(switch6.status){
				//AC inverter via Battery Relay Bus
				if(route == 'viaBus'){
					if(source == 'LMP BUS'){
						penalty = penalty + 0.036;
					}else if(source == 'AC BUS A'){
						penalty = penalty + 0.022;
					}else if(source == 'AC BUS B'){
						penalty = penalty + 0.023;
					}else if(source == 'CDR BUS'){
						penalty = penalty + 0.01;
					}
				}else{
					penalty = penalty + 0.042;
				}
				for(var i = 0; i < inputAr.length; i++){
					if(inputAr[i].status && inputAr[i] != switch1 && inputAr[i] != switch3 && inputAr[i] != switch6 && inputAr[i] != switch9){
					penalty = penalty + 0.002;
					}
				}
			}
		}else if(method == 'BATTERY RELAY BUS'){
			if(route == 'viaBus'){
				if(source == 'LMP BUS'){
					//Correct
				}else if(source == 'AC BUS A'){
					penalty = penalty + 0.032;
				}else if(source == 'AC BUS B'){
					penalty = penalty + 0.034;
				}else if(source == 'CDR BUS'){
					penalty = penalty + 0.026;
				}
			}else{
				penalty = penalty + 0.032;
			}
			for(var i = 0; i < inputAr.length; i++){
				if(inputAr[i].status && inputAr[i] != switch1 && inputAr[i] != switch3 && inputAr[i] != switch6 && inputAr[i] != switch8){
					penalty = penalty + 0.002;
				}
			}
		}else if(method == 'DC MAIN BUS A'){
			if(route == 'viaBus'){
				if(source == 'LMP BUS'){
					penalty = penalty + 0.012;
				}else if(source == 'AC BUS A'){
					penalty = penalty + 0.015;
				}else if(source == 'AC BUS B'){
					penalty = penalty + 0.02;
				}else if(source == 'CDR BUS'){
					penalty = penalty + 0.01;
				}
			}else{
				penalty = penalty + 0.024;
			}
			for(var i = 0; i < inputAr.length; i++){
				if(inputAr[i].status && inputAr[i] != switch1 && inputAr[i] != switch4 && inputAr[i] != switch8){
					penalty = penalty + 0.002;
				}
			}
		}else if(method == 'DC MAIN BUS B'){
			if(route == 'viaBus'){
				if(source == 'LMP BUS'){
					penalty = penalty + 0.028;
				}else if(source == 'AC BUS A'){
					penalty = penalty + 0.030;
				}else if(source == 'AC BUS B'){
					penalty = penalty + 0.0211;
				}else if(source == 'CDR BUS'){
					//Correct
				}
			}else{
				penalty = penalty + 0.024;
			}
			for(var i = 0; i < inputAr.length; i++){
				if(inputAr[i].status && inputAr[i] != switch2 && inputAr[i] != switch5 && inputAr[i] != switch8){
					penalty = penalty + 0.002;
				}
			}
		}
		var eff = 0.049 - penalty
		if(eff < 0){
			eff = 0;
		}
		if(!simmed){
			var sim = new simulation(battAr, source, inputAr, current, voltage, method, eff);
			simEff = eff;
			if(simAr.length > 1){
				simAr.sort(sortSims);
			}
		}
	}
	
	function sortSims(a, b){
		return b.efficiency - a.efficiency;
	}
	
	function checkSims(){
		simmed = false;
		currentSetup.batteries = battAr;
		currentSetup.source = source;
		currentSetup.switches = inputAr;
		currentSetup.current = current;
		currentSetup.voltage = voltage;
		for(var i = 0; i < simAr.length; i++){
			var btts = true;
			for(var p = 0; p < currentSetup.batteries.length; p++){
				if(currentSetup.batteries[p].status != simAr[i].batteries[p]){
					btts = false;	
				}
			}
			var swtch = true;
			for(var f = 0; f < currentSetup.batteries.length; f++){
				if(currentSetup.switches[f].status != simAr[i].switches[f]){
					swtch = false;
				}
			}
 			if(btts == true && swtch == true && currentSetup.source == simAr[i].source && currentSetup.current == simAr[i].current && currentSetup.voltage == simAr[i].voltage){
				simmed = true;
				currentEff = simAr[i].efficiency;
			}
		}
	}
	
	function drawBestSim(){
		a = simAr[0];
		wrapText(ctx, "Source:", 537, 190, 203, 20);
		for(var p = 0; p < a.batteries.length; p++){
			var f = 1;
			if(p == 2 || p == 3){
				f = 3;
			}else if(p == 4 || p == 5){
				f = -2;
			}
			if(a.batteries[p]){
				ctx.fillText('BATTERY '+ (p+f).toString()+ ' ON', 537, 220+(p*20));
			}else{
				ctx.fillText('BATTERY '+ (p+f).toString()+ ' OFF', 537, 220+(p*20));
			}
		}
		wrapText(ctx, a.source, 537, 355, 203, 20);
		wrapText(ctx, 'Input method:', 537, 400, 203, 20);
		wrapText(ctx, a.method, 537, 420, 203, 20);
		wrapText(ctx, 'Mode:', 537, 460, 203, 20);
		wrapText(ctx, a.current +' - '+ a.voltage.toUpperCase(), 537, 480, 203, 20);
		wrapText(ctx, 'Efficiency: '+ Math.round(a.efficiency*10000)/10 + ' %', 537, 520, 203, 20);
	}
	
	function drawSim(){
		ctx.strokeRect(220, 370, 60, 110);
		ctx.strokeRect(520, 370, 60, 110);
		ctx.lineWidth = 2;
		ctx.strokeRect(280, 476, 240, 4);
		
		if(progress < 10){
			var w = progress*(240/10)
			ctx.fillRect(280, 476, w, 4);
		}else if(progress >= 10 && progress <= 40){
			ctx.fillRect(280, 476, 240, 4);
		}else if(progress > 40 && progress < 50){
			var w = 240 - (progress-40)*(240/10)
			ctx.fillRect(520-w, 476, w, 4);
		}
		
		if(progress < 40){
			var lm = 110 - progress*(110/40)
			ctx.fillRect(220, 480-lm, 60, lm);
		}
		
		if(progress > 10 && progress <= 50){
			var cm = (progress-10)*((110*simEff*10)/40)
			//var cm = (progress-10)*((110)/50)
			ctx.fillRect(520, 480-cm, 60, cm);
		}else if(progress > 50){
			var cm = 40*((110*simEff*10)/40)
			ctx.fillRect(520, 480-cm, 60, cm);
		}
		
		//Power symbol
		ctx.beginPath();
		ctx.moveTo(404, 463); //1
		ctx.lineTo(395, 478); //2
		ctx.lineTo(402, 478); //3
		ctx.lineTo(400, 489); //4
		ctx.lineTo(410, 472); //5
		ctx.lineTo(402, 472); //6
		ctx.lineTo(404, 463); //home
		ctx.lineWidth = 7;
		ctx.strokeStyle = black;
		ctx.stroke();
		ctx.fill();
		ctx.strokeStyle = white;
		
		if(progress < 60){
			progress++;
		}else {
			ctx.fillText('Effeciency: ', 220, 520);
			ctx.fillText(Math.round(simEff*10000)/10 + ' %', 220, 540);
			return_button.hashed = false;
			return_button.active = true;
		}
	}	

	TELMU_4_M01.input_Handler = function(params){
		for (var key in params) {
			var value = params[key];
			if(params['btn-act-enter']){
				if(phase == 2){
					if(setSelect){
						if(selectionArray[selection].active){
							selectionArray[selection].action();
						}
					}else{
						if(step == 1){
							if(selection == 0){
								route = 'direct'
							}else{
								route = 'viaBus'
							}
							if(route != null && route != undefined){
								battery_button.hashed = false;
							}
							selection = 1;
							setSelect = !setSelect;
							selectionArray[selection].active = true;
							checkPowSetup()
						}else if(step == 2){
							battAr[battSelect].status = !battAr[battSelect].status
							checkPowSetup();
						}else if(step == 3){
							if(busAr[busSelect].power){
								for(var i = 0; i < busAr.length; i++){
									if(i != busSelect){
										busAr[i].status = false;
									}
								}
								busAr[busSelect].status = !busAr[busSelect].status
								checkPowSetup();
							}
						}
					}
				}else if(phase == 3){
					if(setSelect){
						if(selectionArray[selection].active){
							selectionArray[selection].action();
						}
					}else{
						inputAr[inputSelect].status = !inputAr[inputSelect].status
						checkInput();
					}
				}else if(phase == 4){
					if(setSelect){
						if(selectionArray[selection].active){
							selectionArray[selection].action();
						}
					}else{	
						switch(modeSelect){
							case 0:
								if(current == 'AC'){
									voltage = 'high';
								}
								break;
							case 1:
								if(current == 'AC'){
									voltage = 'low';
								}
								break;
							case 2:	
								if(current == 'DC'){
									voltage = 'high';
								}
								break;
							case 3:
								if(current == 'DC'){
									voltage = 'low';
								}
								break;
						}
						if(voltage != null && voltage != undefined){
							mode = current + ' - ' + voltage.toUpperCase();
							inputConfirm_button.hashed = false;
						}		
					}
				}else{
					if(selectionArray[selection].active){
						selectionArray[selection].action();
					}
				}
			}
			if(params['btn-nav-up']){
				if(phase == 1){
					moveSelection(-1)
				}else if(phase == 2){
					if(setSelect){
						moveSelection(-1)
					}else{
						if(step == 1){
							selection = (selection+1)%2
						}else if(step == 2){
							if(battPos > 0){battPos--;}
							if(battSelect > 0){battSelect--;}
						}else if(step == 3){
							if(busSelect > 0){busSelect--;}
						}
					}
				}else if(phase == 3){
					if(setSelect){
						moveSelection(-1)
					}else{
						if(inputPos > 0){inputPos--;}
						if(inputSelect > 0){inputSelect--;}
					}
				}else if(phase == 4){
					if(setSelect){
						moveSelection(-1)
					}else{
						if(modeSelect > 0){modeSelect--;}
					}
				}
			}
			if(params['btn-nav-down']){
				if(phase == 1){
					moveSelection(1)
				}else if(phase == 2){
					if(setSelect){
						moveSelection(1)
					}else{
						if(step == 1){
							selection = (selection+1)%2
						}else if(step == 2){
							if(battPos < 3){battPos++;}
							if(battSelect < battAr.length - 1){battSelect++;}
						}else if(step == 3){
							if(busSelect < busAr.length - 1){busSelect++;}
						}
					}
				}else if(phase == 3){
					if(setSelect){
						moveSelection(1)
					}else{
						if(inputPos < 3){inputPos++;}
						if(inputSelect < inputAr.length - 1){inputSelect++;}
					}
				}else if(phase == 4){
					if(setSelect){
						moveSelection(1)
					}else{
						if(modeSelect < 3){modeSelect++;}
					}
				}
			}
			if(params['btn-nav-left']){
				if(phase == 2 || phase == 3 || phase == 4){
					if(setSelect){
						selectionArray[selection].active = false;
					}else{
						selection = 0;
						selectionArray[selection].active = true;
					}
					selection = 0;
					setSelect = !setSelect;
				}
			}
			if(params['btn-nav-right']){
				if(phase == 2 || phase == 3 || phase == 4){	
					if(setSelect){
						selectionArray[selection].active = false;
					}else{
						selection = 0;
						selectionArray[selection].active = true;
					}
					selection = 0;
					setSelect = !setSelect;
				}
			}
		}
	}

	if(!TELMU_4_M01.test_mode){
		a13.registerHandler('io_change', TELMU_4_M01.input_Handler);
		a13.unsubscribeFromAllDataChanges();
	}else{
		window.onkeydown = function(e){
			TELMU_4_M01.input_Handler(keyTest(e.keyCode))
		}
	}
	
	//Start the task
	loop();
}