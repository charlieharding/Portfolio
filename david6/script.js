// Version 73
var allSounds = [];
function startGame(){
	
	var preloadON = false; 			//Turn preload on/off
	var cutOn = true; 				//Turn the starting cutscene on/off
	var mute = false;				//Turn sounds on/off
	
	var currentLevel = 0;	 		//Set starting level
	var completedLevels = 13;		//How many levels the player has completed.

	var script = new Array;	
	var userFunction = new Array;
	var david2Script = new Array;
	
	if(preloadON == true){
		console.log('preloading on');
		queue = new createjs.LoadQueue();
		function assetsLoaded(){
			if(preloadON == true){
				drawAll();
			}
		};		
		queue.addEventListener("complete", assetsLoaded);
		queue.loadManifest([
			"images/addFunct.png",
			"images/addFunct2.png",
			"images/backSprite.gif",
			"images/beamSprite.gif",
			"images/blocks.gif",
			"images/blocks2.gif",
			"images/clear.png",
			"images/david1.png",
			"images/david2.png",
			"images/dirt.gif",
			"images/endPoint.gif",
			"images/grassSprite.gif",
			"images/grassSprite2.gif",
			"images/grassSprite2B.gif",
			"images/grassSpriteB.gif",
			"images/highlight.gif",
			"images/idleSprite.png",
			"images/idleSprite2.png",
			"images/landerTopDown2.png",
			"images/meteor.png",
			"images/nasaMan.png",
			"images/overview.png",
			"images/planetSprite.png",
			"images/rocketSprite.png",
			"images/sand.gif",
			"images/schemSprite.png",
			"images/smallArrows.gif",
			"images/springSprite.png",
			"images/starBack.gif",
			"images/titleText.png",
			//Levels
			"images/level00.gif",
			"images/level01.gif",
			"images/level02.gif",
			"images/level03.gif",
			"images/level04.gif",
			"images/level05.gif",
			"images/level06.gif",
			"images/level07.gif",
			"images/level08.gif",
			"images/level09.gif",
			"images/level10.gif",
			"images/level11.gif",
			"images/level12.gif",
			"images/level13.gif",
			//Sounds
			"sound/intro.mp3",
			"sound/track1a.mp3",
			"sound/track1b.mp3",
			"sound/track1c.mp3",
			"sound/track1d.mp3",
			"sound/track2a.mp3",
			"sound/track2b.mp3",
			"sound/track2c.mp3",
			"sound/track2d.mp3",
			"sound/track2e.mp3",
			"sound/track3a.mp3",
			"sound/track3b.mp3",
			"sound/track3c.mp3",
			"sound/track4a.mp3",
			"sound/track4b.mp3",
			"sound/track4c.mp3",
			"sound/track4d.mp3",
			"sound/track4e.mp3",
			"sound/track4f.mp3"
		]);
	}

	//set base value to rescale everthing.
	var fullscreen = false;
	if (screen.height == window.outerHeight) { 
		fullscreen = true;
	}

	var allH;
	var allW;
	var testW = (document.getElementById('DavidSix').offsetHeight) * 1.8
	
	if( testW > document.getElementById('DavidSix').offsetWidth){
		allW = (document.getElementById('DavidSix').offsetWidth)
		allH = (allW/1.8);
	}else {
		allH = (document.getElementById('DavidSix').offsetHeight);
		allW = (allH * 1.8);
	}
	
	// Colors;
	var orangeColor = '#FF6600';
	var blackColor = '#000000';
	var headColor = '#f1f4f5'; //Text color.
	var boxColor = '#515458';
	var greenBox = '#375932';
	var greenText = '#1a860b';
	var purpleText = '#803AB5';
	var purpleBox = '#411E5C';
	
	// Key sizes, 
	var intW = (allW - allH);
	var intH = allH;	
	var lvlW = intH;
	var lvlH = allH;
	var headSize = (allH * 0.040); //Base text size.

	//Create Layers.
		layer_names = ['level', 'intFace', 'tut', 'menu', 'cut'],
		layers = [];
		layer_names.forEach(function(layer_name) {
			layers[layer_name] = new Kinetic.Layer
		});

	//
	//	Audio files.
	//
	var allSounds = [];

	
	var introTrack = new Audio();
		introTrack.src = 'sound/intro.mp3';
		allSounds.push(introTrack);
		
	var interlude = new Audio();
		interlude.src = 'sound/interlude.mp3';
		allSounds.push(interlude);
		interlude.loop = true;
	
	var oldSounds = interlude;
	
	
	//Track 1
	var track1a = new Audio();
		track1a.src = 'sound/track1a.mp3';
		allSounds.push(track1a);
		var trackOver1a = new Audio();
			trackOver1a.src = 'sound/track1a.mp3';
			allSounds.push(trackOver1a);
	
	var track1b = new Audio();
		track1b.src = 'sound/track1b.mp3';
		allSounds.push(track1b);
		var trackOver1b = new Audio();
			trackOver1b.src = 'sound/track1b.mp3';
			allSounds.push(trackOver1b);
	
	var track1c = new Audio();
		track1c.src = 'sound/track1c.mp3';
		allSounds.push(track1c);
		var trackOver1c = new Audio();
			trackOver1c.src = 'sound/track1c.mp3';
			allSounds.push(trackOver1c);
	
	var track1d = new Audio();
		track1d.src = 'sound/track1d.mp3';
		allSounds.push(track1d);
		var trackOver1d = new Audio();
			trackOver1d.src = 'sound/track1d.mp3';
			allSounds.push(trackOver1d);
	
	//Track 2
	var track2a = new Audio();
		track2a.src = 'sound/track2a.mp3';
		allSounds.push(track2a);
		var trackOver2a = new Audio();
			trackOver2a.src = 'sound/track2a.mp3';
			allSounds.push(trackOver2a);
			
	var track2b = new Audio();
		track2b.src = 'sound/track2b.mp3';
		allSounds.push(track2b);
		var trackOver2b = new Audio();
			trackOver2b.src = 'sound/track2b.mp3';
			allSounds.push(trackOver2b);
	
	var track2c = new Audio();
		track2c.src = 'sound/track2c.mp3';
		allSounds.push(track2c);
		var trackOver2c = new Audio();
			trackOver2c.src = 'sound/track2c.mp3';
			allSounds.push(trackOver2c);
	
	var track2d = new Audio();
		track2d.src = 'sound/track2d.mp3';
		allSounds.push(track2d);
		var trackOver2d = new Audio();
			trackOver2d.src = 'sound/track2d.mp3';
			allSounds.push(trackOver2d);
			
	var track2e = new Audio();
		track2e.src = 'sound/track2e.mp3';
		allSounds.push(track2e);
		var trackOver2e = new Audio();
			trackOver2e.src = 'sound/track2e.mp3';
			allSounds.push(trackOver2e);
	
	//Track 3
	var track3a = new Audio();
		track3a.src = 'sound/track3a.mp3';
		allSounds.push(track3a);
		var trackOver3a = new Audio();
			trackOver3a.src = 'sound/track3a.mp3';
			allSounds.push(trackOver3a);
			
	var track3b = new Audio();
		track3b.src = 'sound/track3b.mp3';
		allSounds.push(track3b);
		var trackOver3b = new Audio();
			trackOver3b.src = 'sound/track3b.mp3';
			allSounds.push(trackOver3b);
	
	var track3c = new Audio();
		track3c.src = 'sound/track3c.mp3';
		allSounds.push(track3c);
		var trackOver3c = new Audio();
			trackOver3c.src = 'sound/track3c.mp3';
			allSounds.push(trackOver3c);
	
	//Track 4 
	
	var track4a = new Audio();
		track4a.src = 'sound/track4a.mp3';
		allSounds.push(track4a);
		var trackOver4a = new Audio();
			trackOver4a.src = 'sound/track4a.mp3';
			allSounds.push(trackOver4a);
			
	var track4b = new Audio();
		track4b.src = 'sound/track4b.mp3';
		allSounds.push(track4b);
		var trackOver4b = new Audio();
			trackOver4b.src = 'sound/track4b.mp3';
			allSounds.push(trackOver4b);
	
	var track4c = new Audio();
		track4c.src = 'sound/track4c.mp3';
		allSounds.push(track4c);
		var trackOver4c = new Audio();
			trackOver4c.src = 'sound/track4c.mp3';
			allSounds.push(trackOver4c);
			
	var track4d = new Audio();
		track4d.src = 'sound/track4d.mp3';
		allSounds.push(track4d);
		var trackOver4d = new Audio();
			trackOver4d.src = 'sound/track4d.mp3';
			allSounds.push(trackOver4d);
			
	var track4e = new Audio();
		track4e.src = 'sound/track4e.mp3';
		allSounds.push(track4e);
		var trackOver4e = new Audio();
			trackOver4e.src = 'sound/track4e.mp3';
			allSounds.push(trackOver4e);


	var track4f = new Audio();
		track4f.src = 'sound/track4f.mp3';
		allSounds.push(track4f);
		var trackOver4f = new Audio();
			trackOver4f.src = 'sound/track4f.mp3';
			allSounds.push(trackOver4f);
		
			
	function muteAll(){
		for(var i = 0; i < allSounds.length; i++){
			allSounds[i].mute = true;
		}
	}
	
	//var fadeSoundInt;	
	function fadeSound(sound, speed, inOut, volume){
		//Fades a sound out. For sound tracks not effects
		sound.play();
		var oldVolume = sound.volume;
		if(inOut == 'in'){sound.volume = 0;}
		var fadeSoundInt = setInterval(function(){
			if(inOut == 'out'){
				if(sound.volume > speed){
					sound.volume -= speed;
				}else{
					clearInterval(fadeSoundInt);
					sound.pause();
					sound.currentTime = 0;
					sound.volume = oldVolume;
				}
			}else if(inOut == 'in'){
				var buffer = (volume - speed);
				if(sound.volume < buffer){
					sound.volume += speed;
				}else{
					clearInterval(fadeSoundInt);
					sound.volume = volume;
				}
			}
		}, 50);
	}
	
	function levelSound(){
		if(mute == false){
			//fade out interlude
			if(interlude.paused == false){
				console.log('interlude is playing');
				fadeSound(interlude, 0.04, 'out', 1);
			}
			//fade in level sounds
			fadeSound(lvl.sound[0], 0.008, 'in', 1)
			lvl.sound[1].volume = 1;
			
			lvl.sound[0].removeEventListener('timeupdate', function(){
				overlap(lvl.sound[2], lvl.sound[0], lvl.sound[1])
			});
			lvl.sound[0].addEventListener('timeupdate', function(){
				overlap(lvl.sound[2], lvl.sound[0], lvl.sound[1])
			});
			
			lvl.sound[0].removeEventListener('ended', function(){
				lvl.sound[0].currentTime = 0;
			});
			lvl.sound[0].addEventListener('ended', function(){
				lvl.sound[0].currentTime = 0;
			});
			
			lvl.sound[1].removeEventListener('timeupdate', function(){
				overlap(lvl.sound[2], lvl.sound[1], lvl.sound[0])
			});
			lvl.sound[1].addEventListener('timeupdate', function(){
				overlap(lvl.sound[2], lvl.sound[1], lvl.sound[0])
			});
			
			lvl.sound[1].removeEventListener('ended', function(){
				lvl.sound[1].currentTime = 0;
			});
			lvl.sound[1].addEventListener('ended', function(){
				lvl.sound[1].currentTime = 0;
			});
		}		
	}
	
	function overlap(val, sound, newSound){
		//Function to account for tracks that need to overlap.
		var dur = sound.duration;
		var newEnd = dur - val;
		if(sound.currentTime >= newEnd){
			newSound.play();
		}
	}
	
	//
	//	Opening Cinematics.
	//
	
	var cutScene = new Array(planetSeq, rocketSeq) 
	
	function drawStart(){
		// Draw the first screen with the start icon.
		startScreen = new Kinetic.Rect({
			x: 0,
			y: 0,
			width:	allW,
			height: allH,
			fill: '#000000'
		});
		startText = new Kinetic.Text({
			x: 0,
			y: 0,
			text: '   START   ',
			fontSize: allH*0.06,
			padding: allH*0.03,
			align: 'center',
			fontFamily: 'pixel',
			lineHeight: 0.9,
			fill: '#f1f4f5'
		});
		startText.setX(allW/2-(startText.getWidth()/2))
		startText.setY(allH/2-(startText.getHeight()/2))
		
		startBack = new Kinetic.Rect({
			x: startText.getX(),
			y: startText.getY(),
			width: startText.getWidth(),
			height: startText.getHeight(),
			stroke: '#f1f4f5',
			strokeWeight: allW*0.0008
		});
		
		startText.on('mouseover', function() {
			document.body.style.cursor = 'pointer';
		});
		startText.on('mouseout', function() {
			document.body.style.cursor = 'default';
		});
		startText.on('click', function(){
			introTrack.play();
			startText.setListening(false);
			document.body.style.cursor = 'default';
			cutScene[0]();
			startScreenAni.start();
			skipButton();
		});
		
		var startScreenAni = new Kinetic.Animation(function(frame) {
			if(startScreen.getOpacity() >= 0.03){
				startScreen.setOpacity(1 - (frame.time * 0.001));
				startText.setOpacity(1 - (frame.time * 0.001));
				startBack.setOpacity(1 - (frame.time * 0.001));
			}else{
				startScreen.remove();
				startText.remove();
				startBack.remove();
				startScreenAni.stop();
			}
		}, layers.cut);
		
		layers.cut.add(startScreen);
		layers.cut.add(startBack);
		layers.cut.add(startText);
	}
	
	var planetImage = new Image();
	planetImage.src = 'images/planetSprite.png';
		var planetAni = {
			planetPlay:[
				{x: 0, y: (108*0), width: 192,height: 108},{x: 0, y: (108*1), width: 192,height: 108},
				{x: 0, y: (108*2), width: 192,height: 108},{x: 0, y: (108*3), width: 192,height: 108},
				{x: 0, y: (108*4), width: 192,height: 108},{x: 0, y: (108*5), width: 192,height: 108},
				{x: 0, y: (108*6), width: 192,height: 108},{x: 0, y: (108*7), width: 192,height: 108},
			]};
	function planetSeq(){
		// Planet Discovery. Draw the first shot of the cut-scene.
		planet = new Kinetic.Sprite({
			x: 0,
			y: 0,
			scaleX: allW/192,
			scaleY: allH/108,
			image: planetImage,
			animation: 'planetPlay',
			animations: planetAni,
			frameRate: 8
		});
		layers.cut.add(planet);
		//cutMessage(0, 0.2, 0.72, 0.8,
		//	'Thirteen years ago we recieved a strange signal from a planet similar to our own...');
		cutMessageAni(0, 0.2, 0.72, 0.8,
			'Thirteen years ago we recieved a strange signal from a planet similar to our own...');
		//Move the previous screen elements above this one for the fade through.
		planet.moveToBottom();
		planet.start();
			//Start timer to change shot.
			planetTime = setTimeout(function(){cutScene[1]()}, 8000)
	}

		var rocketImage = new Image();
		rocketImage.src = 'images/rocketSprite.png';
			var rocketAni = {
				rocketPlay:[
				{x: 0, y: (108*0), width: 192,height: 108},
				{x: 0, y: (108*1), width: 192,height: 108},
				{x: 0, y: (108*2), width: 192,height: 108},
				{x: 0, y: (108*3), width: 192,height: 108},
			]};
			
		var planetFadeAni = new Kinetic.Animation(function(frame) {
		//Fade the planet out.
				if(planet.getOpacity() >= 0.03){
					planet.setOpacity(1 - (frame.time * 0.002));
					cutGroup[0].setOpacity(1 - (frame.time * 0.002));
				}else{
					planet.remove();
					cutGroup[0].remove();
					planetFadeAni.stop();
				}
			}, layers.cut);
	
	function rocketSeq(){
		planetFadeAni.start();
		// RocketLaunch. Draw the second shot of the cut-scene.
		rocket = new Kinetic.Sprite({
			x: 0,
			y: 0,
			scaleX: allW/192,
			scaleY: allH/108,
			image: rocketImage,
			animation: 'rocketPlay',
			animations: rocketAni,
			frameRate: 5
		});
		layers.cut.add(rocket);
		cutMessageAni(1, 0.2, 0.78, 0.8,
			'Over the years we\'ve made several trips to the planet... trying to unravel it\'s secrets.')
		//Move the previous screen elements above this one for the fade through.
		rocket.moveToBottom();
		rocket.start();
			//Start timer to change shot.
			rocketTime = setTimeout(function(){schem()}, 9000);
	}
	
		var schemImage = new Image();
		schemImage.src = 'images/schemSprite.png';
			var schemAni = {
				schemPlay:[
					{x: 0, y: 0, width: 576,height: 324}
				]};	
	
		var rocketFadeAni = new Kinetic.Animation(function(frame) {
			//Fade the planet out.
				if(rocket.getOpacity() >= 0.03){
					rocket.setOpacity(1 - (frame.time * 0.002));
					cutGroup[1].setOpacity(1 - (frame.time * 0.002));
				}else{
					rocket.remove();
					cutGroup[1].remove();
					rocketFadeAni.stop();
				}
		}, layers.cut);

	function schem(){
		// David shcematics.
		rocketFadeAni.start();
		schem = new Kinetic.Sprite({
			x: 0,
			y: 0,
			scaleX: allW/576,
			scaleY: allH/324,
			image: schemImage,
			animation: 'schemPlay',
			animations: schemAni,
			frameRate: 0
		});
		layers.cut.add(schem);
		cutMessageAni(3, 0.2, 0.74, 0.8,
			'Aboard our latest mission was a DAVID 6 rover...')
		//Move the previous screen elements above this one for the fade through.
		schem.moveToBottom();
			//Start timer to change shot.
			schemTime = setTimeout(function(){beamSeq()}, 8200)	
	}
	
		var beamImage = new Image();
		beamImage.src = 'images/beamSprite.gif';
			var beamAni = {
				beamPlay:[
				{x: 0, y: (108*0), width: 192,height: 108},{x: 0, y: (108*1), width: 192,height: 108},
				{x: 0, y: (108*2), width: 192,height: 108},{x: 0, y: (108*3), width: 192,height: 108},
				{x: 0, y: (108*4), width: 192,height: 108},{x: 0, y: (108*5), width: 192,height: 108},
				{x: 0, y: (108*6), width: 192,height: 108},{x: 0, y: (108*7), width: 192,height: 108},
				{x: 0, y: (108*8), width: 192,height: 108},{x: 0, y: (108*9), width: 192,height: 108},
				{x: 0, y: (108*10), width: 192,height: 108},{x: 0, y: (108*11), width: 192,height: 108},
				{x: 0, y: (108*12), width: 192,height: 108},{x: 0, y: (108*13), width: 192,height: 108},
				{x: 0, y: (108*14), width: 192,height: 108},{x: 0, y: (108*15), width: 192,height: 108},
				{x: 0, y: (108*16), width: 192,height: 108},{x: 0, y: (108*17), width: 192,height: 108},
				{x: 0, y: (108*18), width: 192,height: 108},{x: 0, y: (108*19), width: 192,height: 108},
				{x: 0, y: (108*20), width: 192,height: 108},{x: 0, y: (108*21), width: 192,height: 108},
				{x: 0, y: (108*22), width: 192,height: 108},{x: 0, y: (108*23), width: 192,height: 108}
			]};
			
		var schemFadeAni = new Kinetic.Animation(function(frame) {
		//Fade the schematics out.
				if(schem.getOpacity() >= 0.03){
					schem.setOpacity(1 - (frame.time * 0.002));
					cutGroup[3].setOpacity(1 - (frame.time * 0.002));
				}else{
					schem.remove();
					cutGroup[3].remove();
					schemFadeAni.stop();
				}
			}, layers.cut);
	
	function beamSeq(){
		schemFadeAni.start();
		// Beam-Satellite shot.
		beam = new Kinetic.Sprite({
			x: 0,
			y: 0,
			scaleX: allW/192,
			scaleY: allH/108,
			image: beamImage,
			animation: 'beamPlay',
			animations: beamAni,
			frameRate: 8
		});
		layers.cut.add(beam);
		cutMessageAni(4, 0.2, 0.74, 0.8,
			'We can control David from Earth but only in short bursts...')
		//Move the previous screen elements above this one for the fade through.
		beam.moveToBottom();
		beam.start();
			//Start timer to change shot.
			beamTime = setTimeout(function(){landerSeq()}, 8000);
	}
	
		
		var landerImage = new Image();
		landerImage.src = 'images/landerSprite.png';
		var starBackImage = new Image();
		starBackImage.src = 'images/backSprite.gif';
		var titleTextImage = new Image();
		titleTextImage.src = 'images/titleText.png';
		
		var landerAni = {
			landerPlay:[
				{x: 0, y: (44*0), width: 41, height: 44},{x: 0, y: (44*1), width: 41, height: 44},{x: 0, y: (44*2), width: 41, height: 44},{x: 0, y: (44*3), width: 41, height: 44},{x: 0, y: (44*4), width: 41, height: 44}
			]};
			
		var starBackAni = {
			starBackPlay:[
				{x: 0, y: (108*0), width: 192, height: 108},
				{x: 0, y: (108*1), width: 192, height: 108},
				{x: 0, y: (108*2), width: 192, height: 108},
				{x: 0, y: (108*3), width: 192, height: 108},
				{x: 0, y: (108*4), width: 192, height: 108},
				{x: 0, y: (108*5), width: 192, height: 108}
			]};
		var beamFadeAni = new Kinetic.Animation(function(frame) {
		//Fade the beam out.
				if(beam.getOpacity() >= 0.03){
					beam.setOpacity(1 - (frame.time * 0.002));
					cutGroup[4].setOpacity(1 - (frame.time * 0.002));
				}else{
					beam.remove();
					cutGroup[4].remove();
					beamFadeAni.stop();
				}
			}, layers.cut);
		
		var aniTime0 = 0;
		var aniTime1 = 0;
		var aniTime2 = 0;
		var aniTime3 = 0;
		
		var moveLander = new Kinetic.Animation(function(frame) {
			//Move lander down
				if(lander.getY() <= allH*0.43){
					lander.setY(allH*(0.1+(aniTime0 * 0.000279)));
					aniTime0++;
				}else{
					moveLander.stop();
				}
		}, layers.cut);
		var fadeLastText = new Kinetic.Animation(function(frame) {
			//Fade out final text box.
			if(cutGroup[5].getOpacity() >= 0.03){
				cutGroup[5].setOpacity(1 - (aniTime1 * 0.006));
				aniTime1++;
			}else{
				cutGroup[5].remove();
				fadeLastText.stop();
			}
		}, layers.cut);
		var titleFadeIn = new Kinetic.Animation(function(frame) {
			//Fade in title text.
			if(titleText.getOpacity() < 1){
				titleText.setOpacity(aniTime2 * 0.003);
				aniTime2++;
			}else{
				titleText.setOpacity(1);
				titleFadeIn.stop();
			}
		}, layers.cut);
		var fadeInPlay = new Kinetic.Animation(function(frame) {
			//Fade in play button.
			if(playGroup.getOpacity() < 1){
				playGroup.setOpacity(aniTime3 * 0.03);
				aniTime3++;
			}else{
				playGroup.setOpacity(1);
				fadeInPlay.stop();
			}
		}, layers.cut);
	
	function landerSeq(){
		beamFadeAni.start();
		starBack = new Kinetic.Sprite({
			x: 0,
			y: 0,
			scaleX: allW/192,
			scaleY: allW/192,
			animation: 'starBackPlay',
			animations: starBackAni,
			image: starBackImage,
			frameRate: 5
		});
		lander = new Kinetic.Sprite({
			x: 0,
			y: allH*0.1,
			scaleX: (allW/41)/4.5,
			scaleY: (allW/41)/4.5,
			image: landerImage,
			animation: 'landerPlay',
			animations: landerAni,
			frameRate: 8
		});
		
		titleText = new Kinetic.Image({
			x: 0,
			y: allH*0.2,
			width: 86,
			height: 15,
			scale: (allW/86)/2,
			image: titleTextImage
		});
		lander.setX((allW * .5) - (allW/9));
		titleText.setX((allW * .5) - (allW/4));
		titleText.setOpacity(0);
		layers.cut.add(starBack);
		layers.cut.add(lander);
		layers.cut.add(titleText);
		cutMessageAni(5, 0.2, 0.74, 0.8,
			'It\'s up to you to guide David across the planet\'s perilous, maze-like surface...')
		//Move the previous screen elements above this one for the fade through.
		titleText.moveToBottom();
		lander.moveToBottom();
		starBack.moveToBottom();
		lander.start();
		starBack.start();
		moveLander.start();
			playButton();
			//Start timer to change shot.
			landerTime0 = setTimeout(function(){
				aniMessage(cutGroup[5].getChildren()[1],'...and discover the source of the signal.')
			}, 8000);
			landerTime1 = setTimeout(function(){
				fadeLastText.start();
			}, 12000);
			landerTime2 = setTimeout(function(){
				titleFadeIn.start();
			}, 12500);
			landerTime3 = setTimeout(function(){
				fadeInPlay.start();
			}, 21600);
	}
	
		var cutFade = new Kinetic.Animation(function(frame) {
			//Fade the schematics out.
				if((1-(frame.time*0.002)) >= 0.03){
					layers.cut.getChildren().each(function(child){
						child.setOpacity(1 - (frame.time * 0.002));
					});
				}else{
					cutFade.stop();
					layers.cut.destroyChildren();
				}
		}, layers.cut);
	
	function playButton(){
		//Button to remove cut scene and draw game.
		playText = new Kinetic.Text({
			x: 0,
			y: allH*0.51,
			text: '   PLAY   ',
			fontSize: allH*0.06,
			padding: allH*0.03,
			align: 'center',
			fontFamily: 'pixel',
			lineHeight: 0.9,
			fill: '#f1f4f5'
		});
		playText.setX(allW/2-(playText.getWidth()/2))
		
		playBack = new Kinetic.Rect({
			x: playText.getX(),
			y: playText.getY(),
			width: playText.getWidth(),
			height: playText.getHeight(),
			fill: '#000',
			opacity: 0.7,
			stroke: '#f1f4f5',
			strokeWeight: allW*0.0008
		});
		
			playGroup = new Kinetic.Group({
			});
		playGroup.add(playBack);
		playGroup.add(playText);
		layers.cut.add(playGroup);
		
		playGroup.setOpacity(0);
		
		playGroup.on('mouseover', function() {
			document.body.style.cursor = 'pointer';
		});
		playGroup.on('mouseout', function() {
			document.body.style.cursor = 'default';
		});
		playGroup.on('click', function(){
			moveLander.stop();
			introTrack.pause();
			playGroup.setListening(false);
			document.body.style.cursor = 'default';
			levelDraw(levelArray[currentLevel]);
			intDraw();
			levelSound();
			cutFade.start();
		});
	}
	
		cutGroup = new Array(); //Array to hold shot text groups.
		function cutMessageAni(group, x, y, w, message) {
			//Function to add a message to the 
			var x = 0.2 * allW;
			var y = 0.86 * allH;
			var w = 0.6 * allW;
			var cutText = new Kinetic.Text({
				text: "",
				lineHeight: 1.3,
				fill: '#EEE',
				width: w,
				fontSize: (headSize * .82),
				fontFamily: 'pixel',
				x: x,
				y: y,
				padding: allW * 0.016,
				align: 'left'
			});  
			cutBack = new Kinetic.Rect({
				x: cutText.getX(),
				y: cutText.getY(),
				fill: '#000',
				opacity: 0.5,
				width: cutText.getWidth(),
				height: allH*0.124,
			});
			
			thisCutGroup = new Kinetic.Group({});
			
			thisCutGroup.add(cutBack);
			thisCutGroup.add(cutText);
			
			cutGroup[group] = thisCutGroup;
			layers.cut.add(thisCutGroup);
			thisCutGroup.moveToBottom();
			aniMessage(cutText, message);
		};
		
		function aniMessage(group, message){
			var currentMessage = "";
			var messagePos = 0;
			messageTime = setInterval(function(){
				if(messagePos < message.length){
					currentMessage = currentMessage + message[messagePos];
					messagePos++;
					group.setText(currentMessage);
				}else{
					clearInterval(messageTime);
				}
			}, 80);
		};
		
	var planetTime;
	var rocketTime;
	var schemTime;
	var beamTime;
	var landerTime0;	
	var landerTime1;	
	var landerTime2;	
	var landerTime3;	
	var playTime = 0;
	var moveLander;
	var fadeLastText;
	var fadeInPlay;
	var titleFadeIns;
	
	function skipButton(){
		skipCutText = new Kinetic.Text({
			text: 'SKIP',
			lineHeight: 1.3,
			fill: '#EEE',
			width: 0.08 * allW,
			fontSize: (headSize * .82),
			fontFamily: 'pixel',
			x: 0,
			y: 0,
			padding: allW * 0.016,
			align: 'left'
		});
		skipCutBack = new Kinetic.Rect({
			x: skipCutText.getX(),
			y: skipCutText.getY(),
			fill: '#000',
			opacity: 0.2,
			width: skipCutText.getWidth(),
			height: skipCutText.getHeight() - allH*0.016,
		});
		
		skipCutGroup = new Kinetic.Group({});
		skipCutGroup.add(skipCutBack);
		skipCutGroup.add(skipCutText);
		layers.cut.add(skipCutGroup);
		
		skipCutGroup.on('mouseover', function() {
			document.body.style.cursor = 'pointer';
		});
		skipCutGroup.on('mouseout', function() {
			document.body.style.cursor = 'default';
		});
		
		skipCutGroup.on('click', function(){
			planetFadeAni.stop();
			rocketFadeAni.stop();
			schemFadeAni.stop();
			beamFadeAni.stop();
			moveLander.stop();
			moveLander.stop();
			fadeLastText.stop();
			fadeInPlay.stop();
			titleFadeIn.stop();
			
			clearTimeout(planetTime);
			clearTimeout(rocketTime);
			clearTimeout(schemTime);
			clearTimeout(beamTime);
			clearTimeout(landerTime0);
			clearTimeout(landerTime1);
			clearTimeout(landerTime2);
			clearTimeout(landerTime3);

			var fadeAll = new Kinetic.Animation(function(frame) {
				if(skipFadeGroup.getOpacity() < 0.99){
					skipFadeGroup.setOpacity(frame.time * 0.002);
				}else{
					fadeAll.stop();
				}
			}, layers.cut);
			
			var starBack = new Kinetic.Sprite({
				x: 0,
				y: 0,
				scaleX: allW/192,
				scaleY: allW/192,
				animation: 'starBackPlay',
				animations: starBackAni,
				image: starBackImage,
				frameRate: 5
			});
			var lander = new Kinetic.Sprite({
				x: 0,
				y: allH*0.45,
				scaleX: (allW/41)/4.5,
				scaleY: (allW/41)/4.5,
				image: landerImage,
				animation: 'landerPlay',
				animations: landerAni,
				frameRate: 8
			});
			var titleText = new Kinetic.Image({
				x: 0,
				y: allH*0.2,
				width: 86,
				height: 15,
				scale: (allW/86)/2,
				image: titleTextImage
			});
			
			lander.setX((allW * .5) - (allW/9));
			titleText.setX((allW * .5) - (allW/4));
			
			skipFadeGroup = new Kinetic.Group({});

			skipFadeGroup.add(starBack);
			skipFadeGroup.add(lander);
			skipFadeGroup.add(titleText);
			layers.cut.add(skipFadeGroup);			
			
			skipFadeGroup.setOpacity(0);
			skipFadeGroup.moveToTop();
			
			lander.start();
			fadeAll.start();
			playButton();
			var fadePlayIn = new Kinetic.Animation(function(frame){
				if(playGroup.getOpacity() < 1){
					playGroup.setOpacity(playTime * 0.04);
					playTime++;
				}else{
					playGroup.setOpacity(1);
				}
			});
			fadePlayInTime = setTimeout(function() {fadePlayIn.start()}, 2000);		
		});

	};	

	//
	//
	//
	//LEVEL BUILDING.
	//
	//
	//

		var scale;
		var davidDir = 0;
		var david2Dir = 0;
		var david2Ex = false;
		//Variable to set the level. Null on page refresh
		
		// Tiles for the level.
			//GrassTile
			var grassTileSet = new Array();
			
			function grassTile(g, xPos, yPos, w, h, cropX, cropY){
				var grassImg = new Image();
				grassImg.src = 'images/grassSprite.gif';
				grassImg.onload = function() {
					grassTileSet[g] = new Kinetic.Image({
						image: grassImg,
						x: xPos,
						y: yPos,
						name: 'grassA',
						width: w,
						height: h,
						crop: {
							x: cropX,
							y: cropY,
							width: 20,
							height: 20
						} 
					});
					layers.level.add(grassTileSet[g]);
					grassTileSet[g].moveToBottom();
				}	
			};
			function grassTile2(g, xPos, yPos, w, h, cropX, cropY){
				var grassImg = new Image();
				grassImg.src = 'images/grassSprite2.gif';
				grassImg.onload = function() {
					grassTileSet[g] = new Kinetic.Image({
						image: grassImg,
						x: xPos,
						y: yPos,
						name: 'grassA',
						width: w,
						height: h,
						crop: {
							x: cropX,
							y: cropY,
							width: 20,
							height: 20
						} 
					});
					layers.level.add(grassTileSet[g]);
					grassTileSet[g].moveToBottom();
				}	
			};
			function grassTileB(g, xPos, yPos, w, h, cropX, cropY){
				var grassImg = new Image();
				grassImg.src = 'images/grassSpriteB.gif';
				grassImg.onload = function() {
					grassTileSet[g] = new Kinetic.Image({
						image: grassImg,
						x: xPos,
						y: yPos,
						name: 'grassB',
						width: w,
						height: h,
						crop: {
							x: cropX,
							y: cropY,
							width: 20,
							height: 20
						} 
					});
					layers.level.add(grassTileSet[g]);
					grassTileSet[g].moveToBottom();
				}	
			};
			function grassTile2B(g, xPos, yPos, w, h, cropX, cropY){
				var grassImg = new Image();
				grassImg.src = 'images/grassSprite2B.gif';
				grassImg.onload = function() {
					grassTileSet[g] = new Kinetic.Image({
						image: grassImg,
						x: xPos,
						y: yPos,
						name: 'grassB',
						width: w,
						height: h,
						crop: {
							x: cropX,
							y: cropY,
							width: 20,
							height: 20
						} 
					});
					layers.level.add(grassTileSet[g]);
					grassTileSet[g].moveToBottom();
				}	
			};
			
			//Dirt
			
			var dirtTileSet = new Array();
			var d;
			
			function dirtTile(d, xPos, yPos, w, h){
				dirtImg = new Image();
				dirtImg.src = 'images/dirt.gif';
				dirtImg.onload = function() {
					dirtTileSet[d] = new Kinetic.Image({
						image: dirtImg,
						x: xPos,
						y: yPos,
						name: 'dirt',
						width: w,
						height: h
					});
					layers.level.add(dirtTileSet[d]);
					dirtTileSet[d].moveToBottom();
				}	
			};
			
			function clearTile(source, i){
				//Overlay a cleared dirt image over the grass tile after David 2 goes over it.
				dirtTileSet.push(source); //Add the grass tile to the dirt array
				grassTileSet.splice(i, 1); //Remove it from the grass tile set
				
				var xPos = source.getX();
				var yPos = source.getY();
				var w = source.getWidth();
				var h = source.getHeight();
				
				if(david2Dir == 0 || david2Dir == 2){var cropX = 20};
				if(david2Dir == 1 || david2Dir == 3){var cropX = 0};
				
				clearedImg = new Image();
				clearedImg.src = 'images/clear.png';
				clearedImg.onload = function() {
					var dirtTile = new Kinetic.Image({
						image: clearedImg,
						x: xPos,
						y: yPos,
						name: 'cleared',
						width: w,
						height: h,
						crop: {
							x: cropX,
							y: 0,
							width: 20,
							height: 20
						}
					});
					layers.level.add(dirtTile);
					dirtTileSet.push(dirtTile);
					david2.moveToTop();
					davidAni.moveToTop();
				}
			};
			
			//Sand		
			var sandTileSet = new Array();
			var s;
			
			function sandTile(s, xPos, yPos, w, h){
				var sandImg = new Image();
				sandImg.src = 'images/sand.gif';
				sandImg.onload = function() {
					sandTileSet[s] = new Kinetic.Image({
						image: sandImg,
						x: xPos,
						y: yPos,
						name: 'sand',
						width: w,
						height: h
					});
					layers.level.add(sandTileSet[s]);
					sandTileSet[s].moveToBottom();
				}	
			};
			
			function drawEnd(xPos, yPos, w, h, dir) {
				var endImage = new Image();
				endImage.src = 'images/endPoint.gif';
					endPoint = new Kinetic.Image({
						x: xPos,
						y: yPos,
						width:	w,
						height: h,
						image: endImage,
						name: 'endPointImg',
						crop: {
							x: 0,
							y: dir,
							width: 20,
							height: 20
						} 
					});
				layers.intFace.add(endPoint);
				pulseEndPoint.start();			
			};
			var amplitude = 1;
			var period = 2000;
			var pulseEndPoint = new Kinetic.Animation(function(frame) {
				//Pulse the opacity of the endpoint indicator.
				var endPoints = layers.intFace.get('.endPointImg');
				endPoints.each(function(end){
					end.setOpacity(0.5-(.5 * (Math.sin(frame.time * 2 * Math.PI / period))));
				});
			}, layers.intFace);
		
			//Special tiles, other Davids.
			function special1(d, xPos, yPos, scale){
				var david1Image = new Image();
				david1Image.src = 'images/david1.png';
				david1Image.onload = function() {
					var david1 = new Kinetic.Image({
						image: david1Image,
						x: xPos,
						y: yPos,
						name: 'david1',
						scaleX: scale,
						scaleY: scale
					});
					layers.level.add(david1);
				}	
			};
			function special2(d, xPos, yPos, scale){
				var landerTDImage = new Image();
				landerTDImage.src = 'images/landerTopDown2.png';
				landerTDImage.onload = function() {
					landerTD = new Kinetic.Image({
						image: landerTDImage,
						x: xPos,
						y: yPos,
						name: 'landerImage',
						id: 's2',
						offset:[10, 27],
						scaleX: scale,
						scaleY: scale
					});
					layers.level.add(landerTD);
				}	
			};
			function special3(d, xPos, yPos, w, h){
				landerHit = new Kinetic.Rect({
					x: xPos,
					y: yPos,
					width: w,
					height: h
				});
				layers.level.add(landerHit);	
			};
			
			function special4(d, xPos, yPos, scale, rotation){
				var meteorImg = new Image();
				meteorImg.src = 'images/meteor.png';
				meteorImg.onload = function() {
					meteor = new Kinetic.Image({
						image: meteorImg,
						x: xPos,
						y: yPos,
						name: 'meteor',
						id: 's4',
						scaleX: scale,
						scaleY: scale
					});
					meteor.setRotationDeg(rotation*90);
					layers.level.add(meteor);
				}	
			};
			function special5(d, xPos, yPos, scale, rotation){
				var springAni = {
					springPlay:[
					{x: (20*0), y: 0, width: 20,height: 40},
					{x: (20*1), y: 0, width: 20,height: 40},
					{x: (20*2), y: 0, width: 20,height: 40},
					{x: (20*3), y: 0, width: 20,height: 40},
					{x: (20*4), y: 0, width: 20,height: 40},
					{x: (20*5), y: 0, width: 20,height: 40},
				]};
				var springImg = new Image();
				springImg.src = 'images/springSprite.png';
				springImg.onload = function() {
					spring = new Kinetic.Sprite({
						x: xPos,
						y: yPos,
						name: 'spring',
						id: 's5',
						scaleX: scale,
						scaleY: scale,
						image: springImg,
						animation: 'springPlay',
						animations: springAni,
						frameRate: 4
					});
					spring.setRotationDeg(rotation*90);
					layers.level.add(spring);
					spring.start();
				}	
			};
		
		//
		//Function to draw level 
		//	
		
			function levelDraw(lvl) {		
				//Get level tutorial
				if(tuts == true){
					tutorial(levelArray[currentLevel]);
				}
				//Get level sound
				
				activeSlots = lvl.slots;
				//Tile loop. Run through and place the tiles.
					for(var i = 0; i < lvl.tiles.length; i++){
						var xPos = (( (i%lvl.width) * (allH/lvl.width))  + (allW - allH));						//Position of tile. 
						var yPos = ( (Math.floor(i/lvl.width)) * (allH/lvl.width) );
								
						var w = (allH/lvl.width);	//Size of the tile image on the canvas.
						var h = (allH/lvl.width);
						
						switch(lvl.tiles[i]){
							case 'g0':
								var cropX = 20; // Where to clip the image. Based on sprite needed. 
								var cropY = 20;
								new grassTile(i, xPos, yPos, w, h, cropX, cropY)
							break;
							case 'g1':
								var cropX = 20; // Where to clip the image. Based on sprite needed. 
								var cropY = 0;
								new grassTile(i, xPos, yPos, w, h, cropX, cropY)
							break;
							case 'g2':
								var cropX = 40; // Where to clip the image. Based on sprite needed. 
								var cropY = 20;
								new grassTile(i, xPos, yPos, w, h, cropX, cropY )
							break;
							case 'g3':
								var cropX = 20; // Where to clip the image. Based on sprite needed. 
								var cropY = 40;
								new grassTile(i, xPos, yPos, w, h, cropX, cropY )
							
							break;
							case 'g4':
								var cropX = 0; // Where to clip the image. Based on sprite needed. 
								var cropY = 20;
								new grassTile(i, xPos, yPos, w, h, cropX, cropY )
							
							break;
							case 'g5':
								var cropX = 40; // Where to clip the image. Based on sprite needed. 
								var cropY = 0;
								new grassTile(i, xPos, yPos, w, h, cropX, cropY)						
							break;
							case 'g6':
								var cropX = 40; // Where to clip the image. Based on sprite needed. 
								var cropY = 40;
								new grassTile(i, xPos, yPos, w, h, cropX, cropY )	
							break;
							case 'g7':
								var cropX = 0; // Where to clip the image. Based on sprite needed. 
								var cropY = 40;
								new grassTile(i, xPos, yPos, w, h, cropX, cropY )
							break;
							case 'g8':
								var cropX = 0; // Where to clip the image. Based on sprite needed. 
								var cropY = 0;
								new grassTile(i, xPos, yPos, w, h, cropX, cropY )
							break;
							case 'h0':
								var cropX = 0; // Where to clip the image. Based on sprite needed. 
								var cropY = 0;
								new grassTile2(i, xPos, yPos, w, h, cropX, cropY )
							break;
							case 'h1':
								var cropX = 20; // Where to clip the image. Based on sprite needed. 
								var cropY = 0;
								new grassTile2(i, xPos, yPos, w, h, cropX, cropY )
							break;
							case 'h2':
								var cropX = 40; // Where to clip the image. Based on sprite needed. 
								var cropY = 0;
								new grassTile2(i, xPos, yPos, w, h, cropX, cropY )
							break;
							case 'h3':
								var cropX = 0; // Where to clip the image. Based on sprite needed. 
								var cropY = 20;
								new grassTile2(i, xPos, yPos, w, h, cropX, cropY )
							break;
							case 'h4':
								var cropX = 20; // Where to clip the image. Based on sprite needed. 
								var cropY = 20;
								new grassTile2(i, xPos, yPos, w, h, cropX, cropY )
							break;
							case 'h5':
								var cropX = 0; // Where to clip the image. Based on sprite needed. 
								var cropY = 40;
								new grassTile2(i, xPos, yPos, w, h, cropX, cropY )
							break;
							case 'h6':
								var cropX = 20; // Where to clip the image. Based on sprite needed. 
								var cropY = 40;
								new grassTile2(i, xPos, yPos, w, h, cropX, cropY )
							break;
							
						//Alternate color grass
							case 'b0':
								var cropX = 20; // Where to clip the image. Based on sprite needed. 
								var cropY = 20;
								new grassTileB(i, xPos, yPos, w, h, cropX, cropY)
							break;
							case 'b1':
								var cropX = 20; // Where to clip the image. Based on sprite needed. 
								var cropY = 0;
								new grassTileB(i, xPos, yPos, w, h, cropX, cropY)
							break;
							
							case 'b2':
								var cropX = 40; // Where to clip the image. Based on sprite needed. 
								var cropY = 20;
								new grassTileB(i, xPos, yPos, w, h, cropX, cropY )
							break;
							case 'b3':
								var cropX = 20; // Where to clip the image. Based on sprite needed. 
								var cropY = 40;
								new grassTileB(i, xPos, yPos, w, h, cropX, cropY )
							
							break;
							case 'b4':
								var cropX = 0; // Where to clip the image. Based on sprite needed. 
								var cropY = 20;
								new grassTileB(i, xPos, yPos, w, h, cropX, cropY )
							break;
							case 'b5':
								var cropX = 40; // Where to clip the image. Based on sprite needed. 
								var cropY = 0;
								new grassTileB(i, xPos, yPos, w, h, cropX, cropY)						
							break;
							case 'b6':
								var cropX = 40; // Where to clip the image. Based on sprite needed. 
								var cropY = 40;
								new grassTileB(i, xPos, yPos, w, h, cropX, cropY )	
							break;
							case 'b7':
								var cropX = 0; // Where to clip the image. Based on sprite needed. 
								var cropY = 40;
								new grassTileB(i, xPos, yPos, w, h, cropX, cropY )
							
							break;
							case 'b8':
								var cropX = 0; // Where to clip the image. Based on sprite needed. 
								var cropY = 0;
								new grassTileB(i, xPos, yPos, w, h, cropX, cropY )
							break;
							case 'n0':
								var cropX = 0; // Where to clip the image. Based on sprite needed. 
								var cropY = 0;
								new grassTile2B(i, xPos, yPos, w, h, cropX, cropY )
							break;
							case 'n1':
								var cropX = 20; // Where to clip the image. Based on sprite needed. 
								var cropY = 0;
								new grassTile2B(i, xPos, yPos, w, h, cropX, cropY )
							break;
							case 'n2':
								var cropX = 40; // Where to clip the image. Based on sprite needed. 
								var cropY = 0;
								new grassTile2B(i, xPos, yPos, w, h, cropX, cropY )
							break;
							case 'n3':
								var cropX = 0; // Where to clip the image. Based on sprite needed. 
								var cropY = 20;
								new grassTile2B(i, xPos, yPos, w, h, cropX, cropY )
							break;
							case 'n4':
								var cropX = 20; // Where to clip the image. Based on sprite needed. 
								var cropY = 20;
								new grassTile2B(i, xPos, yPos, w, h, cropX, cropY )
							break;
							case 'n5':
								var cropX = 0; // Where to clip the image. Based on sprite needed. 
								var cropY = 40;
								new grassTile2B(i, xPos, yPos, w, h, cropX, cropY )
							break;
							case 'n6':
								var cropX = 20; // Where to clip the image. Based on sprite needed. 
								var cropY = 40;
								new grassTile2B(i, xPos, yPos, w, h, cropX, cropY )
							break;
						
						// DIRT AND SPECIAL TILES
							case 'd0':
								new dirtTile(i, xPos, yPos, w, h)
							break;

							case 's0':	//SAND
								new sandTile(i, xPos, yPos, w, h);
							break;	
							
							case 'e0':
								var dir = (lvl.endDir * 20);
								new dirtTile(i, xPos, yPos, w, h)
								drawEnd(xPos, yPos, w, h, dir);
								
							break;
							case 'e1':
								var dir = (lvl.endDir2 * 20);
								new dirtTile(i, xPos, yPos, w, h)
								drawEnd(xPos, yPos, w, h, dir);
							break;
							case 'e2':
								var dir = (lvl.endDir2 * 20);
								drawEnd(xPos, yPos, w, h, dir);
								var cropX = 20; // Where to clip the image. Based on sprite needed. 
								var cropY = 40;
								new grassTile(i, xPos, yPos, w, h, cropX, cropY )
							break;

							case 'w1':
								//Special 1 - David 1 on a G7 corner grasss sprite. Level 4
								var cropX = 0; // Where to clip the image. Based on sprite needed. 
								var cropY = 40;
								new grassTile(i, xPos, yPos, w, h, cropX, cropY )
								new special1(i, xPos, yPos, ((allH/lvl.width)/50))
							break;
							case 'w2':
								//Special 2 - The lander, level 1
								new dirtTile(i, xPos, yPos, w, h);
								new special2(i, xPos, yPos, ((allH/lvl.width)/25))
							break;
							case 'w3':
								//Special 2 - The lander, level 1 HITZONE for david collision
								new dirtTile(i, xPos, yPos, w, h);
								new special3(i, xPos, yPos, w, h);
							break;
							case 'w4':
								//Special 4 - Meteor crash on level 3
								var cropX = 20; // Where to clip the image. Based on sprite needed. 
								var cropY = 20;
								var rotation = 0
								new grassTileB(i, xPos, yPos, w, h, cropX, cropY)
								new special4(d, xPos, yPos, ((allH/lvl.width)/20), 0);
							break;
							case 'w5':
								//Special 5 - Meteor crash on level 3
								var cropX = 20; // Where to clip the image. Based on sprite needed. 
								var cropY = 20;
								var rotation = 0
								new grassTileB(i, xPos, yPos, w, h, cropX, cropY)
								new special5(d, xPos, yPos, ((allH/lvl.width)/20), 0);
							break;
						
						//DEFAULT TO DIRT
							default:
								new dirtTile(i, xPos, yPos, w, h);
						}
					}
				
				function drawGrid(){
					var existingGrids = layers.intFace.get('.gridLine');
					if(existingGrids.length > 0){
						existingGrids.each(function(gridLine){
							gridLine.remove();
						});
					}
					w = lvlW;
					n = lvl.width;
					t = (w* 0.008)
					for(var i = 1; i < n; i++){
						gridLine((((w/n)*i)+(intW - t/2)),0 ,t, lvlH)
					};  
					for(var i = 1; i < n; i++){
						gridLine(intW, (((w/n)*i) - t/2) ,lvlW, t)
					};   
				};
				
				function gridLine(x, y, w, h){
					grids = new Kinetic.Rect({
						x: x,
						y: y,
						width:	w,
						height: h,
						name: 'gridLine',
						fill: '#FF6600',
						opacity: 0.2
					});
					layers.intFace.add(grids);
				}
	
				scale = ((allH/lvl.width)/50);
				var davidX = (( lvl.start[0] * (allH/lvl.width)) + (allW - allH));
				var davidY = ( lvl.start[1] * (allH/lvl.width));
				davidDir = lvl.start[2];
				davidDraw(davidX, davidY, scale, davidDir);
				
				if(lvl.david2 == true){
					david2Ex = true;
					var d2X = (( lvl.david2Start[0] * (allH/lvl.width)) + (allW - allH));
					var d2Y = ( lvl.david2Start[1] * (allH/lvl.width));
					david2Dir = lvl.david2Start[2];
					david2Draw(d2X, d2Y, scale, david2Dir);
				}else{
					david2Ex = false;
				}
				
				drawGrid();
				grids.moveToTop;
				layers.level.draw();
				tutVisual();
			}
			//END of Function to Draw Level
	
	//END of Levels
	
	//
	//
	//LEVEL OVERVIEW
	//
	//
	
		
	var overArray = [];
	var menuOverArray = [];
	
	overviewGroup = new Kinetic.Group({
	});
	menuOverviewGroup = new Kinetic.Group({
	});
	
	var totalOverImg = new Image();
	totalOverImg.src = 'images/overview.png';

	function overLevel(id, end, endPos, start, overview, s){
		var overImg = new Image();
		overImg.src = overview;
		overKImg = new Kinetic.Image({
			image: overImg,
			x: intW,
			y: 0,
			width: 1,
			height: 1
		});
		
		this.scale = s;
		this.id = id;
		this.endDir = end;
		this.endPos = endPos;
		this.start = start;
		this.image = overKImg;
		
		overArray.push(this);
		menuOverArray.push(this);
	}
	
	function overBars() {
		overbarH1 = new Kinetic.Rect({
			x: intW,
			y: 0,
			width:	lvlW,
			height: lvlH*0.003,
			opacity: 0.7,
			fill: orangeColor
		});
		overbarH2 = new Kinetic.Rect({
			x: intW,
			y: 0,
			width:	lvlW,
			height: lvlH*0.003,
			opacity: 0.7,
			fill: orangeColor
		});
		overbarV1 = new Kinetic.Rect({
			x: intW,
			y: 0,
			width: lvlH*0.003,
			opacity: 0.7,
			height: lvlW,
			fill: orangeColor
		});
		overbarV2 = new Kinetic.Rect({
			x: intW,
			y: 0,
			width: lvlH*0.003,
			opacity: 0.7,
			height: lvlW,
			fill: orangeColor
		});

		barGroup = new Kinetic.Group({
		});
		
		barGroup.add(overbarH1);
		barGroup.add(overbarH2);
		barGroup.add(overbarV1);
		barGroup.add(overbarV2);
		
		layers.intFace.add(barGroup);
		
	}

	function showOverview(setVar) {
		overviewGroup.removeChildren();
		var overviewBack = new Kinetic.Rect({
			x: intW,
			y: 0,
			width:	lvlW,
			height: lvlH,
			fill: blackColor
		});
		overviewGroup.add(overviewBack);
		
		var totalOver = new Kinetic.Image({
			image: totalOverImg,
			x: 0,
			y: 0,
			name: 'totalOver',
			width: lvlW,
			height: lvlW
		});
		var imgX = intW;
		var imgY = 0;
		totalOver.setPosition(imgX, imgY);
		overviewGroup.add(totalOver);
		
		for(var i = 0; i < setVar+2; i++){
			if(i == 0){
				var scale = (lvlW/60)*overArray[i].scale;
				overArray[i].image.setWidth(scale);
				overArray[i].image.setHeight(scale);
				var x = intW;
				var y = (lvlH - overArray[i].image.getHeight());
				overArray[i].image.setPosition(x, y);
				overviewGroup.add(overArray[i].image);
			}
			else if(setVar+1 < levelArray.length && i > 0){
				var scale = (lvlW/60)*overArray[i].scale;
				overArray[i].image.setWidth(scale);
				overArray[i].image.setHeight(scale);
				switch(overArray[i-1].endDir){
					case 0:
						var x = overArray[i-1].image.getX();
						var y = overArray[i-1].image.getY() - overArray[i].image.getHeight();
						if(overArray[i-1].endPos[0] != overArray[i].start[0]){
							x = x + ((overArray[i-1].endPos[0] - overArray[i].start[0])*(lvlW/60));
						}
						overArray[i].image.setPosition(x, y);
					break;
					case 1:
						var x = overArray[i-1].image.getX() + overArray[i-1].image.getWidth();
						var y = overArray[i-1].image.getY();
						if(overArray[i-1].endPos[1] != overArray[i].start[1]){
							y = y + ((overArray[i-1].endPos[1] - overArray[i].start[1])*(lvlW/60));
						}
						overArray[i].image.setPosition(x, y);
					break;
					case 2:
						var x = overArray[i-1].image.getX();
						var y = overArray[i-1].image.getY() - overArray[i-1].image.getHeight();
						if(overArray[i-1].endPos[0] != overArray[i].start[0]){
							x = x + ((overArray[i-1].endPos[0] - overArray[i].start[0])*(lvlW/60));
						}
						overArray[i].image.setPosition(x, y);
					break;
					case 3:
						var x = overArray[i-1].image.getX() - overArray[i].image.getWidth();
						var y = overArray[i-1].image.getY();
						if(overArray[i-1].endPos[1] != overArray[i].start[1]){
							y = y + ((overArray[i-1].endPos[1] - overArray[i].start[1])*(lvlW/60));
						}
						overArray[i].image.setPosition(x, y);
					break;
				}
				overviewGroup.add(overArray[i].image);
				if(i <= setVar){
					overArray[i].image.setOpacity(1);
				}else if(i == setVar+1){
					overArray[i].image.setOpacity(0.3);
				}
			}
		}
				
		co1 = new Kinetic.Text({
			x: intW+(lvlW * 0.05),
			y: lvlH * 0.18,
			text: '',
			fontSize:  (headSize * 0.7),
			fontFamily: 'pixel',
			fill: headColor
		});
		co2 = new Kinetic.Text({
			x: intW+(lvlW * 0.05),
			y: lvlH * 0.15,
			text: '',
			fontSize:  (headSize * 0.7),
			fontFamily: 'pixel',
			fill: headColor
		});
		coTitle = new Kinetic.Text({
			x: intW+(lvlW * 0.05),
			y: lvlH * 0.05,
			text: levelArray[currentLevel-1].title,
			fontSize:  (headSize * 1),
			fontFamily: 'pixel',
			fill: headColor
		});

		overviewGroup.add(co1);
		overviewGroup.add(co2);
		overviewGroup.add(coTitle);
		
		layers.intFace.add(overviewGroup);
		overviewGroup.show();
		
		
		if(setVar+2 <= levelArray.length){
			overAnimate();
		}else{
			overviewGroup.removeChildren();
			levelDraw(lvl);
		}
	}
	
	function menuOverview(setVar) {
		menuOverviewGroup.removeChildren();
		var overviewBack = new Kinetic.Rect({
			x: intW,
			y: 0,
			width:	lvlW,
			height: lvlH,
			fill: blackColor
		});
		menuOverviewGroup.add(overviewBack);
		
		var totalOver = new Kinetic.Image({
			image: totalOverImg,
			x: 0,
			y: 0,
			name: 'totalOver',
			width: (lvlW/60)*60,
			height: (lvlW/60)*60
		});
		var imgX = intW;
		var imgY = 0;
		totalOver.setPosition(imgX, imgY);
		menuOverviewGroup.add(totalOver);
		
		for(var i = 0; i < setVar+2; i++){
			if(i == 0){
				var scale = (lvlW/60)*menuOverArray[i].scale;
				menuOverArray[i].image.setWidth(scale);
				menuOverArray[i].image.setHeight(scale);
				var x = intW;
				var y = (lvlH - menuOverArray[i].image.getHeight());
				menuOverArray[i].image.setPosition(x, y);
				menuOverviewGroup.add(menuOverArray[i].image);
			}else if(setVar < levelArray.length && i > 0){
				if(menuOverArray[i] != undefined){
					var scale = (lvlW/60)*menuOverArray[i].scale;
					menuOverArray[i].image.setWidth(scale);
					menuOverArray[i].image.setHeight(scale);
					switch(menuOverArray[i-1].endDir){
						case 0:
							var x = menuOverArray[i-1].image.getX();
							var y = menuOverArray[i-1].image.getY() - menuOverArray[i].image.getHeight();
							if(menuOverArray[i-1].endPos[0] != menuOverArray[i].start[0]){
								x = x + ((menuOverArray[i-1].endPos[0] - menuOverArray[i].start[0])*(lvlW/60));
							}
							menuOverArray[i].image.setPosition(x, y);
						break;
						case 1:
							var x = menuOverArray[i-1].image.getX() + menuOverArray[i-1].image.getWidth();
							var y = menuOverArray[i-1].image.getY();
							if(menuOverArray[i-1].endPos[1] != menuOverArray[i].start[1]){
								y = y + ((menuOverArray[i-1].endPos[1] - menuOverArray[i].start[1])*(lvlW/60));
							}
							menuOverArray[i].image.setPosition(x, y);	
						break;
						case 2:
							var x = menuOverArray[i-1].image.getX();
							var y = menuOverArray[i-1].image.getY() - menuOverArray[i-1].image.getHeight();
							if(menuOverArray[i-1].endPos[0] != menuOverArray[i].start[0]){
								x = x + ((menuOverArray[i-1].endPos[0] - menuOverArray[i].start[0])*(lvlW/60));
							}
							menuOverArray[i].image.setPosition(x, y);
						break;
						case 3:
							var x = menuOverArray[i-1].image.getX() - menuOverArray[i].image.getWidth();
							var y = menuOverArray[i-1].image.getY();
							if(menuOverArray[i-1].endPos[1] != menuOverArray[i].start[1]){
								y = y + ((menuOverArray[i-1].endPos[1] - menuOverArray[i].start[1])*(lvlW/60));
							}
							menuOverArray[i].image.setPosition(x, y);
						break;
					}
					menuOverviewGroup.add(menuOverArray[i].image);
					if(i <= setVar){
						overArray[i].image.setOpacity(1);
					}else if(i == setVar+1){
						overArray[i].image.setOpacity(0.3);
					}
				}
			}
		}
		layers.intFace.add(menuOverviewGroup);
	}
	
	function overAnimate(){
		overBars();
		var barAni = false;
		var oldPos1 = overArray[currentLevel-1].image.getX();
		var oldPos2 = overArray[currentLevel-1].image.getX()+overArray[currentLevel-1].image.getWidth();
		var oldPos3 = overArray[currentLevel-1].image.getY();
		var oldPos4 = overArray[currentLevel-1].image.getY()+overArray[currentLevel-1].image.getHeight();
		overbarV1.setX(oldPos1);
		overbarV2.setX(oldPos2);
		overbarH1.setY(oldPos3);
		overbarH2.setY(oldPos4);
		
		var newPos1 = overArray[currentLevel].image.getX();
		var newPos2 = overArray[currentLevel].image.getX()+overArray[currentLevel].image.getWidth();
		var newPos3 = overArray[currentLevel].image.getY();
		var newPos4 = overArray[currentLevel].image.getY()+overArray[currentLevel].image.getHeight();
		
		var frames = 100;
		var frameDif = 0;

		var overBarAni = new Kinetic.Animation(function(frame) {
			if(frameDif < frames){
				overbarV1.move(((newPos1-oldPos1)/frames),0);
				overbarV2.move(((newPos2-oldPos2)/frames),0);
				overbarH1.move(0,((newPos3-oldPos3)/frames));
				overbarH2.move(0, ((newPos4-oldPos4)/frames));
				frameDif++;
				var text1 = Math.floor(overbarV1.getX())
				var text2 = Math.floor(overbarH1.getY())
				var text3 = Math.floor(overbarV2.getX())
				var text4 = Math.floor(overbarH2.getY())	
				co1.setText(text1.toString() + " . " + text2.toString());
				co2.setText(text3.toString() + " . " + text4.toString());
			}else{			
				overBarAni.stop();
			}
		}, layers.intFace);
		overBarAni.start();
		overTitleAni(coTitle, lvl.title)
	}
	
	function replaceChar(s, n, t) {
		return s.substring(0, n) + t + s.substring(n + 1);
	}
	
	function overTitleAni(group, message){
			var overTitleAniCom = false;
			var currentTitle = levelArray[currentLevel-1].title;
			var messagePos = 0;
			messageTime = setInterval(function(){
				if(messagePos < message.length || messagePos < currentTitle.length){
					if(message[messagePos] != null && message[messagePos] != undefined){
						currentTitle = replaceChar(currentTitle, messagePos, message[messagePos]);
						messagePos++;
						group.setText(currentTitle);
					}else if((message[messagePos] == null || message[messagePos] == undefined) && currentTitle[messagePos] != null && currentTitle[messagePos] != undefined){
						currentTitle = replaceChar(currentTitle, messagePos, " ");
						messagePos++;
						group.setText(currentTitle);
					}
				}else{
					clearInterval(messageTime);
					setTimeout(function(){
							setTimeout(function(){
								barGroup.destroyChildren();
								overviewGroup.removeChildren();
								levelDraw(lvl);
								levelSound();
								listening(true);
								sendGroup.setListening(true);
							}, 1000);
					}, 1000);

				}
			}, 100);
	};
	
	//
	//
	//TUTORIALS
	//
	//
		var tuts = true;
		var currentTuts;
		var tutPos = 0;
		var editTut = true;
		var scriptTut = true;
		var functEdit = true;
		var functAction = true;
		var functScript = true;
		var actionArFirst = true;
		var d2Script = true;
		
		tutArray1 = new Array(
			'Hello there, I\'m the Mission Chief Engineer. I\'ll help you learn how to control David.',
			'You can move David through the section by sending a script made of action blocks.',
			'Go ahead and drag a forward \'Action\' block (\'FD\') into the Script',
			'When the script is ready click send to transmit it to David. He needs to make it all the way across.'
		);
		tutArray2 = new Array(
			'You can set the value of an action block in the edit zone.',
			'Go ahead and drag a forward \'Action\' block (\'FD\') into the \'Edit Zone.\'',
			'Once you\'ve set the block\'s value drag the whole thing into the script.'
		);
		tutArray3 = new Array(
			'This planet\'s surface is covered in a moss-like substance.',
			'Careful not to let David get on it, it\'s gooey and will jam his wheels.',
			'Try using one of the turn action blocks to rotate David on the spot. (\'RT\' for right and \'LT\' for left).'
		);
		tutArray4 = new Array(
			'We need to collect an extra script card from David 1 before we can move on.',
			'Move David 6 to the exit next to David 1 and he\'ll take it from there.',
			'As you can see David 1 became too stuck in the moss to escape. An expensive mistake.'
		);
		tutArray5 = new Array(
			'As you can see there is a new block in the ACTIONS bar, thanks to David 1\'s script card.',
			'This green block is a function that can contain up to 6 other blocks.',
			'To change and add to the function drag it into the edit zone.',
			'Add blocks to the function by dropping them into the slots just like the main script.',
			'Make sure there is a function block in the main script',
			'Try using the function to get David round the first half of this section.'
		);
		tutArray6 = new Array(
			'David won\'t be able to make it through this section with only six blocks.'
		);
		tutArray7 = new Array(
			'You can place multiple function blocks into the main script to run the function more than once.',
			'Try creating a function of four blocks to get round a corner and then place multiple FN blocks in the script.'
		);
		tutArray8 = new Array(	//Sand tut
			'Looks like you\'ve encountered sand!',
			'David can\'t turn on sand, you\'ll have to loop around.'
		);
		tutArray9 = new Array(
			'You\'ve found David 2!\nDavid 2 has a plow for clearing the moss away.',
			'David 2 is very heavy and gets stuck in the sand. You\'ll need to free him first.',
			'Move David 6 to the square behind David 2.'
		);
		tutArray10 = new Array(	//How to use David 2
			'David 6 has a new block!\nClick the arrow to see it.',
			'This purple block will allow you to send commands to David 2',
			'The new block works much like a Function block. Drag blocks to send to David 2 into it.',
			'David 6 can\'t move through this section without until David 2 has cleared the path.'
		);
		
		tutAll = new Array(tutArray1, tutArray2, tutArray3, tutArray4, tutArray5, tutArray6, tutArray7, tutArray8, tutArray9, tutArray10);
		
		function tutorial(lvl){
			if(lvl.tutorial[0] == true){
				tutPos = 0; tut1(lvl.tutorial[1]);
			}
		}
		
		function tut1(array) {
			function tutButtons() {						
				tutButtonText = new Kinetic.Text({
					x: (0.19 * lvlW) + intW,
					y: lvlH * 0.88,
					text: 'NEXT',
					padding: intW * 0.02,
					fontSize: (headSize * 1.1),
					fontFamily: 'pixel',
					fill: '#000'
				});					
				tutButtonBack = new Kinetic.Rect({
					x: tutButtonText.getX(),
					y: tutButtonText.getY(),
					width:	tutButtonText.getWidth(),
					height: tutButtonText.getHeight(),
					fill: '#f1f4f5'
				});		
				tutButtonGroup = new Kinetic.Group({
				});
					tutButtonGroup.on('mouseover', function() {
						document.body.style.cursor = 'pointer';
					});
					tutButtonGroup.on('mouseout', function() {
						document.body.style.cursor = 'default';
					});	
					tutButtonGroup.on('click', function(){
						if(tutPos < (tutAll[array].length - 2)){
							tutPos++;
							tutText.setText(tutAll[array][tutPos]);
							setTutButtons();
						}else if(tutPos == (tutAll[array].length - 2)){
							tutPos++;
							tutText.setText(tutAll[array][tutPos]);
							setTutButtons()
						}
					});
				
				tutBackButtonText = new Kinetic.Text({
					x: (0.04 * lvlW) + intW,
					y: lvlH * 0.88,
					text: 'BACK',
					padding: intW * 0.02,
					fontSize: (headSize * 1.1),
					fontFamily: 'pixel',
					fill: '#000',
				});					
				tutBackButtonBack = new Kinetic.Rect({
					x: tutBackButtonText.getX(),
					y: tutBackButtonText.getY(),
					width:	tutBackButtonText.getWidth(),
					height: tutBackButtonText.getHeight(),
					fill: '#f1f4f5'
				});		
				tutBackButtonGroup = new Kinetic.Group({
					opacity: 0.3,
					listening: false
				});
					tutBackButtonGroup.on('mouseover', function() {
						document.body.style.cursor = 'pointer';
					});
					tutBackButtonGroup.on('mouseout', function() {
						document.body.style.cursor = 'default';
					});	
					tutBackButtonGroup.on('click', function(){
						if(tutPos > 1){
							tutPos--;
							tutText.setText(tutAll[array][tutPos]);
							setTutButtons();
						}else if(tutPos == 1){
							tutPos--;
							tutText.setText(tutAll[array][tutPos]);
							setTutButtons();
						}
					});
				
				tutSkipText = new Kinetic.Text({
					x: (0.41 * lvlW) + intW,
					y: lvlH * 0.88,
					text: 'CLOSE',
					padding: intW * 0.02,
					fontSize: (headSize * 1.1),
					fontFamily: 'pixel',
					fill: '#000'
				});					
				tutSkipBack = new Kinetic.Rect({
					x: tutSkipText.getX(),
					y: tutSkipText.getY(),
					width:	tutSkipText.getWidth(),
					height: tutSkipText.getHeight(),
					fill: '#f1f4f5'
				});
				tutSkipGroup = new Kinetic.Group({
				});
					tutSkipGroup.on('mouseover', function() {
						document.body.style.cursor = 'pointer';
					});
					tutSkipGroup.on('mouseout', function() {
						document.body.style.cursor = 'default';
					});	
					tutSkipGroup.on('click', function(){
						currentTuts = false;
						document.body.style.cursor = 'default';
						layers.tut.removeChildren();
				});

				tutSkipGroup.add(tutSkipBack);
				tutSkipGroup.add(tutSkipText);
				layers.tut.add(tutSkipGroup);
				
				tutButtonGroup.add(tutButtonBack);
				tutButtonGroup.add(tutButtonText);
				layers.tut.add(tutButtonGroup);
				
				tutBackButtonGroup.add(tutBackButtonBack);
				tutBackButtonGroup.add(tutBackButtonText);
				layers.tut.add(tutBackButtonGroup);
			}
			tutContain();
			currentTuts = true;
			tutMessage(tutAll[array][tutPos]);
			tutButtons();
			engineer(1, 1);
		}
		function setTutButtons(){
			if(tutPos <= -1){
				tutBackButtonGroup.setListening(false)
				tutBackButtonGroup.setOpacity(0.3);
			}else if(tutPos > -1){
				tutBackButtonGroup.setListening(true)
				tutBackButtonGroup.setOpacity(1);
			}
			if(tutPos < tutAll[lvl.tutorial[1]].length - 1){
				tutButtonGroup.setOpacity(1);
				tutButtonGroup.setListening(true);
			}else if(tutPos >= tutAll[lvl.tutorial[1]].length - 1){
				tutButtonGroup.setOpacity(0.3);
				tutButtonGroup.setListening(false);
			}
		}
			//Engineer
				var engineerAnimations = {
					engineer1: [
						{x: 0,  y: 0, width: 39, height: 39},{x: 0,  y: 0, width: 39, height: 39},
						{x: 0,  y: 0, width: 39, height: 39},{x: 0,  y: 0, width: 39, height: 39},
						{x: 0,  y: 0, width: 39, height: 39},{x: 0,  y: 0, width: 39, height: 39},
						{x: 0,  y: 0, width: 39, height: 39},{x: 0,  y: 0, width: 39, height: 39},
						{x: 0,  y: 0, width: 39, height: 39},{x: 39, y: 0, width: 39, height: 39},
						{x: 0,  y: 0, width: 39, height: 39},{x: 0,  y: 0, width: 39, height: 39},
						{x: 0,  y: 0, width: 39, height: 39},{x: 0,  y: 0, width: 39, height: 39},
						{x: 0,  y: 0, width: 39, height: 39},{x: 0,  y: 0, width: 39, height: 39},
						{x: 0,  y: 0, width: 39, height: 39},{x: 0,  y: 0, width: 39, height: 39},																		
						{x: 0,  y: 0, width: 39, height: 39},{x: 0,  y: 0, width: 39, height: 39},																		
						{x: 0,  y: 0, width: 39, height: 39},{x: 39, y: 0, width: 39, height: 39},
						{x: 0,  y: 0, width: 39, height: 39},{x: 39, y: 0, width: 39, height: 39}
					],};
		
			function engineer(x, y){
				var engineerSprite = new Image();
				engineerSprite.src = 'images/nasaMan.png';
				engineerSprite.onload = function() {
					engineerAni = new Kinetic.Sprite({
						x: (x * lvlW) + intW,
						y: (y * lvlH),
						scaleX: ((lvlW/3.5)/39),
						scaleY: ((lvlW/3.5)/39),
						image: engineerSprite,
						animation: 'engineer1',
						animations: engineerAnimations,
						offset: [36, 39],
						frameRate: 4
					});
					layers.tut.add(engineerAni);
					engineerAni.start();
					}
			};
	
		function tutContain(){
			var x = intW;
			var y = (0.55 * lvlH);
			var w = lvlW;
			var tutBack = new Kinetic.Rect({
				x: x,
				y: y,
				fill: '#000',
				opacity: 0.75,
				width: w,
				height: lvlH - y,
			});
			layers.tut.add(tutBack);
		}
		
		function tutMessage(message) {
			var x = intW;
			var y = (0.55 * lvlH);
			var w = lvlW;
		
			tutText = new Kinetic.Text({
				text: message,
				fontSize: 14,
				lineHeight: 1.2,
				fill: '#EEE',
				width: w*0.8,
				fontSize: (headSize * 1.12),
				fontFamily: 'pixel',
				x: x,
				id: 'tutText',
				y: y,
				padding: intW * 0.05,
				align: 'left'
			});  
			layers.tut.add(tutText);
			layers.tut.draw();
		};
	
	//VISUAL TUTORIAL
	
	highlightImg = new Image();
	highlightImg.src = 'images/highlight.gif';
	var highlights = [];
	var pulseTut = new Kinetic.Animation(function(frame) {
		//Pulse the opacity of the tutorials
		for(var i = 0; i < highlights.length; i++){
			highlights[i].setOpacity(0.5-(.5 * (Math.sin(frame.time * 4 * Math.PI / period))));
		};
	}, layers.tut);
	
	function drawHighlight(x,y,w,h){
		var highlight0 = new Kinetic.Image({
			image: highlightImg,
			id: 'hightlight',
			name:'hightlight0',
			x: x - (intW * 0.01),
			y: y - (intW * 0.01),
			width: (intW * 0.03),
			height: (intW * 0.03),
			crop: {
				x: 0,
				y: 0,
				width: 6,
				height: 6
			} 
		});
		var highlight1 = new Kinetic.Image({
			image: highlightImg,
			id: 'hightlight',
			name:'hightlight0',
			x: (x + w) - (intW * 0.02),
			y: y - (intW * 0.01),
			width: (intW * 0.03),
			height: (intW * 0.03),
			crop: {
				x: 6,
				y: 0,
				width: 6,
				height: 6
			} 
		});
		var highlight2 = new Kinetic.Image({
			image: highlightImg,
			id: 'hightlight',
			name:'hightlight0',
			x: x - (intW * 0.01),
			y: (y + h) - (intW * 0.02),
			width: (intW * 0.03),
			height: (intW * 0.03),
			crop: {
				x: 0,
				y: 6,
				width: 6,
				height: 6
			} 
		});
		var highlight3 = new Kinetic.Image({
			image: highlightImg,
			id: 'hightlight',
			name:'hightlight0',
			x: (x + w) - (intW * 0.02),
			y: (y + h) - (intW * 0.02),
			width: (intW * 0.03),
			height: (intW * 0.03),
			crop: {
				x: 6,
				y: 6,
				width: 6,
				height: 6
			}
		});
		layers.tut.add(highlight0);
		layers.tut.add(highlight1);
		layers.tut.add(highlight2);
		layers.tut.add(highlight3);
		highlights.push(highlight0, highlight1, highlight2, highlight3);
		pulseTut.start();
	}
	
	function removeVisTut(){
		pulseTut.stop();
		var hl = highlights.length;
		for(var i = 0; i < hl; i++){
			highlights[i].remove();
		};
		highlights = [];
	}
	
	function tutVisual(){		
		switch(currentLevel){
			case 0: drawTutVis(1); break;
			case 1: drawTutVis(3); break;
			case 5: drawTutVis(5); break;
			case 13: drawTutVis(12); break;
			default:;
		}
	};
	
	var fdDragStart = true;
	var fDragStart = true;
	var fdDragStart2 = true;
	var d2DragStart = true;
	var fDragScript = true;
	var blockDrag = 0;
	var editDrop = false;
	var actionArrowTut = false;
	
	function drawTutVis(state){
		removeVisTut();
		switch(state){
			case 0:
				//Just script 1
				drawHighlight(intW * 0.525,intH * 0.286,intW * 0.425,intH * 0.076);
			break;
			case 1:
				//Level 0 - fd and script
				drawHighlight(0.138*intW,0.1*intH,intW * 0.117,intH * 0.076);
				drawHighlight(intW * 0.525,intH * 0.286,intW * 0.425,intH * 0.076);
			break;
			case 2:
				//Just Send
				drawHighlight(intW * 0.75,lvlH * 0.817,intW * 0.20,intH * 0.147);
			break;
			case 3:
				//level 2 initial, FD and Edit
				drawHighlight(0.138*intW,0.1*intH,intW * 0.117,intH * 0.076);
				drawHighlight(intW * 0.05,intH * 0.286,intW * 0.425,intH * 0.076);
			break;
			case 4:
				//Just Edit
				drawHighlight(intW * 0.05,intH * 0.286,intW * 0.425,intH * 0.076);
			break;
			case 5:
				//Initial Function view
				drawHighlight(0.706*intW,0.1*intH,intW * 0.117,intH * 0.076);
				drawHighlight(intW * 0.05,intH * 0.286,intW * 0.425,intH * 0.076);
			break;
			case 6:
				//Function dragstart
				drawHighlight(intW * 0.05,intH * 0.286,intW * 0.425,intH * 0.076);
			break;
			case 7:
				//Dropping an FN in edit for first time
				drawHighlight(0.138*intW,0.1*intH,intW * 0.117,intH * 0.076);
				drawHighlight(0.564*intW,0.1*intH,intW * 0.117,intH * 0.076);
				drawHighlight(intW * 0.525,intH * 0.286,intW * 0.425,intH * 0.076);
				drawHighlight(intW * 0.525,intH *0.366,intW * 0.425,intH * 0.076);
			break;
			case 8:
				//Dropping an FN in edit for first time
				drawHighlight(intW * 0.358,intH * 0.286,intW * 0.117,intH * 0.076);
			break;
			case 12:
				//Using the Arrow to see more actions
				drawHighlight(intW * 0.887,intH * 0.1,intW * 0.063,intH * 0.076);
			break;
			case 13:
				//Highlight David 2 block
				drawHighlight(0.706*intW,0.1*intH,intW * 0.117,intH * 0.076);
			break;
			default:
				//console.log(state);
		}
	}

	
	//
	//
	//DRAWING DAVID
	//
	//
	
		var davidAnimations = {
			idle1:
			[{x: 0,y: 0,width: 50,height: 50},
			{x: 50,y: 0,width: 50,height: 50}],
			forward1:
			[{x: 100, y: 0, width: 50, height: 50},
			{x: 150, y: 0, width: 50, height: 50},
			{x: 200, y: 0, width: 50, height: 50}, 
			{x: 250, y: 0,width: 50, height: 50}]
		};
		
		function davidDraw(xPos, yPos, scale, direction){
			davidIdleSprite = new Image();
			davidIdleSprite.src = 'images/idleSprite.png';
			davidIdleSprite.onload = function() {
				davidAni = new Kinetic.Sprite({
					x: xPos + (25 * scale),
					y: yPos + (25 * scale),
					scaleX: scale,
					scaleY: scale,
					image: davidIdleSprite,
					animation: 'idle1',
					animations: davidAnimations,
					offset: [25, 25],
					frameRate: 4,
					index: 0,
					rotation: (direction * (Math.PI / 2))
				});
				layers.level.add(davidAni);
				davidAni.moveToTop();
				davidAni.start();
				}
		};
		
		var david2Animations = {
			idle1:
			[{x: 0,y: 0,width: 50,height: 50},
			{x: 50,y: 0,width: 50,height: 50}],
			off:
			[{x: 50,y: 0,width: 50,height: 50}],
			forward1:
			[{x: 100, y: 0, width: 50, height: 50},
			{x: 150, y: 0, width: 50, height: 50},
			{x: 200, y: 0, width: 50, height: 50}, 
			{x: 250, y: 0,width: 50, height: 50}]
		};
		
		function david2Draw(xPos, yPos, scale, direction){
			david2IdleSprite = new Image();
			david2IdleSprite.src = 'images/david2.png';
			david2IdleSprite.onload = function() {
				david2 = new Kinetic.Sprite({
					x: xPos + (25 * scale),
					y: yPos + (25 * scale),
					scaleX: scale,
					scaleY: scale,
					image: david2IdleSprite,
					animation: 'idle1',
					animations: david2Animations,
					offset: [25, 25],
					frameRate: 4,
					index: 0,
					rotation: (direction * (Math.PI / 2))
				});
				layers.level.add(david2);
				david2.moveToTop();
				david2.start();
				if(currentLevel == 12){
					david2.setAnimation('off');
				}else{
				}
			}
		};
	//END OF DRAW DAVID
	
		//Section Headers.
			function sectionTitle(xPos, yPos, width, text){
				var rule = new Kinetic.Rect({
					x: (intW * xPos),
					y: (intH * yPos),
					width:	(intW * width),
					height: (intH * 0.005),
					fill: headColor
				});	
				var titleText = new Kinetic.Text({
					x: (intW * xPos),
					y: (intH * (yPos + 0.014)),
					text: text,
					name: text,
					fontSize: headSize,
					fontFamily: 'pixel',
					fill: headColor
				});
				layers.intFace.add(rule);
				layers.intFace.add(titleText);
			};
			
		//Actions Bar

		function actionBarDraw(){
			var actionBack = new Kinetic.Rect({
				x: (intW * 0.05),
				y: (intH * 0.1),
				width:	(intW * 0.9),
				height: (intH *0.076),
				fill: boxColor
			});
			layers.intFace.add(actionBack);
			
			function actionArrows(id, xPos, dir){
				var arrowImg = new Image();
				arrowImg.src = 'images/smallArrows.gif';
				arrowImg.onload = function() {
					var actionArrow = new Kinetic.Image({
						image: arrowImg,
						id: id,
						x: (intW * xPos),
						y: (intH * 0.1),
						name: actionArrow,
						width: (intW * 0.063),
						height: (intH * 0.076),
						opacity: 0.2,
						crop: {
							x: 0,
							y: (dir * 23),
							width: 15,
							height: 23
						}
					});
					//Left arrow events.
					if(actionArrowsActive == true){
						actionArrow.setOpacity(1);
						actionArrow.on('mouseover', function(){
							document.body.style.cursor = 'pointer';
							if(this.getId() == 'left'){
								this.setCrop(15, 0, 15, 23);
							}else if (this.getId() == 'right'){
								this.setCrop(15, (dir * 23), 15, 23);
							}
							layers.intFace.draw();
						});
						actionArrow.on('mouseout', function () {
							document.body.style.cursor = 'default';
							if(this.getId() == 'left'){
								this.setCrop(0, 0, 15, 23);
							}else if(this.getId() == 'right'){
								this.setCrop(0, (dir * 23), 15, 23);
							}
							layers.intFace.draw();
						});
						actionArrow.on('click', function(){
							if(this.getId() == 'left'){
								if(actionBarPos < 0){
									actionBarPos++;
									drawBlocks(actionBarPos);
								}
							}
							if(this.getId() == 'right'){
								if(actionBarPos > -4){
									actionBarPos--;
									drawBlocks(actionBarPos);
									if(actionArFirst == true && levelArray[currentLevel] == level13){
										//Dropping an action into the function for first time
										if(currentTuts == false){
											tutPos = 1;
											tut1(lvl.tutorial[1]);
											actionArFirst = false;
											setTutButtons();
											drawTutVis(13)
										}else{
											tutPos = 1;
											tutText.setText(tutAll[lvl.tutorial[1]][tutPos]);
											actionArFirst = false;
											setTutButtons();
											drawTutVis(13)
										}
									}							
								}
							}
						});
						
					}
					layers.intFace.add(actionArrow);
					layers.intFace.draw();
				}
			}
			
			//Call the arrow creating function, (id, x position, and direction [ 0 = left, 1 = right])
			actionArrows('left', 0.05, 0);
			actionArrows('right', 0.887, 1);
		};
		
		//
		//
		//	BLOCKS - BASE, FUNCTION, LOOP, DAVID2
		//
		//
		
		var actionArrowsActive = false;
		var actionBarPos = 0;
		var actionBarArray = [];
		
		var baseActions = true;
		var functionBlockOn = false;
		var loopOn = false;
		var dav2 = false;
		
		var editFunction1 = false;
		var editDavid2 = false;
		
			function drawAction(type, xPos, yPos, state){
				//Function to draw an individual, original block.
				if(xPos >= 0.138 && xPos <= 0.708){
					switch(type){
						case 'forward': drawBase(type, 0, state); break;
						case 'backward': drawBase(type, 1, state); break;
						case 'right': drawBase(type, 2, state); break;
						case 'left': drawBase(type, 3, state); break;
						case 'funct': drawFunct(type, 0, state); break;
						case 'loop': drawBase(type, 1, state); break;
						case 'david2': drawFunct(type, 2, state); break;
					};
				}
					
					function drawBase(type, block, state){										
						blockImg = new Image();
						blockImg.src = 'images/blocks.gif';
						newBlock = new Kinetic.Image({
							image: blockImg,
							id: type,
							x: 0,
							y: 0,
							width: (intW * 0.117),
							height: (intH * 0.0755),
							draggable: false,
							crop: {	
								x: (29 * block),
								y: 0,
								width: 29,
								height: 23
							}
						});
						
						blockGroup = new Kinetic.Group({
							value: 0,
							draggable: true,
							height: intH,
							width: intW,
							id: type,
							name: state,
							x: (intW * xPos),
							y: (intH * yPos)				
						});
						blockGroup.add(newBlock);
						actionBarArray.push(blockGroup);
						layers.intFace.add(blockGroup);
						
						blockGroup.on('mouseover', function() {
							document.body.style.cursor = 'pointer';
							drawX = this.getPosition().x/intW;	// gets the position to draw the replacement block on mouseover so delay isn't (as much of) a problem.
						});
						blockGroup.on('mouseout', function() {
							document.body.style.cursor = 'default';
						});
						
						blockGroup.on('dragstart', function() {
							// THIS IS FOR BASE BLOCKS
								// Tutorials.
								if(fdDragStart == true && currentLevel == 0){
									drawTutVis(0);
									fdDragStart = false;
								}
								if(fdDragStart2 == true && currentLevel == 1){
									drawTutVis(4);
								}
								if(fdDragStart2 == true && currentLevel == 1){
									drawTutVis(4);
									//fdDragStart2 = false;
								}
							valueArea.destroy();	//Remove the edit block area.
							removeConsole();
							var blockKids = this.getChildren();
							blockKids.each(function(kid){
								if(kid.getName() == 'notation'){
									kid.remove();
								}
							});
							allSlots = layers.intFace.get('.slotBox');
							if(this.getName() == 'staticAction'){
								if(layers.intFace.get('.edit')[0] != null && layers.intFace.get('.edit')[0] != undefined){
									//Remove any blockgroup in the edit zone.
									layers.intFace.get('.edit')[0].remove();
								}
								drawAction(this.getId(), drawX, 0.1, this.getName());	//Draw replacement block
								spliceThis = actionBarArray.indexOf(this);	//get this block position in the array of the base blocks
								actionBarArray.splice(spliceThis, 1); //Remove it from base block array (so its not removed on drawBlocks())
							}
							if(this.getName() == 'placed'){		
								for (i = 0; i < script.length; i++) {
									if (script[i] === this) {
										//Remove from script so it won't be sent, reset script box opacity.
										script[i] = null;
										var droppedSlots = layers.intFace.get('.slotBox');
										droppedSlots[i].setOpacity(1);
									}
								}
								for (i = 0; i < userFunction.length; i++) {
									if (userFunction[i] === this) {
										//Remove from User Function so it won't be sent, reset script box opacity.
										userFunction[i] = null;
										var droppedSlots = layers.intFace.get('.slotBox');
										droppedSlots[i].setOpacity(1);
									}
								}
								for (i = 0; i < david2Script.length; i++) {
									if (david2Script[i] === this) {
										//Remove from User Function so it won't be sent, reset script box opacity.
										david2Script[i] = null;
										var droppedSlots = layers.intFace.get('.slotBox');
										droppedSlots[i].setOpacity(1);
									}
								}
								if(layers.intFace.get('.edit')[0] != null && layers.intFace.get('.edit')[0] != undefined){
									//Remove any blockgroup in the edit zone.
									layers.intFace.get('.edit')[0].remove();
								}
							}	
						});
						blockGroup.on('dragend', function(){blockCollision(this)});
					};
					
					function drawFunct(type, block, state){										
						blockImg2 = new Image();
						blockImg2.src = 'images/blocks2.gif';
						newBlock = new Kinetic.Image({
							image: blockImg2,
							id: type,
							x: 0,
							y: 0,
							width: (intW * 0.117),
							height: (intH * 0.076),
							draggable: false,
							crop: {	
								x: (29 * block),
								y: 0,
								width: 29,
								height: 23
							}
						});
						
						blockGroup = new Kinetic.Group({
							value: 0,
							draggable: true,
							height: intH,
							width: intW,
							id: type,
							name: state,
							x: (intW * xPos),
							y: (intH * yPos)				
						});
						blockGroup.add(newBlock);
						actionBarArray.push(blockGroup);
						layers.intFace.add(blockGroup);
						
						blockGroup.on('mouseover', function() {
							document.body.style.cursor = 'pointer';
							drawX = this.getPosition().x/intW;	// gets the position to draw the replacement block on mouseover so delay isn't (as much of) a problem.
						});
						blockGroup.on('mouseout', function() {
							document.body.style.cursor = 'default';
						});
						
						blockGroup.on('dragstart', function() {
						// THIS IS FOR FUNCTION BLOCKS
							if(fDragStart == true && currentLevel == 5){
								drawTutVis(6);
							}
							if(fDragStart == false && currentLevel == 5){
								drawTutVis(0);
							}
							if(d2DragStart == true && currentLevel == 13 && this.getId() == 'david2'){
								drawTutVis(6);
							}
							if(d2DragStart == false && currentLevel == 13  && this.getId() == 'david2'){
								drawTutVis(0);
							}
							valueArea.destroy();	//Remove the edit block area.
							removeConsole();
							if(this.getName() == 'staticAction'){
								if(layers.intFace.get('.edit')[0] != null && layers.intFace.get('.edit')[0] != undefined){
									//Remove any blockgroup in the edit zone.
									layers.intFace.get('.edit')[0].remove();
								}
								drawAction(this.getId(), drawX, 0.1, this.getName());	//Draw replacement block
								spliceThis = actionBarArray.indexOf(this);	//get this block position in the array of the base blocks
								actionBarArray.splice(spliceThis, 1); //Remove it from base block array (so its not removed on drawBlocks())
							}
							if(this.getName() == 'functPlaced'){		
								for (i = 0; i < script.length; i++) {
									if(script[i] === this) {
										//Remove from script so it won't be sent, reset script box opacity.
										script[i] = null;
										var droppedSlots = layers.intFace.get('.slotBox');
										droppedSlots[i].setOpacity(1);
									}
								}
								for (i = 0; i < userFunction.length; i++) {
									if(userFunction[i] === this) {
										//Remove from script so it won't be sent, reset script box opacity.
										userFunction[i] = null;
										var droppedSlots = layers.intFace.get('.slotBox');
										droppedSlots[i].setOpacity(1);
									}
								}
								for (i = 0; i < david2Script.length; i++) {
									if(david2Script[i] === this) {
										//Remove from script so it won't be sent, reset script box opacity.
										david2Script[i] = null;
										var droppedSlots = layers.intFace.get('.slotBox');
										droppedSlots[i].setOpacity(1);
									}
								}
							}
							if((this.getId() == 'funct' && editFunction1 == true) || ((this.getId() == 'david2' && editDavid2 == true))){
								//Stop Functions and David controls being dropped in themselves.
								//Reset to script in appropriate conditions
								if(this.getId() == 'funct'){
									editFunction1 = false;	//Turn off the function editing.
								}
								if(this.getId() == 'david2'){
									editDavid2 = false;	//Turn off the david 2 editing.
								}
								var allSlots = layers.intFace.get('.slotBox');
								allSlots.each(function(slot){
									slot.setFill(boxColor); //Change Script colour to show its different.	
								});
								layers.intFace.get('.SCRIPT')[0].setFill(headColor);
								layers.intFace.get('.SCRIPT')[0].setText('SCRIPT');
								//Bring the script back.
								for(var i = 0; i < script.length; i++){
									if(script[i] != null){
										script[i].setOpacity(1);	//Set the block to visible.
										script[i].setDraggable(true);	//Make them draggable
										script[i].setListening(true);	//Replace event listening
										var activeSlots = layers.intFace.get('.slotBox');
										activeSlots[i].setOpacity(.3);	//Reset the script boxes to dull, show they're full
									}else{	
										var activeSlots = layers.intFace.get('.slotBox');
										activeSlots[i].setOpacity(1)
									}
								};
								// Hide the Function
								for(var i = 0; i < userFunction.length; i++){
									if(userFunction[i] != null){
										userFunction[i].setOpacity(0); //Make them invisible
										userFunction[i].setDraggable(false);	//Remove drag properties.
										userFunction[i].setListening(false);	//Remove event listening
									};
								};
								for(var i = 0; i < david2Script.length; i++){
									if(david2Script[i] != null){
										david2Script[i].setOpacity(0); //Make them invisible
										david2Script[i].setDraggable(false);	//Remove drag properties.
										david2Script[i].setListening(false);	//Remove event listening
									};
								};
								//Remove funct from in the edit zone.
								if(layers.intFace.get('.editFunct')[0] != null && layers.intFace.get('.editFunct')[0] != undefined && layers.intFace.get('.editFunct')[0] != this){
									layers.intFace.get('.editFunct')[0].remove();
								}
							}
						});
						blockGroup.on('dragend', function(){
							blockCollision(this);
							if(fDragScript == true && fDragStart == false){
								fDragScript = false;
							}
							if(fDragStart == true){
								fDragStart = false;
							}			
						});
					};
			};
			
			function drawBlocks(pos){
				//Function to draw all the blocks in the action bar.
				for(var i = 0; i < actionBarArray.length; i++){
					if(actionBarArray[i] != null && actionBarArray[i] != undefined){
						actionBarArray[i].remove();
					}
				}
				if(lvl.blocks[0] == true){
					//Draw the base actions
					drawAction('forward', 0.138+(0.142* pos), 0.1, 'staticAction')
					drawAction('backward', 0.28+(0.142* pos), 0.1, 'staticAction')
					drawAction('left', 0.422+(0.142* pos), 0.1, 'staticAction')
					drawAction('right', 0.564+(0.142* pos), 0.1, 'staticAction')
				}
				if(lvl.blocks[1] == true){
					drawAction('funct', 0.706+(0.142* pos), 0.1, 'staticAction')
				}
				if(lvl.blocks[2] == true){
					actionArrowsActive == true;
					drawAction('loop', 0.99+(0.142* pos), 0.1, 'staticAction')
				}
				if(lvl.blocks[3] == true){
					actionArrowsActive = true;
					drawAction('david2', 0.848+(0.142* pos), 0.1, 'staticAction')
				}
			};

			function blockCollision(block){
				var groupKids = block.getChildren();	//get all the children in a group for collision area calculations.
				
				var xDrop  = block.getPosition().x;	//Co-ordinates of block group corners.
				var yDrop  = block.getPosition().y ;	
				var xDropRight = 0;
				var yDropBottom  = 0;

				groupKids.each(function(child){
					// Get the total area of the block group. Check through all the children to get the furtherest point from the x.y origin.
					if((xDrop + (child.getAbsolutePosition().x - xDrop) + child.getWidth()) > xDropRight){
						xDropRight = xDrop + (child.getAbsolutePosition().x - xDrop) + child.getWidth();
					}
					if((yDrop + (child.getAbsolutePosition().y - yDrop) + child.getHeight()) > yDropBottom){
						yDropBottom = yDrop + (child.getAbsolutePosition().y - yDrop) + child.getHeight();
					}
				});
				
				// Possible drop areas are the buildzone and each scriptbox
				// Buildzone is collisionAreas[0], script boxes are collisionArea[>1]
				var collisionAreas = new Array; // Array for all drop areas overlapped by the blockgroup on drop.
					var x = buildingZone.getX();
					var y = buildingZone.getY();
					var endX = (buildingZone.getWidth() + x);
					var endY = (buildingZone.getHeight() + y);
					if(xDropRight > x && xDrop < endX && yDropBottom > y && yDrop < endY){
						//this is to check if there is overlap iun the buildzone.
						var x0 = (endX - x);
						var y0 = (endY - y);
							if(xDrop > x){
								var x1 = (xDrop - x);
								x0 = (x0 - x1);
							};
							if(xDropRight < endX){
								var x1 = (endX - xDropRight);
								x0 = (x0 - x1);
							};
							if(yDrop > y){
								var y1 = (yDrop - y);
								y0 = (y0 - y1);
							};
							if(yDropBottom < endY){
								var y1 = (endY - yDropBottom);
								y0 = (y0 - y1);
							};
							collisionAreas[0] = x0*y0;
						} 
						else{
							// This is triggered if no part of the blockgroup overlaps the build zone on drop.
						}
				
					slotNumber = 1;
					var activeSlots = layers.intFace.get('.slotBox');
					//Checking if drop overlaps any scriptBoxes.
					activeSlots.each(function(activeSlot){
						var x = activeSlot.getX();
						var y = activeSlot.getY();
						var endX = (activeSlot.getWidth() + x);
						var endY = (activeSlot.getHeight() + y);
						collisionAreas[slotNumber] = null;
						var x0 = 0;
						var y0 = 0;
							
						if(xDropRight > x && xDrop < endX && yDropBottom > y && yDrop < endY){
							var x0 = (endX - x);
							var y0 = (endY - y);
								if(xDrop > x){
									var x1 = (xDrop - x);
									x0 = (x0 - x1);
								};
								if(xDropRight < endX){
									var x1 = (endX - xDropRight);
									x0 = (x0 - x1);
								};
								if(yDrop > y){
									var y1 = (yDrop - y);
									y0 = (y0 - y1);
								};
								if(yDropBottom < endY){
									var y1 = (endY - yDropBottom);
									y0 = (y0 - y1);
								};
								var area = x0*y0;
								collisionAreas[slotNumber] = x0*y0;
							} 
							slotNumber++;
						});

				collidePos = null; // vars to find which collision area has the most overlap.
				var large = 0;	
				for(var i = 0; i < collisionAreas.length; i++){
					if(collisionAreas[i] > large){
						large = collisionAreas[i];
						collidePos = i;
					}
				};
				if(collidePos == null || collidePos == undefined){
					block.remove();
					//Remove the block if its dropped nowhere.
				}else if(collidePos == 0 && currentLevel != 0){
					if(block.getId() == 'funct'){
						//Remove funct from in the edit zone.
						if(layers.intFace.get('.editFunct')[0] != null && layers.intFace.get('.editFunct')[0] != undefined && layers.intFace.get('.editFunct')[0] != block){
							layers.intFace.get('.editFunct')[0].remove();
						}
						//Code if a function block is droppped in the edit zone.
							if(levelArray[currentLevel] == level05){
								drawTutVis(7);
								//Dropping an FN in edit for first time
									if(currentTuts == false){
										tutPos = 3;
										tut1(lvl.tutorial[1]);
										functEdit = false;
										setTutButtons();
									}else{
										tutPos = 3;
										tutText.setText(tutAll[lvl.tutorial[1]][tutPos]);
										functEdit = false;
										setTutButtons();
									}
							}
						block.setName('editFunct');
						editFunction1 = true;
						editDavid2 = false;
						x = (buildingZone.getX()+buildingZone.getWidth()) - (intW * 0.117);
						y = buildingZone.getY();
						block.setPosition(x,y);
						layers.intFace.get('.SCRIPT')[0].setText('FUNCTION');
						layers.intFace.get('.SCRIPT')[0].setFill(greenText);
							//Hide the current script blocks,
							for(var i = 0; i < script.length; i++){
								if(script[i] != null){
									script[i].setOpacity(0); //Make them invisible
									script[i].setDraggable(false);	//Remove drag properties.
									script[i].setListening(false);	//Remove event listening
								};		
							};
							//Hide the David 2 Function
							for(var i = 0; i < david2Script.length; i++){
								if(david2Script[i] != null){
									david2Script[i].setOpacity(0); //Make them invisible
									david2Script[i].setDraggable(false);	//Remove drag properties.
									david2Script[i].setListening(false);	//Remove event listening
								};		
							};
							var allSlots = layers.intFace.get('.slotBox');
							allSlots.each(function(slot){
								slot.setOpacity(1); //Reset the script boxes to full opacity, (show they are active)
								slot.setFill(greenBox); //Change Script colour to show itsd different.	
							});
							//Bring the Function back if it exists.
							for(var i = 0; i < userFunction.length; i++){
								if(userFunction[i] != null){
									userFunction[i].setOpacity(1);	//Set the block to visible.
									userFunction[i].setDraggable(true);	//Make them draggable
									userFunction[i].setListening(true);	//Replace event listening
									var activeSlots = layers.intFace.get('.slotBox');
									activeSlots[i].setOpacity(.3);	//Reset the script boxes to dull, show they're full
								};
							};
					}else if(block.getId() == 'david2'){
						//Code if a David 2 control block is droppped in the edit zone.
							//Remove funct from in the edit zone.
							if(layers.intFace.get('.editFunct')[0] != null && layers.intFace.get('.editFunct')[0] != undefined && layers.intFace.get('.editFunct')[0] != block){
								layers.intFace.get('.editFunct')[0].remove();
							}
						block.setName('editFunct');
						editFunction1 = false;
						editDavid2 = true;
						if(d2DragStart == true && currentLevel == 13){
							if(currentTuts == false){
								tutPos = 2;
								tut1(lvl.tutorial[1]);
								actionArFirst = false;
								setTutButtons();
							}else{
								tutPos = 2;
								tutText.setText(tutAll[lvl.tutorial[1]][tutPos]);
								actionArFirst = false;
								setTutButtons();
							}
						}
						d2DragStart = false;
						x = (buildingZone.getX()+buildingZone.getWidth()) - (intW * 0.117);
						y = buildingZone.getY();
						block.setPosition(x,y);
						layers.intFace.get('.SCRIPT')[0].setText('DAVID 2');
						layers.intFace.get('.SCRIPT')[0].setFill(purpleText);
							//Hide the current script blocks,
							for(var i = 0; i < script.length; i++){
								if(script[i] != null){
									script[i].setOpacity(0); //Make them invisible
									script[i].setDraggable(false);	//Remove drag properties.
									script[i].setListening(false);	//Remove event listening
								};	
								
							};
							//Hide the user Function
							for(var i = 0; i < userFunction.length; i++){
								if(userFunction[i] != null){
									userFunction[i].setOpacity(0); //Make them invisible
									userFunction[i].setDraggable(false);	//Remove drag properties.
									userFunction[i].setListening(false);	//Remove event listening
								};	
								
							};
							var allSlots = layers.intFace.get('.slotBox');
							allSlots.each(function(slot){
								slot.setOpacity(1); //Reset the script boxes to full opacity, (show they are active)
								slot.setFill(purpleBox); //Change Script colour to show itsd different.	
							});
							//Bring the Function back if it exists.
							for(var i = 0; i < david2Script.length; i++){
								if(david2Script[i] != null){
									david2Script[i].setOpacity(1);	//Set the block to visible.
									david2Script[i].setDraggable(true);	//Make them draggable
									david2Script[i].setListening(true);	//Replace event listening
									var activeSlots = layers.intFace.get('.slotBox');
									activeSlots[i].setOpacity(.3);	//Reset the script boxes to dull, show they're full
								};
							};		
					}else{
						//Code if a base block is dropped in the edit zone.
							if(levelArray[currentLevel] == level01){
								//If its the first time something is dropped in the edit zone, tut them.
								if(currentTuts == false){
									tutPos = 2;
									tut1(lvl.tutorial[1]);
									setTutButtons();
								}else{
									tutPos = 2;
									tutText.setText(tutAll[lvl.tutorial[1]][tutPos]);
									setTutButtons();
								}
							}
							if(currentLevel == 1){
								drawTutVis(0)
								fdDragStart2 = false;
								editDrop = true;
							}
							var tutVis = layers.tut.get('#scriptHL');
							tutVis.each(function(tv){tv.setX(intW * 0.525)});
						block.setName('edit');
						x = buildingZone.getX();
						y = buildingZone.getY();
						block.setPosition(x,y);
						if(block.get('Text')[0] != null || block.get('Text')[0] != undefined){
							currentValue = (block.get('Text')[0].getText());
						}else{
							currentValue = 0;
						}
						currentBlock = block;
						addValue(block);
						setConsole(block);
					}
				}else if(collidePos > 0){
					if(block.getId() == 'funct'){
						//Function block code.
						//Code if a function block is placed in a script slot.
							if(functScript == true && levelArray[currentLevel] == level05){
								//First time placing FN in Script
									if(currentTuts == false){
										tutPos = 2;
										tut1(lvl.tutorial[1]);
										functScript = false;
										setTutButtons();
									}else{
										tutPos = 2;
										tutBackButtonGroup.setOpacity(1);
										tutText.setText(tutAll[lvl.tutorial[1]][tutPos]);
										functScript = false;
										setTutButtons();
									}
							}
							if(currentLevel == 5){
								removeVisTut();
							}
						placePos = (collidePos - 1);
						var activeSlots = layers.intFace.get('.slotBox');
						x = activeSlots[(collidePos - 1)].getPosition().x
						y = activeSlots[(collidePos -1)].getPosition().y
						activeSlots[(collidePos -1)].setOpacity(0.3);
						block.setPosition(x,y);
						if(editDavid2 == true){
							//Code if Function block is placed in DAVID 2 Function
							if(david2Script[placePos] != null && david2Script[placePos] != undefined && david2Script[placePos] != block){
								david2Script[placePos].remove();
								david2Script[placePos] = null;
							}
							david2Script[collidePos - 1] = block;
						}else{
							//Code if Function block is placed in MAIN SCRIPT
							if(script[placePos] != null && script[placePos] != undefined && script[placePos] != block){
								script[placePos].remove();
								script[placePos] = null;
							}
							script[collidePos - 1] = block;
						}
						block.setName('functPlaced');	
					}else if(block.getId() == 'david2'){
						//David 2 block dropped in script slot.
						block.setName('functPlaced');
						placePos = (collidePos - 1);
						var activeSlots = layers.intFace.get('.slotBox');
						x = activeSlots[(collidePos - 1)].getPosition().x
						y = activeSlots[(collidePos -1)].getPosition().y
						activeSlots[(collidePos -1)].setOpacity(0.3);
						block.setPosition(x,y);
						if(editFunction1 == true){
							//Code if David 2 is placed in USER FUNCTION
							if(userFunction[placePos] != null && userFunction[placePos] != undefined && userFunction[placePos] != block){
								userFunction[placePos].remove();
								userFunction[placePos] = null;
							}
							userFunction[collidePos - 1] = block;
						}else{
							//Code if David 2 block is placed in MAIN SCRIPT
							if(script[placePos] != null && script[placePos] != undefined && script[placePos] != block){
								script[placePos].remove();
								script[placePos] = null;
							}
							script[collidePos - 1] = block;
							if(d2Script == true){
								drawTutVis()
								d2Script = false;
							}
						}
					}else{
						//Base block code.
						if(editFunction1 == true){
							//Code if base blocks are placed in USER FUNCTION
								if(functAction == true && levelArray[currentLevel] == level05){
									//Dropping an action into the function for first time
									if(currentTuts == false){
										tutPos = 4;
										tut1(lvl.tutorial[1]);
										functAction = false;
										setTutButtons();
									}else{
										tutPos = 4;
										tutText.setText(tutAll[lvl.tutorial[1]][tutPos]);
										functAction = false;
										setTutButtons();
									}
								}
							block.setName('placed');
							currentValue = 1;
							placePos = (collidePos - 1);
							if(userFunction[placePos] != null && userFunction[placePos] != undefined && userFunction[placePos] != block){
								userFunction[placePos].remove();
								userFunction[placePos] = null;
							}
							var activeSlots = layers.intFace.get('.slotBox');
							x = activeSlots[(collidePos - 1)].getPosition().x
							y = activeSlots[(collidePos -1)].getPosition().y
							activeSlots[(collidePos -1)].setOpacity(0.3);
							block.setPosition(x,y);
							userFunction[collidePos - 1] = block;
							scriptValue(block);
							placedInside(block, 'funct')
							//Tutorial, level 5
							if(currentLevel == 5 && userFunction.length == 2){
								if(userFunction[0] != null && userFunction[1] != null){
									drawTutVis(8);
								}
							}
						}else if(editDavid2 == true){
							//Code if base blocks are placed in DAVID 2 Function
							block.setName('placed');
							currentValue = 1;
							placePos = (collidePos - 1);
							if(david2Script[placePos] != null && david2Script[placePos] != undefined && david2Script[placePos] != block){
								david2Script[placePos].remove();
								david2Script[placePos] = null;
							}
							var activeSlots = layers.intFace.get('.slotBox');
							x = activeSlots[(collidePos - 1)].getPosition().x
							y = activeSlots[(collidePos -1)].getPosition().y
							activeSlots[(collidePos -1)].setOpacity(0.3);
							block.setPosition(x,y);
							david2Script[collidePos - 1] = block;
							scriptValue(block);
							placedInside(block, 'david2')
							//Tutorial, level 5
							if(currentLevel == 5 && david2Script.length == 2){
								if(david2Script[0] != null && david2Script[1] != null){
									drawTutVis(8);
								}
							}
						}else{
							//Code if base blocks are placed in the script
								if(scriptTut == true && currentLevel == 0){
									if(currentTuts == false){
										tutPos = 3;
										tut1(lvl.tutorial[1]);
										setTutButtons();
									}else{
										tutPos = 3;
										tutText.setText(tutAll[lvl.tutorial[1]][tutPos]);
										setTutButtons();
									}
									drawTutVis(2);
								}
								if(scriptTut == true && currentLevel == 1){
									if(currentTuts == false){
										tutPos = 0;
										tut1(lvl.tutorial[1]);
									}else{
										tutPos = 0;
										tutText.setText(tutAll[lvl.tutorial[1]][tutPos]);
									}
								}
								if(editDrop == true && currentLevel == 1){
									drawTutVis(2)
								}
							block.setName('placed');
							currentValue = 1;
							placePos = (collidePos - 1);
							if(script[placePos] != null && script[placePos] != undefined && script[placePos] != block){
								script[placePos].remove();
								script[placePos] = null;
							}
							var activeSlots = layers.intFace.get('.slotBox');
							x = activeSlots[(collidePos - 1)].getPosition().x
							y = activeSlots[(collidePos - 1)].getPosition().y
							activeSlots[(collidePos - 1)].setOpacity(0.3);
							block.setPosition(x,y);
							script[collidePos - 1] = block;
							scriptValue(block);
						}
					}
				}else{
					//Don't know what's happened. Just ditch it.
					block.remove();
				}
			}
		
		function placedInside(block, location){
			//Function to add a coloured notation for blocks dropped inside other blocks
			noteColor = new Kinetic.Rect({
				x: 0,
				y: 0,
				name: 'notation',
				width:	(intH * 0.01),
				height: (intH * 0.076),
			});
			if(location == 'funct'){
				noteColor.setFill(greenText);
			}else if(location == 'david2'){
				noteColor.setFill(purpleText);
			}
			block.add(noteColor);
		}
		
		
		//
		// Value Arrows
		//

		var valueArea = new Kinetic.Group({
		});
		var currentBlock;
		var valueArrow;
		var valueZone;
		var valueTitle;
		var valueNumber;
		var valueNumberBack;
		var currentValue = 0;
		
				
		function scriptValue(block){
			if(block.getChildren().length < 2){
				var blockValueNumber = new Kinetic.Text({
					x: ((intW * 0.02) + (block.getChildren()[0].getWidth())),
					y: (intH * 0.013),
					text: currentValue.toString(),
					name: 'blockValueText',
					fontSize: (headSize * 1.3),
					fontFamily: 'pixel',
					fill: '#000'
				});
				var blockValueBack = new Kinetic.Rect({
					x: (block.getChildren()[0].getWidth()),
					y: 0,
					name: 'blockValueBack',
					width:	(intW * 0.117),
					height: (intH * 0.074),
					fill: '#caced5'
				});
				block.add(blockValueBack);	//Add the value area to the block group	
				block.add(blockValueNumber);
			}
		};
		
		function addValue(block){
			switch(block.getId()){
				case 'forward':
					baseValue(block);
				break;
				case 'backward':
					baseValue(block);
				break;
				case 'right':
					baseValue(block);
				break;
				case 'left':
					baseValue(block);
				break;
			}
			
			function baseValue(block) {
				//The elements of the edit value area.
				valueZone = new Kinetic.Rect({
					x: (intW * 0.05),
					y: (intH * 0.364),
					id: 'addValues',
					width:	(intW * 0.425),
					height: (intH * 0.16),
					fill: boxColor,
					opacity: 0.3
				});
				valueTitle = new Kinetic.Text({
					x: (intW * 0.0775),
					y: (intH * 0.38),
					text: 'Set Value',
					fontSize: headSize,
					fontFamily: 'pixel',
					fill: headColor
				});			
				valueNumberBack = new Kinetic.Rect({
					x: (intW * 0.167),
					y: (intH * 0.436),
					id: 'addValues',
					width:	(intW * 0.118),
					height: (intH * 0.076),
					fill: '#caced5'
				});
				valueNumber = new Kinetic.Text({
					x: (intW * 0.182),
					y: (intH * 0.446),
					text: currentValue.toString(),
					fontSize: (headSize * 1.5),
					fontFamily: 'pixel',
					fill: '#000'
				}); 
				
				// The value attached to the block group. 
				if(block.getChildren().length < 2){
					var blockValueNumber = new Kinetic.Text({
						x: ((intW * 0.02) + (block.getChildren()[0].getWidth())),
						y: (intH * 0.013),
						text: currentValue.toString(),
						name: 'blockValueText',
						fontSize: (headSize * 1.3),
						fontFamily: 'pixel',
						fill: '#000'
					});
					var blockValueBack = new Kinetic.Rect({
						x: (block.getChildren()[0].getWidth()),
						y: 0,
						name: 'blockValueBack',
						width:	(intW * 0.117),
						height: (intH * 0.074),
						fill: '#caced5'
					});
					block.add(blockValueBack);	//Add the value area to the block group	
					block.add(blockValueNumber);	
				}
				
				valueArea.add(valueZone);
				valueArea.add(valueNumberBack);
				valueArea.add(valueTitle);
				valueArea.add(valueNumber);

				valueArrows('Left', 0.0775, 0);
				valueArrows('Right', 0.311, 1);
				layers.intFace.add(valueArea);
			}
			
		};

		
		function valueArrows(id, xPos, dir){
			var arrowImg = new Image();
				arrowImg.src = 'images/smallArrows.gif';
				arrowImg.onload = function() {
					valueArrow = new Kinetic.Image({
						image: arrowImg,
						id: 'valueArrow' + id,
						x: (intW * xPos),
						y: (intH * 0.436),
						width: (intW * 0.063),
						height: (intH * 0.076),
						crop: {
							x: 0,
							y: (dir * 23),
							width: 15,
							height: 23
						}
					});
					//Left arrow events.
					valueArrow.on('mouseover', function(){
							document.body.style.cursor = 'pointer';
							if(this.getId() == 'valueArrowLeft'){
								this.setCrop(15, 0, 15, 23);
							}else if (this.getId() == 'valueArrowRight'){
								this.setCrop(15, (dir * 23), 15, 23);
							}
							layers.intFace.draw();
					});
					valueArrow.on('mouseout', function () {
						document.body.style.cursor = 'default';
						if(this.getId() == 'valueArrowLeft'){
							this.setCrop(0, 0, 15, 23);
						}else if(this.getId() == 'valueArrowRight'){
							this.setCrop(0, (dir * 23), 15, 23);
						}
						layers.intFace.draw();
					});
					valueArrow.on('click', function () {
						if(this.getId() == 'valueArrowLeft'){
							if(currentValue > 0){
								currentValue--;
								valueNumber.setText(currentValue.toString());
								currentBlock.getChildren()[2].setText(currentValue.toString());
								drawConsole();
							}
							layers.intFace.draw();
						}else if(this.getId() == 'valueArrowRight'){
							if(currentValue < 99){
								currentValue++;
								valueNumber.setText(currentValue.toString());
								currentBlock.getChildren()[2].setText(currentValue.toString());
								drawConsole();
							}
							layers.intFace.draw();
						}
					});
				valueArea.add(valueArrow);
			}
		};
		//
		// buildZone
		//
		var buildingZone;
		var activeBuild;
		function blockBuildZone(){
				buildingZone = new Kinetic.Rect({
				x: (intW * 0.05),
				y: (intH * 0.286),
				id: 'buildZone',
				width:	(intW * 0.425),
				height: (intH *0.076),
				fill: boxColor,
			});
			layers.intFace.add(buildingZone);
			layers.intFace.draw();
		}

		//
		//Script Boxes
		//
			var totalSlots = 6;
			var slots = new Array;

			function slotDraw(){
				var activeSlots = lvl.slots;
				for(var i = 0; i < totalSlots; i++){
					var scriptBox = new Kinetic.Rect({
						x: (intW * 0.525),
						id: 'slot'+i,
						y: (intH * (0.286 + (0.08 * i))),
						width:	(intW * 0.425),
						height: (intH *0.076),
						fill: boxColor,
						opacity: 0.3
					});
					if (i < activeSlots){
						scriptBox.setOpacity(1);
						slots[i] = scriptBox;
						slots[i].setName('slotBox');
						script[i] = null;
					}
					layers.intFace.add(scriptBox);
				};
			};
	
		var send = true;
		function sendButton(){
			sendText = new Kinetic.Text({
				x: (intW * 0.76),
				y: (intH * 0.88),
				padding: intW * 0.02,
				text: 'SEND',
				id: 'sendButton',
				fontSize: (headSize * 1.1),
				fontFamily: 'pixel',
				fill: '#000'
			});
			
			sendBack = new Kinetic.Rect({
				x: (intW * 0.75),
				y: (lvlH * 0.817),
				id: 'sendBack',
				width:	(intW * 0.20),
				height: (intH * 0.147),
				fill: '#f1f4f5'
			});
			
			sendGroup = new Kinetic.Group({
			});
				sendGroup.on('mouseover', function() {
					document.body.style.cursor = 'pointer';
				});
				sendGroup.on('mouseout', function() {
					document.body.style.cursor = 'default';
				});	
				sendGroup.on('click', function(){
					sendClick();
				});

			sendGroup.add(sendBack);
			sendGroup.add(sendText);
			layers.intFace.add(sendGroup);
			layers.intFace.draw();
		}
		
		function clearButton(){
			//Button to clear script. Removes script nodes and empties script array. Make seperate functio to do this as it is in next level as well.
			clearText = new Kinetic.Text({
				x: (intW * 0.525),
				y: lvlH * 0.88,
				text: 'CLEAR',
				padding: lvlH * 0.02,
				fontSize:  (headSize * 1.1),
				fontFamily: 'pixel',
				fill: '#000'
			});
			
			clearBack = new Kinetic.Rect({
				x: clearText.getX(),
				y: clearText.getY(),
				id: 'sendBack',
				width:	clearText.getWidth(),
				height: clearText.getHeight(),
				fill: '#f1f4f5'
			});
			
			clearGroup = new Kinetic.Group({
			});
				clearGroup.on('mouseover', function() {
					document.body.style.cursor = 'pointer';
				});
				clearGroup.on('mouseout', function() {
					document.body.style.cursor = 'default';
				});	
				clearGroup.on('click', function(){
					
					layers.intFace.get('.placed').each(function(placed){placed.remove();});
					layers.intFace.get('.functPlaced').each(function(placed){placed.remove();});
					script = [null, null, null, null, null, null];
					userFunction = [null, null, null, null, null, null];
					layers.intFace.get('.slotBox').each(function(slot){slot.setOpacity(1)});
					var oldMove = layers.intFace.get('.temp');
						if(oldMove != null && oldMove != undefined){
							oldMove.remove();
						}	
				});

			clearGroup.add(clearBack);
			clearGroup.add(clearText);
			layers.intFace.add(clearGroup);
			layers.intFace.draw();
		}
		
		// Tut button
		function questButton(){
			//Bring the tutorial back up
			questText = new Kinetic.Text({
				x: (intW * 0.258),
				y: lvlH * 0.88,
				text: 'HELP',
				padding: lvlH * 0.02,
				fontSize:  (headSize * 1.1),
				fontFamily: 'pixel',
				fill: '#000'
			});
			
			questBack = new Kinetic.Rect({
				x: questText.getX(),
				y: questText.getY(),
				id: 'sendBack',
				width: questText.getWidth(),
				height: questText.getHeight(),
				fill: '#f1f4f5'
			});
			
			questGroup = new Kinetic.Group({
			});
				questGroup.on('mouseover', function() {
					document.body.style.cursor = 'pointer';
				});
				questGroup.on('mouseout', function() {
					document.body.style.cursor = 'default';
				});	
				questGroup.on('click', function(){
					if(currentTuts == false){
						currentTuts = false;
						layers.tut.removeChildren();
						if(tutPos > 0){
							tutPos--;
						}
						tut1(lvl.tutorial[1]);
					}
				});

			questGroup.add(questBack);
			questGroup.add(questText);
			layers.intFace.add(questGroup);
			layers.intFace.draw();
		}

		
		function endButtons(end) {				
			reTryText = new Kinetic.Text({
				x: (0.04 * lvlW) + intW,
				y: lvlH * 0.88,
				text: 'TRY AGAIN',
				padding: lvlH * 0.02,
				fontSize: (headSize * 1.1),
				fontFamily: 'pixel',
				fill: '#000'
			});					
			reTryBack = new Kinetic.Rect({
				x: reTryText.getX(),
				y: reTryText.getY(),
				width:	reTryText.getWidth(),
				height: reTryText.getHeight(),
				fill: '#f1f4f5'
			});			
			reTryGroup = new Kinetic.Group({
			});
				reTryGroup.on('mouseover', function() {
					document.body.style.cursor = 'pointer';
				});
				reTryGroup.on('mouseout', function() {
					document.body.style.cursor = 'default';
				});	
				reTryGroup.on('click', function(){
					currentTuts = false;
					document.body.style.cursor = 'default';
					tuts = false;
					for(var i = 0; i < script.length; i++){
						if(script[i] != null){
							script[i].setDraggable(true);	//Remove draggable
							script[i].setListening(true);	//Remove event listening
						}
					};
					layers.tut.removeChildren();
					reset();
				});
			
			
			nextText = new Kinetic.Text({
				x: (0.04 * lvlW) + intW,
				y: lvlH * 0.88,
				text: 'NEXT SECTION',
				padding: lvlH * 0.02,
				fontSize: (headSize * 1.1),
				fontFamily: 'pixel',
				fill: '#000'
			});
			nextBack = new Kinetic.Rect({
				x: nextText.getX(),
				y: nextText.getY(),
				width:	nextText.getWidth(),
				height: nextText.getHeight(),
				fill: '#f1f4f5'
			});
			nextGroup = new Kinetic.Group({
			});
				nextGroup.on('mouseover', function() {
					document.body.style.cursor = 'pointer';
				});
				nextGroup.on('mouseout', function() {
					document.body.style.cursor = 'default';
				});	
				nextGroup.on('click', function(){
					tuts = true;
					currentTuts = false;
					layers.tut.destroyChildren();
					nextLevel();
				});
			
			if(end == 'success'){
				nextGroup.add(nextBack);
				nextGroup.add(nextText);
				layers.tut.add(nextGroup);
			}else{
				reTryGroup.add(reTryBack);
				reTryGroup.add(reTryText);
				layers.tut.add(reTryGroup);
			}

			layers.level.draw();
		}

	//
	// FUNCTIONS TO DRAW CONSOLE.
	//
	var helpAction;
	var helpValue = '1';
	var helpText = '';
	
	function setConsole(block){
		consoleBack.setOpacity(1);
		var id = block.getChildren('Image')[0].getId();
		switch (id){
			case 'forward': 
				helpAction = 'FORWARD'; actionPrefix = 'DAVID will\nmove '; 
				break;
			case 'backward': 
				helpAction = 'BACKWARD'; actionPrefix = 'DAVID will\nmove ';  
				break;
			case 'right': 
				helpAction = 'RIGHT'; actionPrefix = 'DAVID will\nturn '; 
				break;
			case 'left': 
				helpAction = 'LEFT'; actionPrefix = 'DAVID will\nturn '; 
				break;
		};
		consoleId = id;
		drawConsole();
	}
	
	function drawConsole(){
		if(consoleId == 'forward' || consoleId == 'backward'){
			helpValue = currentValue;
			if(currentValue == 1){
				valueSuffix = ' BLOCK';
			}else{
				valueSuffix = ' BLOCKS';
			}
		}
		else if(consoleId == 'right' || consoleId == 'left'){
			helpValue = currentValue*90;
			valueSuffix = ' DEGREES';
		}
		consoleText.setText(actionPrefix+helpAction+'\n'+helpValue+valueSuffix);
		layers.intFace.draw;
	}
	
	
	function removeConsole(){
		consoleBack.setOpacity(.3);
		consoleText.setText('');
		layers.intFace.draw;
	}
	
	function consoleCreate(){
		consoleBack = new Kinetic.Rect({
			x: intW * 0.05,
			y: intH * 0.616,
			id: 'consoleBack',
			width:	intW * 0.425,
			height: intH * 0.147,
			fill: boxColor,
			opacity: .3
		});
		
		consoleText = new Kinetic.Text({
			x: consoleBack.getX(),
			y: consoleBack.getY(),
			text: helpText,
			lineHeight: 1.3,
			width: consoleBack.getWidth(),
			padding: lvlH * 0.016,
			fontSize: (headSize * .8),
			fontFamily: 'pixel',
			fill: '#fff'
		});
		
		layers.intFace.add(consoleBack);
		layers.intFace.add(consoleText);
		layers.intFace.draw;
	}	

	//
	// FUNCTION TO DRAW MENU
	//	
	
	function menuButton(){
			//Bring up the menu
			menuText = new Kinetic.Text({
				x: (intW * 0.05),
				y: lvlH * 0.88,
				text: 'MENU',
				padding: lvlH * 0.02,
				fontSize:  (headSize * 1.1),
				fontFamily: 'pixel',
				fill: '#000'
			});
			
			menuBack = new Kinetic.Rect({
				x: menuText.getX(),
				y: menuText.getY(),
				id: 'sendBack',
				width: menuText.getWidth(),
				height: menuText.getHeight(),
				fill: '#f1f4f5'
			});
			
			menuGroup = new Kinetic.Group({
			});
				menuGroup.on('mouseover', function() {
					document.body.style.cursor = 'pointer';
				});
				menuGroup.on('mouseout', function() {
					document.body.style.cursor = 'default';
				});	
				menuGroup.on('click', function(){
					drawMenu();
					if(lvl.sound[0].paused == false){
						fadeSound(lvl.sound[0], 0.04, 'out', 1);
					}
					if(lvl.sound[1].paused == false){
						fadeSound(lvl.sound[1], 0.04, 'out', 1);
					}
					if(mute == false){
						fadeSound(interlude, 0.04, 'in', 1)
					};
				});

			menuGroup.add(menuBack);
			menuGroup.add(menuText);
			layers.intFace.add(menuGroup);
			layers.intFace.draw();
		}
		function closeMenuButton(){
			//Bring up the menu
			closeMenuText = new Kinetic.Text({
				x: (intW * 0.05),
				y: lvlH * 0.88,
				text: 'CLOSE',
				padding: lvlH * 0.02,
				fontSize:  (headSize * 1.1),
				fontFamily: 'pixel',
				fill: '#000'
			});
			
			closeMenuBack = new Kinetic.Rect({
				x: closeMenuText.getX(),
				y: closeMenuText.getY(),
				id: 'sendBack',
				width: closeMenuText.getWidth(),
				height: closeMenuText.getHeight(),
				fill: '#f1f4f5'
			});
			
			closeMenuGroup = new Kinetic.Group({
			});
				closeMenuGroup.on('mouseover', function() {
					document.body.style.cursor = 'pointer';
				});
				closeMenuGroup.on('mouseout', function() {
					document.body.style.cursor = 'default';
				});	
				closeMenuGroup.on('click', function(){
					layers.tut.show();
					menuOverviewGroup.removeChildren();
					layers.menu.removeChildren();
					layers.menu.draw();
					if(mute == false){
						if(interlude.paused == false){
							fadeSound(interlude, 0.04, 'out', 1)
						}
						fadeSound(lvl.sound[0], 0.008, 'in', 1);
					};
				});
			closeMenuGroup.add(closeMenuBack);
			closeMenuGroup.add(closeMenuText);
			layers.menu.add(closeMenuGroup);
			layers.menu.draw();
		}
			function menuTitle(xPos, yPos, width, text){
				var rule = new Kinetic.Rect({
					x: (intW * xPos),
					y: (intH * yPos),
					width:	(intW * width),
					height: (intH * 0.005),
					fill: headColor
				});
				var titleText = new Kinetic.Text({
					x: (intW * xPos),
					y: (intH * (yPos + 0.014)),
					text: text,
					fontSize: headSize,
					fontFamily: 'pixel',
					fill: headColor
				});
				layers.menu.add(rule);
				layers.menu.add(titleText);
			};

		function menuButtons() {
			var curBack = new Kinetic.Rect({
				x: (intW * 0.05),
				y: (intH  * 0.11),
				width: (intW * 0.9),
				height: 0,
				fill: blackColor
			});
			var secTitle = new Kinetic.Text({
				x: (intW * 0.075),
				y: (intH * 0.14),
				text: lvl.title,
				fontSize: (headSize * 0.95),
				fontFamily: 'pixel',
				fill: headColor,
				width: (intW * 0.8)
			});
			
			var secDes = new Kinetic.Text({
				x: (intW * 0.075),
				y: secTitle.getY()+(intH * 0.05),
				text: lvl.description,
				fontSize: (headSize * 0.85),
				fontFamily: 'pixel',
				fill: headColor,
				width: (intW * 0.85)
			});
			var selectBack = new Kinetic.Rect({
				x: (intW * 0.05),
				y: (intH  * 0.5),
				width: (intW * 0.9),
				height: (intH * 0.076),
				fill: blackColor
			});
			
			selectTitle = new Kinetic.Text({
				x: (intW * 0.15),
				y: (intH * 0.52),
				text: lvl.title,
				fontSize: (headSize),
				fontFamily: 'pixel',
				fill: headColor,
				width: (intW * 0.8)
			});
			
			var selectDesBack = new Kinetic.Rect({
				x: (intW * 0.315),
				y: (intH  * 0.6),
				width: (intW * 0.64),
				height: (intH * 0.22),
				fill: blackColor
			});
			selectDes = new Kinetic.Text({
				x: (intW * 0.35),
				y: (intH * 0.62),
				text: lvl.description,
				fontSize: (headSize* 0.85),
				fontFamily: 'pixel',
				fill: headColor,
				width: (intW * 0.6)
			});				
			
			selectSecText = new Kinetic.Text({
				x: (intW * 0.05),
				y: lvlH * 0.6,
				text: 'SELECT',
				padding: lvlH * 0.02,
				fontSize:  (headSize * 1.1),
				fontFamily: 'pixel',
				fill: '#000'
			});
			
			selectSecBack = new Kinetic.Rect({
				x: selectSecText.getX(),
				y: selectSecText.getY(),
				id: 'sendBack',
				width: selectSecText.getWidth(),
				height: selectSecText.getHeight(),
				fill: '#f1f4f5'
			});
			
			selectSecGroup = new Kinetic.Group({
				listening: true
			});
				selectSecGroup.on('mouseover', function() {
					document.body.style.cursor = 'pointer';
				});
				selectSecGroup.on('mouseout', function() {
					document.body.style.cursor = 'default';
				});	
				selectSecGroup.on('click', function(){
					selectSecGroup.setListening(false);
					layers.tut.show();
					menuOverviewGroup.removeChildren();
					layers.menu.removeChildren();
					layers.menu.draw();
					if(currentLevel != menuHighlightPos){
						currentLevel = menuHighlightPos;
						currentTuts = false;
						layers.tut.removeChildren();
						grassTileSet = [];
						sandTileSet = [];
						document.body.style.cursor = 'default';
						dirtTileSet = [];
						lvl = levelArray[currentLevel];
						layers.level.destroyChildren();
						script = [];
						userFunction = [];
						david2Script = [];
						valueArea.destroy();
						removeConsole();
						send = true;
						scriptPos = 0;
						userFunctPos = 0;
						david2Pos = 0;
						layers.intFace.removeChildren();
						intDraw();
						levelDraw(lvl);
					}
				});
			//Convert Title to one line
			var oneLineTitle = replaceChar(lvl.title, 10, ' - ');
			selectTitle.setText(oneLineTitle);			
			secTitle.setText(oneLineTitle);
			
			selectSecGroup.add(selectSecBack);
			selectSecGroup.add(selectSecText);

		
			curBack.setHeight(((secDes.getY()+secDes.getHeight())+(intH*0.025))-curBack.getY());
			layers.menu.add(curBack);
			layers.menu.add(selectBack);
			layers.menu.add(secTitle);
			layers.menu.add(selectTitle);
			layers.menu.add(secDes);
			layers.menu.add(selectDesBack);
			layers.menu.add(selectDes);
			layers.menu.add(selectSecGroup);
		}
	
		function drawMenu() {
			var menuBack = new Kinetic.Rect({
				x: 0,
				y: 0,
				width:	intW,
				height: intH,
				fill: '#131522'
			});		
			var menuLvlBack = new Kinetic.Rect({
				x: intW,
				y: 0,
				width:	lvlW,
				height: lvlH,
				fill: '#131522',
				opacity: 0.9
			});
			
			layers.menu.add(menuBack);
			layers.tut.hide();
			menuTitle(0.05, 0.038, 0.9, 'CURRENT SECTION');
			menuTitle(0.05, 0.4, 0.9, 'SELECT SECTION');
			menuButtons();
			closeMenuButton();
			layers.menu.draw();
			menuOverview(completedLevels);
			menuHighlightPos = currentLevel;
			drawMenuHighlight(menuOverArray[menuHighlightPos].image);
			sectionArrows('left', 0.05, 0);
			sectionArrows('right', 0.887, 1);		
		}
	
	var menuHighlightPos = 0;
	var menuHighlights = [];
	var pulseMenuTut = new Kinetic.Animation(function(frame) {
		//Pulse the opacity of the tutorials
		for(var i = 0; i < menuHighlights.length; i++){
			menuHighlights[i].setOpacity(0.5-(.5 * (Math.sin(frame.time * 4 * Math.PI / period))));
		};
	}, layers.menu);
	
	function drawMenuHighlight(section){
		pulseMenuTut.stop();
		var hl = menuHighlights.length;
		for(var i = 0; i < hl; i++){
			menuHighlights[i].remove();
		};
		menuHighlights = [];
		
		var x = section.getX();
		var y = section.getY();
		var w = section.getWidth();
		var h = section.getHeight();
		var highlight0 = new Kinetic.Image({
			image: highlightImg,
			id: 'hightlight',
			name:'hightlight0',
			x: x - (intW * 0.01),
			y: y - (intW * 0.01),
			width: (intW * 0.03),
			height: (intW * 0.03),
			crop: {
				x: 0,
				y: 0,
				width: 6,
				height: 6
			} 
		});
		var highlight1 = new Kinetic.Image({
			image: highlightImg,
			id: 'hightlight',
			name:'hightlight0',
			x: (x + w) - (intW * 0.02),
			y: y - (intW * 0.01),
			width: (intW * 0.03),
			height: (intW * 0.03),
			crop: {
				x: 6,
				y: 0,
				width: 6,
				height: 6
			} 
		});
		var highlight2 = new Kinetic.Image({
			image: highlightImg,
			id: 'hightlight',
			name:'hightlight0',
			x: x - (intW * 0.01),
			y: (y + h) - (intW * 0.02),
			width: (intW * 0.03),
			height: (intW * 0.03),
			crop: {
				x: 0,
				y: 6,
				width: 6,
				height: 6
			} 
		});
		var highlight3 = new Kinetic.Image({
			image: highlightImg,
			id: 'hightlight',
			name:'hightlight0',
			x: (x + w) - (intW * 0.02),
			y: (y + h) - (intW * 0.02),
			width: (intW * 0.03),
			height: (intW * 0.03),
			crop: {
				x: 6,
				y: 6,
				width: 6,
				height: 6
			} 
		});
		layers.menu.add(highlight0);
		layers.menu.add(highlight1);
		layers.menu.add(highlight2);
		layers.menu.add(highlight3);
		menuHighlights.push(highlight0, highlight1, highlight2, highlight3);
		pulseMenuTut.start();
	}
	
	function sectionArrows(id, xPos, dir){
		var arrowImg = new Image();
		arrowImg.src = 'images/smallArrows.gif';
		arrowImg.onload = function(){
			var sectionArrow = new Kinetic.Image({
				image: arrowImg,
				id: id,
				x: (intW * xPos),
				y: (intH * 0.5),
				name: sectionArrow,
				width: (intW * 0.063),
				height: (intH * 0.076),
				opacity: 0.2,
				crop: {
					x: 0,
					y: (dir * 23),
					width: 15,
					height: 23
				}
			});
			sectionArrow.setOpacity(1);
			sectionArrow.on('mouseover', function(){
				document.body.style.cursor = 'pointer';
				if(this.getId() == 'left'){
					this.setCrop(15, 0, 15, 23);
				}else if (this.getId() == 'right'){
					this.setCrop(15, (dir * 23), 15, 23);
				}
				layers.menu.draw();
			});
			sectionArrow.on('mouseout', function () {
				document.body.style.cursor = 'default';
				if(this.getId() == 'left'){
					this.setCrop(0, 0, 15, 23);
				}else if(this.getId() == 'right'){
					this.setCrop(0, (dir * 23), 15, 23);
				}
				layers.menu.draw();
			});
			sectionArrow.on('click', function(){
				if(this.getId() == 'left'){
					if(menuHighlightPos > 0){
						menuHighlightPos--;
						drawMenuHighlight(menuOverArray[menuHighlightPos].image);
						selectDes.setText(levelArray[menuHighlightPos].description);
						var oneLineTitle = replaceChar(levelArray[menuHighlightPos].title, 10, ' - ');
						selectTitle.setText(oneLineTitle);
					}
				}
				if(this.getId() == 'right'){
					if(menuHighlightPos < completedLevels){
						menuHighlightPos++;
						drawMenuHighlight(menuOverArray[menuHighlightPos].image);
						var oneLineTitle = replaceChar(levelArray[menuHighlightPos].title, 10, ' - ');
						selectTitle.setText(oneLineTitle);
						selectDes.setText(levelArray[menuHighlightPos].description);
					}
				}
			});
		layers.menu.add(sectionArrow);
		layers.menu.draw();
		}
	}
	
	//
	// Function to draw indicator
	//
	
	// Change the fucntion to move it if it exists. Add a 
		function indicator(){
			ind = new Kinetic.Rect({
				x: intW * 0.94,
				y: -intH * 0.078,
				name: 'indicator',
				width:	intW * 0.03,
				height: intH * 0.076,
				fill: orangeColor
			});
			layers.intFace.add(ind);
			layers.intFace.draw();
		};

	// Switch between send and stop.

	function sendSwitch(state){
		switch(state){
			case 'on':
				sendGroup.get('Text')[0].setText('SEND');
				sendGroup.get('Rect')[0].setFill('#f1f4f5');
				layers.intFace.draw();
			break;
			case 'off':
				sendGroup.get('Text')[0].setText('STOP');
				sendGroup.get('Rect')[0].setFill('#E31700');
				layers.intFace.draw();
			break;
		}
	}
	
	function sendClick(){
		if(send == true){
			//If the 'SEND' button is clicked.
			currentTuts = false;
			layers.tut.removeChildren();
			scriptPos = 0;
			userFunctPos = 0;
			indicator();
			runScript();
			send = false;
			sendSwitch('off');
			valueArea.destroy();
			removeConsole();
			
			listening(false); 	//Turn off drag and listen - enter passive mode
			
			//Remove any funvtion blocks in the edit zone.
				if(layers.intFace.get('.editFunct')[0] != null && layers.intFace.get('.editFunct')[0] != undefined && layers.intFace.get('.editFunct')[0] != this){
					layers.intFace.get('.editFunct')[0].remove();
				}
			// Switch the script zone back to main script
			editFunction1 = false;
			layers.intFace.get('.SCRIPT')[0].setText('SCRIPT');
			layers.intFace.get('.SCRIPT')[0].setFill(headColor);
			if(layers.intFace.get('.edit')[0] != null && layers.intFace.get('.edit')[0] != undefined){
				//Remove any blockgroup in the edit zone.
				layers.intFace.get('.edit')[0].remove();
			}
			for(var i = 0; i < userFunction.length; i++){
				//Hide the User Function
				if(userFunction[i] != null){
					userFunction[i].setOpacity(0); //Make them invisible
					userFunction[i].setDraggable(false);	//Remove drag properties.
					userFunction[i].setListening(false);	//Remove event listening
				};
			}
			for(var i = 0; i < david2Script.length; i++){
				//Hide the David 2 Function
				if(david2Script[i] != null){
					david2Script[i].setOpacity(0); //Make them invisible
					david2Script[i].setDraggable(false);	//Remove drag properties.
					david2Script[i].setListening(false);	//Remove event listening
				};
			}
			var allSlots = layers.intFace.get('.slotBox');
			allSlots.each(function(slot){
				//Reset boxes to script color
				slot.setFill(boxColor);
			});
			
		}else{
			//If the 'STOP' button is clicked.
			currentTuts = false;

			listening(true); // Exit passive mode.
			
			var oldMove = layers.intFace.get('.temp');
			if(oldMove != null && oldMove != undefined){
				oldMove.remove();
			}
			for(var i = 0; i < script.length; i++){
				if(script[i] != null){
					script[i].setOpacity(1);	//Set the block to visible.
					script[i].setDraggable(true);	//Make them draggable
					script[i].setListening(true);	//Replace event listening
					var activeSlots = layers.intFace.get('.slotBox');
					activeSlots[i].setOpacity(.3);	//Reset the script boxes to dull, show they're full
				}else{
					var activeSlots = layers.intFace.get('.slotBox');
					activeSlots[i].setOpacity(1)
				}
			};
			layers.tut.removeChildren();
			layers.intFace.draw();
			reset();
			sendSwitch('on');
			send = true;
		}
	}
	
	//Turn off/on listening when in passive observation mode
	function listening(on){
		clearGroup.setListening(on);
		menuGroup.setListening(on);
		var blocks = layers.intFace.get('.staticAction');
		blocks.each(function(block){
			block.setDraggable(on);
			block.setListening(on);
		});
		questGroup.setListening(on);
		clearGroup.setListening(on);

		for(var i = 0; i < script.length; i++){
			if(script[i] != null){
				script[i].setOpacity(1);	//Set the block to visible.
				script[i].setDraggable(on);	//Remove draggable
				script[i].setListening(on);	//Remove event listening
				var activeSlots = layers.intFace.get('.slotBox');
				activeSlots[i].setOpacity(.3);	//Reset the script boxes to dull, show they're full
			}else{
				var activeSlots = layers.intFace.get('.slotBox');
				activeSlots[i].setOpacity(1)
			}
		};
	}
	//
	//	
	//	FUNCTION TO CREATE INTERFACE.
	//
	//
	
	function intDraw() {	
		intBack = new Kinetic.Rect({
			x: 0,
			y: 0,
			width:	intW,
			height: allH,
			fill: '#131522'
		});
		intBorder = new Kinetic.Rect({
			x: (intW - (intW*0.005)),
			y: 0,
			width: (intW*0.01),
			height: allH,
			fill: '#ddd'
		});	
			layers.intFace.add(intBack);	//Background
			layers.intFace.add(intBorder);	//Border
				//Section Titles
				sectionTitle(0.05, 0.038, 0.9, 'ACTIONS');
				sectionTitle(0.05, 0.55, 0.425, 'CONSOLE');
				sectionTitle(0.525, 0.22, 0.425, 'SCRIPT');
				sectionTitle(0.05, 0.22, 0.425, 'EDIT BLOCK');
			slotDraw();
			actionBarDraw();
			blockBuildZone();
			consoleCreate();
			menuButton();
			questButton(); //Draw the button that brings tutorial back up.
			clearButton();
			sendButton();
			drawBlocks(0);
		if(currentLevel == 0){
			buildingZone.setOpacity(0.3);
		}
	};	
	
	//	
	// RESET LEVEL
	//
	function reset(){
		var oldMove = layers.intFace.get('.temp');
		if(oldMove != null && oldMove != undefined){
			oldMove.remove();
		}
		ind.remove();
		layers.level.destroyChildren();
		levelDraw(levelArray[currentLevel]);
		sendSwitch('on');
		send = true;
			//Stop David if he's moving/turning. For when called by stop.
			davidAni.setAnimation('idle1');
			if(davidForward == true){forwardAnimation.stop()};
			if(davidTurning == true){turnDavid.stop()};
			if(david2Ex == true){david2.setAnimation('idle1');}
			if(david2Forward == true){forwardAnimation2.stop()};
			if(david2Turning == true){turnDavid2.stop()};
		scriptPos = 0;
		userFunctPos = 0;
		david2Pos = 0;
		listening(true);
		if(userTimeEx == true){clearTimeout(userTime)};
		if(david2TimeEx == true){clearTimeout(davidTime)};
		if(scriptTimeEx == true){clearTimeout(scriptTime)};
	};
	
	//
	//NEXT LEVEL
	//
	
	function nextLevel(){
		if(lvl.sound[0].paused == false ){
			fadeSound(lvl.sound[0], 0.04, 'out', 1);
		}
		if(lvl.sound[1].paused == false ){
			fadeSound(lvl.sound[1], 0.04, 'out', 1);
		}
		if(mute == false){fadeSound(interlude, 0.04, 'in', 1)};
		listening(false);
		sendGroup.setListening(false);
		ind.remove();
		grassTileSet = [];
		sandTileSet = [];
		document.body.style.cursor = 'default';
		dirtTileSet = [];
		if(currentLevel < levelArray.length - 1){
			currentLevel++;
			if(currentLevel > completedLevels){
				completedLevels++;
			}
		}else{
			currentLevel = 0;
			completedLevels = levelArray.length;
		}
		lvl = levelArray[currentLevel];
		layers.level.destroyChildren();
		script = [];
		userFunction = [];
		david2Script = [];
		send = true;
		scriptPos = 0;
		userFunctPos = 0;
		david2Pos = 0;
		layers.intFace.removeChildren();
		intDraw();

		showOverview(currentLevel);
	};
	
	
	// MESSAGES
	
	function newMessage(x, y, w, message) {
		var x = (x * lvlW) + intW;
		var y = (y * lvlH);
		var w = (w * lvlW);
		var congrats = new Kinetic.Text({
			text: message,
			lineHeight: 1,
			fill: '#EEE',
			width: w,
			fontSize: (headSize * 1.16),
			fontFamily: 'pixel',
			x: x,
			y: y,
			padding: 16,
			align: 'left'
		});  
		var congratsBack = new Kinetic.Rect({
			x: x,
			y: y,
			fill: '#000',
			opacity: 0.7,
			width: w,
			height: congrats.getHeight(),
		});
		layers.level.add(congratsBack);
		layers.level.add(congrats);
		layers.level.draw();
	};
	
	//
	//
	//	Run the script
	//
	//
	
	var scriptPos = 0;
	var scriptTimeEx = false;
	function runScript(){
		if(scriptPos < script.length){
			if(script[scriptPos] != null && script[scriptPos] != undefined){
				ind.setY(script[scriptPos].getPosition().y)
				scriptTimeEx = true;
				scriptTime = setTimeout(function(){
					var action = script[scriptPos].getId();
					if(script[scriptPos].get('Text')[0] != null || script[scriptPos].get('Text')[0] != undefined){
						var value = script[scriptPos].get('Text')[0].getText();
					};
					switch(script[scriptPos].getId()){
						case 'forward': davidMove(action, script[scriptPos].get('Text')[0].getText(), 'script'); break;
						case 'backward': davidMove(action, script[scriptPos].get('Text')[0].getText(), 'script'); break;
						case 'left': davidTurn(action, script[scriptPos].get('Text')[0].getText(), 'script'); break;
						case 'right': davidTurn(action, script[scriptPos].get('Text')[0].getText(), 'script'); break;
						case 'funct': runUserFunction(6); functDisplayPos = script[scriptPos]; break;
						case 'david2': runDavid2();david2DisplayPos = script[scriptPos]; break;
						default:
							console.log('action doesn\'t exist');
							scriptPos++;
							runScript();
					};
				}, 500);
			}else{
				//Run if the script position is empty but there is more script to run.
				scriptPos++;
				runScript();
			};
		}else{
			//Run if the script is finished but David didn't enounter the end
			setTimeout(function(){
				reset();
				layers.tut.removeChildren();
				tutContain();
				currentTuts = false;
				tutMessage('Oh no!\nLooks like David didn\'t make it all the way across the section.');
				engineer(1, 1);
				endButtons();
			}, 1000);
		}
	};
	var userFunctPos = 0;
	var functDisplayPos;
	var userTimeEx = false;
	function runUserFunction(david){
		userTimeEx = true;
		//Runs through the users custom function.
		if(userFunctPos < userFunction.length){
			if(userFunction[userFunctPos] != null && userFunction[userFunctPos] != undefined){
				userTime = setTimeout(function(){
					var action = userFunction[userFunctPos].getId();
					if(userFunction[userFunctPos].get('Text')[0] != null || userFunction[userFunctPos].get('Text')[0] != undefined){
						var value = userFunction[userFunctPos].get('Text')[0].getText();
					};
					switch(userFunction[userFunctPos].getId()){
						case 'forward':
							if(david == 2){
								david2Move(action, userFunction[userFunctPos].get('Text')[0].getText(), 'david2');
								displayUserFunct(functDisplayPos, userFunction[userFunctPos]);
							}
							else{
								davidMove(action, userFunction[userFunctPos].get('Text')[0].getText(), 'userFunct');
								displayUserFunct(functDisplayPos, userFunction[userFunctPos]);
							}
						break;
						case 'backward': 
							if(david == 2){
								david2Move(action, userFunction[userFunctPos].get('Text')[0].getText(), 'david2');
								displayUserFunct(functDisplayPos, userFunction[userFunctPos]);
							}
							else{
								davidMove(action, userFunction[userFunctPos].get('Text')[0].getText(), 'userFunct');
								displayUserFunct(functDisplayPos, userFunction[userFunctPos]);
							}
						break;
						case 'left':
							if(david == 2){
								david2Turn(action, userFunction[userFunctPos].get('Text')[0].getText(), 'david2');
								displayUserFunct(functDisplayPos, userFunction[userFunctPos]);
							}
							else{
								davidTurn(action, userFunction[userFunctPos].get('Text')[0].getText(), 'userFunct'); 
								displayUserFunct(functDisplayPos, userFunction[userFunctPos]);
							}
						break;
						case 'right':
							if(david == 2){
								david2Turn(action, userFunction[userFunctPos].get('Text')[0].getText(), 'david2');
								displayUserFunct(functDisplayPos, userFunction[userFunctPos]);
							}
							else{
								davidTurn(action, userFunction[userFunctPos].get('Text')[0].getText(), 'userFunct');
								displayUserFunct(functDisplayPos, userFunction[userFunctPos]);
							}
						break;
						case 'david2':
							if(david == 2){console.log('RECURSION!')}
							else{
								runDavid2();
								david2DisplayPos = script[scriptPos];
								displayUserFunct(functDisplayPos, userFunction[userFunctPos]);
							}
						break;
						default:
							console.log('action doesn\'t exist, or some cheeky shit put a function in itself');
							userFunctPos++;
							runUserFunction(david);
					};
				}, 500);
			}else{
				//Run if the User Function position is empty but there is more User Function to run.
				userFunctPos++;
				runUserFunction(david);
			};
		}else{
			//Run if the User Function is finished but David didn't enounter the end - next main script pos.
			scriptPos++;
			//Reset the user function so it can be called again in main script
			var oldMove = layers.intFace.get('.temp');
				//Remove the display block
				if(oldMove != null && oldMove != undefined){
				oldMove.remove();
			}
			userFunctPos = 0;
			runScript();
		}
	};
	
	var david2Pos = 0;
	var david2DisplayPos;
	var david2TimeEx = false;
	function runDavid2(){
		david2TimeEx = true;
		//Runs through the users custom function.
		if(david2Pos < david2Script.length){
			if(david2Script[david2Pos] != null && david2Script[david2Pos] != undefined){
				davidTime = setTimeout(function(){
					var action = david2Script[david2Pos].getId();
					if(david2Script[david2Pos].get('Text')[0] != null || david2Script[david2Pos].get('Text')[0] != undefined){
						var value = david2Script[david2Pos].get('Text')[0].getText();
					};
					switch(david2Script[david2Pos].getId()){
						case 'forward':
							david2Move(action, david2Script[david2Pos].get('Text')[0].getText(), 'david2');
							displayUserFunct(david2DisplayPos, david2Script[david2Pos]);
						break;
						case 'backward': 
							david2Move(action, david2Script[david2Pos].get('Text')[0].getText(), 'david2');
							displayUserFunct(david2DisplayPos, david2Script[david2Pos]);
						break;
						case 'left': 
							david2Turn(action, david2Script[david2Pos].get('Text')[0].getText(), 'david2'); 
							displayUserFunct(david2DisplayPos, david2Script[david2Pos]);
						break;
						case 'right': 
							david2Turn(action, david2Script[david2Pos].get('Text')[0].getText(), 'david2');
							displayUserFunct(david2DisplayPos, david2Script[david2Pos]);
						break;
						case 'funct': 
							runUserFunction(2);
						break;
						default:
							console.log('action doesn\'t exist, or some cheeky shit put a function in itself');
							david2Pos++;
							runDavid2();
					};
				}, 500);
			}else{
				//Run if the User Function position is empty but there is more User Function to run.
				david2Pos++;
				runDavid2();
			};
		}else{
			//Run if the David 2 Function is finished but David didn't enounter the end - next main script pos.
			scriptPos++;
			//Reset the David 2 function so it can be called again in main script
			var oldMove = layers.intFace.get('.temp');
				//Remove the display block
				if(oldMove != null && oldMove != undefined){
				oldMove.remove();
			}
			david2Pos = 0;
			runScript();
		}
	};
	
	function displayUserFunct(block, toDraw){
		var oldMove = layers.intFace.get('.temp');
		if(oldMove != null && oldMove != undefined){
			oldMove.remove();
		}
		var groupKids = block.getChildren();
		var x = 0;
		groupKids.each(function(child){
			// Get the total area of the block group. Check through all the children to get the furtherest point from the x.y origin.
			if(block.getX() + (child.getAbsolutePosition().x - block.getX() + child.getWidth()) > x){
				x = block.getX() + (child.getAbsolutePosition().x - block.getX() + child.getWidth());
			}
		});
		y = block.getY()/intH;
		var action = toDraw.getId();
		drawAction(action, x/intW ,y, 'temp')
		var newMove = layers.intFace.get('.temp');
		if(action != 'david2'){
			currentValue = (toDraw.get('Text')[0].getText());
			var blockValueNumber = new Kinetic.Text({
				x: ((intW * 0.02) + (block.getChildren()[0].getWidth())),
				y: (intH * 0.013),
				text: currentValue.toString(),
				name: 'blockValueText',
				fontSize: (headSize * 1.3),
				fontFamily: 'pixel',
				fill: '#000'
			});
			var blockValueBack = new Kinetic.Rect({
				x: (block.getChildren()[0].getWidth()),
				y: 0,
				name: 'blockValueBack',
				width:	(intW * 0.117),
				height: (intH * 0.074),
				fill: '#caced5'
			});
			newMove[0].add(blockValueBack);
			newMove[0].add(blockValueNumber);
		}
		newMove.each(function(child){
			child.setListening(false);
		});
	}
		
	//
	//
	// Functions to move David
	//
	//
		var davidForward = false;
		var forwardAnimation;
		function davidMove(action, blocks, script){
			davidAni.moveToTop();
			var currentX = davidAni.getPosition().x;
			var currentY = davidAni.getPosition().y;
			var newPos;
			var moveDir;
			switch(action){
				case 'forward': moveDir = davidDir; break;
				case 'backward': moveDir = (davidDir + 2)%4; break;
			}
			davidAni.setAnimation('forward1');
			
			switch(moveDir){
				case 0: newPos = (currentX + (blocks*(allH/lvl.width))); break;
				case 1: newPos = (currentY + (blocks*(allH/lvl.width))); break;
				case 2: newPos = (currentX - (blocks*(allH/lvl.width))); break;
				case 3: newPos = (currentY - (blocks*(allH/lvl.width))); break;
			}
			forwardAnimation = new Kinetic.Animation(function(frame) {
				if ((davidAni.getPosition().x < newPos && moveDir == 0) || (davidAni.getPosition().x > newPos && moveDir == 2) ||(davidAni.getPosition().y < newPos && moveDir == 1) || (davidAni.getPosition().y > newPos && moveDir == 3)){
					switch(moveDir){
						case 0: davidAni.move((allH/lvl.width)/70, 0); break;
						case 1: davidAni.move(0, (allH/lvl.width)/70); break;
						case 2: davidAni.move(-(allH/lvl.width)/70, 0); break;
						case 3: davidAni.move(0, -(allH/lvl.width)/70); break;
					}
					if(offscreen(davidAni) == 1){
						//RUNS IF DAVID IS ON SCREEN.
						if(collisionCheck(davidAni, endPoint) == 1){
							//RUNS IF DAVID REACHES THE END.
							if(levelArray[currentLevel].special[0] == true){
								switch(levelArray[currentLevel].special[1]){
									case 'david1':
										david1End();
										forwardAnimation.stop();
										davidForward = false;
									break;
									case 'david2':
										if(script != 'david2AniPos'){
											david2End();
											forwardAnimation.stop();
											davidForward = false;
										}
									break;
									default:
										tutContain();
										tutMessage('Awesome!\n\nDavid made it across this section, now we can move on.');
										engineer(1, 1);
										endButtons('success');
										davidAni.setAnimation('idle1');
										forwardAnimation.stop();
										davidForward = false;
								}
							}else{
								tutContain();
								tutMessage('Awesome!\n\nDavid made it across this section, now we can move on.');
								engineer(1, 1);
								endButtons('success');
								davidAni.setAnimation('idle1');
								forwardAnimation.stop();
								davidForward = false;
							}
						}else{
							for(var i = 0; i < grassTileSet.length; i++){
								if(grassTileSet[i] != null && grassTileSet[i] != undefined){
									if(collisionCheck(davidAni, grassTileSet[i]) == 1){
										// RUNS IF DAVID GOES ONTO GRASS.
										forwardAnimation.stop();
										davidForward = false;
										tutContain();
										tutMessage('OH NO!\n\nDavid\'s wheels have been jammed by the moss!');
										engineer(1, 1);
										endButtons();
									}
								}
							}
						}
						if(levelArray[currentLevel].special[0] == true){
							if(levelArray[currentLevel].special[1] == 'lander'){
								if(collisionCheck(davidAni, landerHit) == 1){
									forwardAnimation.stop();
									davidForward = false;
									tutContain();
									davidAni.setAnimation('idle1');
									tutMessage('Hey!\nThere\'s no time to go back in the lander, we have a job to do!');
									engineer(1, 1);
									endButtons();
								}
							}
						}
					}else{
						davidAni.setAnimation('idle1');
						forwardAnimation.stop();
						davidForward = false;
						tutContain();
						tutMessage('Oh no!\n\nDavid has encountered an un-known area!');
						engineer(1, 1);
						endButtons();
					}
				}else {
					switch(moveDir){
						case 0: davidAni.setX(newPos); break;
						case 1: davidAni.setY(newPos); break;
						case 2: davidAni.setX(newPos); break;
						case 3: davidAni.setY(newPos); break;
					}
					davidAni.setAnimation('idle1');
					forwardAnimation.stop();
					davidForward = false;
					//Move to the next action
					if(script == 'script'){
						scriptPos++;
						runScript();
					}else if(script == 'userFunct'){
						userFunctPos++;
						runUserFunction(1);
					}else if(script == 'david1'){
						return true;
					}else if(script == 'david2AniPos'){
						david2AnimationPos++;
						david2EndAni(david2AnimationPos);
					}	
				}
			}, layers.level);	
			
			forwardAnimation.start();
			davidForward = true;
		};
		
		var davidTurning = false;
		var turnDavid;
		function davidTurn(action, value, script){
			if(sandTileSet.length > 0){
				var onSand = false;
				for(var i = 0; i < sandTileSet.length; i++){
					if(sandTileSet[i] != null && sandTileSet[i] != undefined){
						if(collisionCheck(davidAni, sandTileSet[i]) == 1){
							var onSand = true;
						}
					}
				}
				if(onSand == true){
					//Runs if David 6 is on sand.
					davidAni.setAnimation('forward1');
					setTimeout(function(){
						davidAni.setAnimation('idle1');
						if(script == 'script'){
							scriptPos++;
							runScript();
						}else if(script == 'userFunct'){
							userFunctPos++;
							runUserFunction(6)
						}
					}, 1400);
				}else{
					//Runs if David 6 is not on sand but there is sand in the level.
					davidTurning = true;
					var value = parseInt(value);
					var currentDeg = davidDir;
					var newDeg;
						switch(action){
							case 'right': newDeg = ((currentDeg + value) * (Math.PI / 2)); break;
							case 'left': newDeg = ((currentDeg - value) * (Math.PI / 2)); break;
						}
					var angularSpeed = Math.PI / 3;
					davidAni.setAnimation('forward1');
					turnDavid = new Kinetic.Animation(function(frame) {
						var angleDiff = frame.timeDiff * angularSpeed / 1000;
						if ((davidAni.getRotation() < newDeg && action == 'right') || (davidAni.getRotation() > newDeg && action == 'left')){
							switch(action){
								case 'right': davidAni.rotate(angleDiff);; break;
								case 'left': davidAni.rotate(-angleDiff); break;
							}
						}else {
							//Stops david at the end of the movement	
							switch(action){
								case 'right': davidDir = (davidDir + (value%4))%4; break;
								case 'left': davidDir = (davidDir + (4 - value)%4)%4; break;
							}
							switch(davidDir){
								case 0: davidAni.setRotation(0); break;
								case 1: davidAni.setRotation(Math.PI * 0.5); break;
								case 2: davidAni.setRotation(Math.PI * 1); break;
								case 3: davidAni.setRotation(Math.PI * 1.5); break;
							};
							davidAni.setAnimation('idle1');
							turnDavid.stop();
							davidTurning = false;
							if(script == 'script'){
								scriptPos++;
								runScript();
							}else if(script == 'userFunct'){
								userFunctPos++;
								runUserFunction(6)
							}else if(script == 'david1'){
								return true;
							}else if(script == 'david2AniPos'){
								david2AnimationPos++;
								david2EndAni(david2AnimationPos);
							}	
						}
					}, layers.level);
					turnDavid.start();
				}
			}else{
				davidTurning = true;
				var value = parseInt(value);
				var currentDeg = davidDir;
				var newDeg;
					switch(action){
						case 'right': newDeg = ((currentDeg + value) * (Math.PI / 2)); break;
						case 'left': newDeg = ((currentDeg - value) * (Math.PI / 2)); break;
					}
				var angularSpeed = Math.PI / 3;
				davidAni.setAnimation('forward1');
				turnDavid = new Kinetic.Animation(function(frame) {
					var angleDiff = frame.timeDiff * angularSpeed / 1000;
					if ((davidAni.getRotation() < newDeg && action == 'right') || (davidAni.getRotation() > newDeg && action == 'left')){
						switch(action){
							case 'right': davidAni.rotate(angleDiff); break;
							case 'left': davidAni.rotate(-angleDiff); break;
						}
					}else {
						//Stops david at the end of the movement	
						switch(action){
							case 'right': davidDir = (davidDir + (value%4))%4; break;
							case 'left': davidDir = (davidDir + (4 - value)%4)%4; break;
						}
						switch(davidDir){
							case 0: davidAni.setRotation(0); break;
							case 1: davidAni.setRotation(Math.PI * 0.5); break;
							case 2: davidAni.setRotation(Math.PI * 1); break;
							case 3: davidAni.setRotation(Math.PI * 1.5); break;
						};
						davidAni.setAnimation('idle1');
						turnDavid.stop();
						davidTurning = false;
						if(script == 'script'){
							scriptPos++;
							runScript();
						}else if(script == 'userFunct'){
							userFunctPos++;
							runUserFunction(6)
						}else if(script == 'david1'){
							return true;
						}else if(script == 'david2AniPos'){
							david2AnimationPos++;
							david2EndAni(david2AnimationPos);
						}	
					}
				}, layers.level);	
				turnDavid.start();
			}
		};
		
		var david2Forward = false;
		var forwardAnimation2;
		function david2Move(action, blocks, script){
			//FUNCTION TO MOVE DAVID 2
			david2.moveToTop();
			var currentX = david2.getPosition().x;
			var currentY = david2.getPosition().y;
			var newPos;
			var moveDir;
			switch(action){
				case 'forward': moveDir = david2Dir; break;
				case 'backward': moveDir = (david2Dir + 2)%4; break;
			}
			david2.setAnimation('forward1');
			
			switch(moveDir){
				case 0: newPos = (currentX + (blocks*(allH/lvl.width))); break;
				case 1: newPos = (currentY + (blocks*(allH/lvl.width))); break;
				case 2: newPos = (currentX - (blocks*(allH/lvl.width))); break;
				case 3: newPos = (currentY - (blocks*(allH/lvl.width))); break;
			}
			forwardAnimation2 = new Kinetic.Animation(function(frame) {
				if ((david2.getPosition().x < newPos && moveDir == 0) || (david2.getPosition().x > newPos && moveDir == 2) ||(david2.getPosition().y < newPos && moveDir == 1) || (david2.getPosition().y > newPos && moveDir == 3)){
					switch(moveDir){
						case 0: david2.move((allH/lvl.width)/70, 0); break;
						case 1: david2.move(0, (allH/lvl.width)/70); break;
						case 2: david2.move(-(allH/lvl.width)/70, 0); break;
						case 3: david2.move(0, -(allH/lvl.width)/70); break;
					}
					if(offscreen(david2) == 1 || script == 'david2AniPos'){
						var d2Sand = false;
						//RUNS IF DAVID 2 IS ON SCREEN.
						for(var i = 0; i < sandTileSet.length; i++){
							if(sandTileSet[i] != null && sandTileSet[i] != undefined){
								if(collisionCheck(david2, sandTileSet[i]) == 1){
									d2Sand = true;	
								}
							}	
						}
						for(var i = 0; i < grassTileSet.length; i++){
							if(grassTileSet[i] != null && grassTileSet[i] != undefined){
								if(collisionCheck(david2, grassTileSet[i]) == 1){
									// RUNS IF DAVID 2 GOES ONTO GRASS.
									clearTile(grassTileSet[i], i);
								}
							}
						}
						if(d2Sand == true && script != 'david2AniPos'){
							console.log('Dave 2 on sand');
							forwardAnimation2.stop();
							david2Forward = false;
							tutContain();
							tutMessage('OH NO!\nDavid 2 is stuck in the sand!');
							engineer(1, 1);
							endButtons();
						}
					}else{
						david2.setAnimation('idle1');
						forwardAnimation2.stop();
						tutContain();
						tutMessage('Oh no!\n\nDavid 2 has encountered an un-known area!');
						engineer(1, 1);
						endButtons();
					}
				}else {
					switch(moveDir){
						case 0: david2.setX(newPos); break;
						case 1: david2.setY(newPos); break;
						case 2: david2.setX(newPos); break;
						case 3: david2.setY(newPos); break;
					}
					david2.setAnimation('idle1');
					forwardAnimation2.stop();
					//Move to the next action
					if(script == 'script'){
						scriptPos++;
						runScript();
					}else if(script == 'userFunct'){
						userFunctPos++;
						runUserFunction(2);
					}else if(script == 'david1'){
						return true;
					}else if(script == 'david2'){
						david2Pos++;
						runDavid2();
					}					
				}
			}, layers.level);	
			
			forwardAnimation2.start();
			david2Forward = true;
		};
		
		var david2Turning = false;
		var turnDavid2;
		function david2Turn(action, value, script){
			//FUNCTION TO TURN DAVID 2
			david2Turning = true;
				var value = parseInt(value);
				var currentDeg = david2Dir;
				var newDeg;
					switch(action){
						case 'right': newDeg = ((currentDeg + value) * (Math.PI / 2)); break;
						case 'left': newDeg = ((currentDeg - value) * (Math.PI / 2)); break;
					}
				var angularSpeed = Math.PI / 3;
				david2.setAnimation('forward1');
				turnDavid2 = new Kinetic.Animation(function(frame) {
					var angleDiff = frame.timeDiff * angularSpeed / 1000;
					if ((david2.getRotation() < newDeg && action == 'right') || (david2.getRotation() > newDeg && action == 'left')){
						switch(action){
							case 'right': david2.rotate(angleDiff);; break;
							case 'left': david2.rotate(-angleDiff); break;
						}
					}else {
						//Stops david at the end of the movement	
						switch(action){
							case 'right': david2Dir = (david2Dir + (value%4))%4; break;
							case 'left': david2Dir = (david2Dir + (4 - value)%4)%4; break;
						}
						switch(david2Dir){
							case 0: david2.setRotation(0); break;
							case 1: david2.setRotation(Math.PI * 0.5); break;
							case 2: david2.setRotation(Math.PI * 1); break;
							case 3: david2.setRotation(Math.PI * 1.5); break;
						};
						david2.setAnimation('idle1');
						turnDavid2.stop();
						davidTurning = false;
						if(script == 'script'){
							scriptPos++;
							runScript();
						}else if(script == 'userFunct'){
							userFunctPos++;
							runUserFunction(2)
						}else if(script == 'david1'){
							return true;
						}else if(script == 'david2'){
							david2Pos++;
							runDavid2();
						}
					}
				}, layers.level);	
				turnDavid2.start();
		};
		
	//	
	//Functions to check for David's Collisions.
	//
		function collisionCheck(david, collideObject){
			var davidX = david.getPosition().x;
			var davidY = david.getPosition().y;

			var margin = (collideObject.getWidth() * 0.48); 
			var oX = collideObject.getPosition().x + margin;
			var oY = collideObject.getPosition().y + margin;
			var oRight = oX + (collideObject.getWidth() - (margin * 2));
			var oBottom = oY + (collideObject.getHeight()  - (margin * 2));
			
			var margin = ((allH/lvl.width)* -0.8);
			if(davidX > oX && davidX < oRight && davidY > oY && davidY < oBottom){
				//David has collided with collideObject
				return 1;		
			}else {
				return 0;
			}
		};
		function offscreen(david){
			var adjust = (scale * 20);
		
			var dX = david.getPosition().x;
			var dY = david.getPosition().y;
			var dRight = dX + david.getWidth();
			var dBottom = dY + david.getHeight();

			var oX = intW + adjust;
			var oY = 0;
			var oRight = oX + lvlW - 2*adjust;
			var oBottom = lvlH;
				
			if(dX > oX && dX < oRight && dY > oY && dY < oBottom){
				return 1;
			}else {
				return 0;
			}
		}
	//
	//Animations for special ends.
	//
		function david1End(){
			//Plays when David 6 encounters David 1
			ind.remove();
			sendSwitch('on');
			sendGroup.setListening(false); //Turn off event listenign for the send button.
			send = true;
			davidAni.setAnimation('idle1')
			setTimeout(function(){	
				var newDeg = ((davidDir + 1) * (Math.PI / 2));
				var angularSpeed = Math.PI / 3;
				davidAni.setAnimation('forward1');
				var turnDavid = new Kinetic.Animation(function(frame) {
					var angleDiff = frame.timeDiff * angularSpeed / 1000;
					if (davidAni.getRotation() < newDeg){
						davidAni.rotate(angleDiff);
					}else {
						//Stops david at the end of the movement
						davidAni.setRotation(0);
						davidAni.setAnimation('idle1');
						turnDavid.stop();
						setTimeout(function(){davidForwardEnd();}, 600);						
					}
				}, layers.level);
				turnDavid.start();	
			}, 600);
			
			function davidForwardEnd(){
				davidAni.setAnimation('forward1');
				newPos = (davidAni.getPosition().x + (0.2*(allH/lvl.width)))
				var forwardEnd = new Kinetic.Animation(function(frame) {	
					if (davidAni.getPosition().x < newPos){
						davidAni.move((allH/lvl.width)/100, 0);
					}else{
						//Stops david at the end of the movement
						davidAni.setAnimation('idle1');
						forwardEnd.stop();
						setTimeout(function(){davidFlashEnd('david1');}, 600);	
					}
				}, layers.level);
				forwardEnd.start()
			}
			
		};
		
		function davidFlashEnd(ending){
			davidFlashImage = new Image();
			davidFlashImage.src = 'images/idleSprite2.png';
			var davidFlash = new Kinetic.Animation(function(frame) {	
				//console.log(frame);
				if(frame.time < 1000){
					if(frame.time % 220 < 110){
						davidAni.setImage(davidFlashImage);
					}else if(frame.time % 220 >= 110){
						davidAni.setImage(davidIdleSprite);
					}
				}else{
					//Stops david at the end of the movement
					davidFlash.stop();
					davidAni.setImage(davidIdleSprite);
					addFunctSeq(ending);
					davidAni.setAnimation('idle1');
					forwardAnimation.stop();
				}
			}, layers.level);
			davidFlash.start()
		}
		
		var addFunctCutImg = new Image();
		addFunctCutImg.src = 'images/addFunct.png';
		
		var addFunctCutImg2 = new Image();
		addFunctCutImg2.src = 'images/addFunct2.png';
		
		var addFunctAni = {
			start:[
				{x: 0, y: 0, width: 576, height: 324}
			],
			middle:[
				{x: 0, y: (324*1), width: 576, height: 324},
				{x: 0, y: (324*2), width: 576, height: 324},
				{x: 0, y: (324*3), width: 576, height: 324},
				{x: 0, y: (324*4), width: 576, height: 324},
				{x: 0, y: (324*5), width: 576, height: 324},
				{x: 0, y: (324*6), width: 576, height: 324},
			],
			end:[
				{x: 0, y: (324*7), width: 576, height: 324},
			]};
			
		function addFunctSeq(ending){
			// Cut scene, adding function to David.
			if(ending == 'david1'){
				addFunct = new Kinetic.Sprite({
					x: 0,
					y: 0,
					scaleX: allW/576,
					scaleY: allH/324,
					image: addFunctCutImg,
					animation: 'start',
					animations: addFunctAni,
					frameRate: 8
				});
				layers.cut.add(addFunct);
				addFunct.start();
				setTimeout(function(){
					addFunct.setAnimation('middle');
					addFunct.afterFrame(5, function() {
						addFunct.setAnimation('end');
						setTimeout(function(){
							layers.cut.destroyChildren();
							tutContain();
							tutMessage('Well Done!\nDavid 6 has collected the script card from David 1, you\'ll be able to use it as a function action.');
							engineer(1, 1);
							endButtons('success');
						}, 1200);
					});
				}, 1200);
			}else if(ending == 'david2'){
				addFunct2 = new Kinetic.Sprite({
					x: 0,
					y: 0,
					scaleX: allW/576,
					scaleY: allH/324,
					image: addFunctCutImg2,
					animation: 'start',
					animations: addFunctAni,
					frameRate: 8
				});
				layers.cut.add(addFunct2);
				addFunct2.start();
				setTimeout(function(){
					addFunct2.setAnimation('middle');
					addFunct2.afterFrame(5, function() {
						addFunct2.setAnimation('end');
						setTimeout(function(){
							layers.cut.destroyChildren();
							david2AnimationPos++;
							david2EndAni(david2AnimationPos)
						}, 1200);
					});
				}, 1200);
			}
		}
		var david2AnimationPos = 0;
		function david2End(){
			//Plays when David 6 encounters David 2
			ind.remove();
			sendSwitch('on');
			sendGroup.setListening(false); //Turn off event listening for the send button.
			send = true;
			davidAni.setAnimation('idle1')
			david2EndAni(david2AnimationPos)
		}
		function david2EndAni(pos){
			switch(pos){
				case 0:
					if(davidDir == 2){
						davidTurn('right', 1, 'david2AniPos')
					}else if(davidDir == 0){
						davidTurn('right', 1, 'david2AniPos')
					}
				break;
				case 1: davidMove('forward', 0.2, 'david2AniPos'); break;
				case 2:	
					davidMove('forward', 1, 'david2AniPos');
					david2Move('forward', 1, 'david2AniPos');
				break;
				case 3:	
					davidMove('backward', 0.2, 'david2AniPos');
				break;
				case 4:
					setTimeout(function(){davidFlashEnd('david2');}, 600);
				break;
				case 5:
					david2Move('forward', 2, 'david2AniPos');
					setTimeout(function(){davidMove('forward', 2, 'david2AniPos');}, 1200);
				break;
				case 6:
					tutContain();
					tutMessage('Awesome!\n\nDavid 2 has cleared a path. Let\'s move to the next section.');
					engineer(1, 1);
					endButtons('success');
					davidAni.setAnimation('idle1');
					forwardAnimation.stop();
					davidForward = false;
					listening(true);
					sendGroup.setListening(true);
				break;
			}
		}
		
	//
	//
	//	LEVELS
	//
	//	I should replace these arrays with a custom class called 'level'. Will do this when I can be bothered.
			
		//Level 0 - Lander - Learn Forward	
			var level00 = {
				title: 'Section 00\nLanding Zone',
				description: 'Use a \'FD\' block to move David 6 away from the lander.',
				width: 5,
				tiles: [
					"d0","d0","d0","d0","d0",
					"w2","d0","w3","d0","e0",
					"d0","d0","d0","d0","d0",
					"d0","d0","d0","d0","d0",
					"d0","d0","d0","d0","d0"
					],
				start: [3, 1, 0],						//Coordinates for the block that David starts in for this level. X, Y, Direction
				slots: 1,								//How many active slots.
				tutorial: [true, 0],					//Tut Pos. 
				endDir: 1,								//Direction of endpoint.
				endPos: [4, 1],							//Position of endpoint.
				blocks: [true, false, false, false],	//Block array. Base, Function1, loop
				special: [true, 'lander'],				//If david gets up on the lander. Naughty David.	
				id: 'level00',							//ID
				sound: [track1a, trackOver1a, 9.16],		// Sound track.
				overview: 'images/level00.gif'			//Overview path file
			}
			
		//Level 1 - Moss Creep - Keep off the grass.
			var level01 = {
				title: 'Section 01\nMoss Creep',
				description: 'Look out for the moss-like substance covering the planet surface.',
				width: 5,							//Level tile width and height. 
				tiles: [
					"d0","d0","b7","b3","b3",
					"d0","d0","d0","d0","e0",
					"d0","d0","d0","g8","g1",
					"d0","d0","g8","g0","g0",
					"d0","g8","g0","g0","g0"
					],
				id: 'level01',
				start: [0, 1, 0],					//Coordinates for the block that David starts in for this level. X, Y, Direction
				slots: 1,							//How many active slots.
				tutorial: [true, 1],				//Tut Pos. 	
				endDir: 1,							//Direction of endpoint.
				endPos: [4, 1],						//Position of endpoint.
				overview: 'images/level01.gif',		//Overview path file
				blocks: [true, false, false, false],		//Block array. Base, Function1, loop
				sound: [track1b, trackOver1b, 9.16],
				special: [false]
			}
		//Level 2 - Hook it - Learn to turn.
			var level02 = {
				title: 'Section 02\nHook it',
				description: 'Use the turn blocks to get David 6 around the corner.',
				width: 5,							//Level tile width and height. 
				tiles: [
					"b3","b6","e0","g4","g0",
					"d0","d0","d0","g4","g0",
					"g1","g1","g1","g0","g0",
					"g0","g0","g0","g0","g0",
					"g0","g0","g0","g0","g0"
					],
				id: 'level02',
				start: [0, 1, 0],					//Coordinates for the block that David starts in for this level.
				slots: 4,							//How many active slots.
				tutorial: [true, 2],				//Tutorial Array to display.
				endDir: 0,							//Direction of endpoint.
				endPos: [2, 0],						//Position of endpoint.
				overview: 'images/level02.gif',		//Overview path file
				sound: [track2a, trackOver2a, 6.52],		// Sound track.
				special: [false],
				blocks: [true, false, false, false]		//Block array. Base, Function1, loop
			}
		//Level 3 - Zigging and a little Zagging
			var level03 = {
				title: 'Section 03\nZig-Zag',
				description: 'This section has a more complex turn.',			
				width: 5,						//Level tile width and height. 
				tiles: [
					"b0","b0","b2","e0","g4",
					"b0","w4","b6","d0","g4",
					"b0","b2","d0","d0","g4",
					"b0","b2","d0","g8","g0",
					"b0","b2","d0","g4","g0"
					],
				id: 'level03',
				start: [2, 4, 3],					//Coordinates for the block that David starts in for this level. X, Y, Direction
				slots: 6,							//How many active slots.
				tutorial: [false, null],			//Tutorial Array to display
				overview: 'images/level03.gif',		//Overview path file
				endDir: 0,							//Direction of endpoint.
				endPos: [3, 0],						//Position of endpoint.
				sound: [track4a, trackOver4a, 6.88],		// Sound track.
				special: [false],
				blocks: [true, false, false, false]		//Block array. Base, Function1, loop
			}
		//Level 4 - David 1 - gain a function
			var level04 = {
				title: 'Section 04\nDavid 1',
				description: 'Discover the old David 1 model and recover his function upgrade.',
				width: 5,					//Level tile width and height. 
				tiles: [
					"b2","e0","w1","g3","g0",
					"b2","d0","d0","d0","g4",
					"b2","d0","d0","d0","g4",
					"b0","b1","b5","d0","g4",
					"b0","b0","b2","d0","g4",
					"b0","b0","b2","d0","g4"
					],
				id: 'level04',
				start: [3, 4, 3],				//Coordinates for the block that David starts in for this level. X, Y, Direction
				slots: 6,						//How many active slots.
				tutorial: [true, 3],			//Tutorial Array to display
				overview: 'images/level04.gif',		//Overview path file
				endDir: 0,						//Direction of endpoint.
				endPos: [1, 0],						//Position of endpoint.
				blocks: [true, false, false, false],	//Block array. Base, Function1, loop
				sound: [track2b, trackOver2b, 6.52],		// Sound track.
				special: [true, 'david1']		//Alternate ending
			}
		//Level 5 - Learn functions
			var level05 = {
				title: 'Section 05\nNew block',
				description: 'Use the function from David 1 by filling it with blocks.',
				width: 5,						//Level tile width and height. 
				tiles: [
					"b0","b3","b3","b3","b3",
					"b2","d0","d0","d0","e0",
					"b2","d0","h0","d0","g8",
					"b2","d0","g4","g1","g0",
					"b2","d0","g4","g0","g0"
					],
				id: 'level05',
				start: [1, 4, 3],				//Coordinates for the block that David starts in for this level.
				slots: 2,						//How many active slots.
				tutorial: [true, 4],			//Tutorial Array to display
				overview: 'images/level05.gif',		//Overview path file
				endDir: 1,						//Direction of endpoint.
				endPos: [4, 1],						//Position of endpoint.
				sound: [track2c, trackOver2c, 6.52],		// Sound track.
				special: [false],
				blocks: [true, true, false, false]		//Block array. Base, Function1, loop, david2
			}
		//Level 6 - Force function use	
			var level06 = {
				title: 'Section 06\nFork',
				description: 'The function block can be used to send more blocks to David 6 than the 6 script slots.',
				width: 5,						//Level tile width and height. 
				tiles: [
					"b0","b3","b6","e0","g4",
					"b2","d0","d0","d0","g4",
					"b6","d0","h6","h1","g0",
					"d0","d0","d0","d0","g4",
					"g1","g1","g1","g1","g0"
					],
				id: 'level06',
				start: [0, 3, 0],				//Coordinates for the block that David starts in for this level.
				slots: 6,						//How many active slots.
				overview: 'images/level06.gif',	//Overview path file
				endDir: 0,						//Direction of endpoint.
				endPos: [3, 0],					//Position of endpoint.
				sound: [track1c, trackOver1c, 9.16],		// Sound track.
				special: [false],
				tutorial: [false, null],		//Tutorial Array to display
				blocks: [true, true, false, false]		//Block array. Base, Function1, loop
			}
		//Level 7 - Sand	
			var level07 = {
				title: 'Section 07\nSand man',
				description: 'Approach the sand from the other direction to drive straight through to the end.',
				width: 5,						//Level tile width and height. 
				tiles: [
					"b0","b3","b3","b3","b0",
					"b2","d0","d0","d0","b4",
					"b2","d0","h4","d0","b7",
					"b2","d0","d0","s0","e0",
					"b0","b1","b5","d0","g8"
					],
				id: 'level07',
				start: [3, 4, 3],						//Coordinates for the block that David starts in for this level.
				slots: 6,								//How many active slots.
				overview: 'images/level07.gif',			//Overview path file
				endDir: 1,								//Direction of endpoint.
				endPos: [4, 3],							//Position of endpoint.
				sound: [track4b, trackOver4b, 6.69],	// Sound track.
				special: [false],
				tutorial: [true, 7],		//Tutorial Array to display
				blocks: [true, true, false, false]		//Block array. Base, Function1, loop
			}
		//Level 8 - FunFunFunction, use the function to loop.
			var level08 = {
				title: 'Section 08\nStaircase',
				description: 'Place mutliple function blocks to make it through the section',
				width: 7,							//Level tile width and height. 
				tiles: [
					"d0","d0","b4","b0","b6","e0","g4",
					"b1","b1","b0","b6","d0","d0","g4",
					"b0","b0","b6","d0","d0","g8","g0",
					"b0","b6","d0","d0","g8","g3","g3",
					"b6","d0","d0","g8","g6","d0","d0",
					"d0","d0","g8","g2","d0","h0","d0",
					"g1","g1","g0","g2","d0","g4","g1"
					],
				id: 'level08',
				start: [0, 5, 0],					//Coordinates for the block that David starts in for this level.
				slots: 6,							//How many active slots.
				overview: 'images/level08.gif',		//Overview path file
				tutorial: [true, 6],				//Tutorial Array to display
				endDir: 0,							//Direction of endpoint.
				endDir2: 1,							//Direction of second endpoint.
				endPos: [5, 0],						//Position of endpoint.
				sound: [track1b, trackOver1b, 9.16],		// Sound track.
				special: [false],
				blocks: [true, true, false, false]		//Block array. Base, Function1, loop
			}
		//Level 9 - Loop-de-loop.
			var level09 = {
				title: 'Section 09\nLoop-de-loop',
				description: '',
				width: 6,							//Level tile width and height. 
				tiles: [
					"b0","b0","b0","b3","b3","b3",
					"b0","b0","b2","d0","d0","e0",
					"b0","b3","b6","d0","h6","g1",
					"b2","d0","d0","s0","d0","g4",
					"b2","d0","h0","d0","d0","g4",
					"b2","d0","g4","g1","g1","g0"
					],
				id: 'level09',
				start: [1, 5, 3],					//Coordinates for the block that David starts in for this level.
				slots: 6,							//How many active slots.
				overview: 'images/level09.gif',		//Overview path file
				tutorial: [false, null],			//Tutorial Array to display
				endDir: 1,							//Direction of endpoint.
				endPos: [5, 1],						//Position of endpoint.
				sound: [track4c, trackOver4c, 6.69],		// Sound track.
				special: [false],
				blocks: [true, true, false, false]			//Block array. Base, Function1, loop
			}
			
		//Level 10 - Spring water
			var level10 = {
				title: 'Section 10\nSpring water',
				description: 'There\'s evidence of water here. We\'ll need to collect a sample at some point',
				width: 7,						//Level tile width and height. 
				tiles: [
					"e0","d0","d0","g7","g3","g0","g0",
					"b1","b5","d0","d0","d0","g4","g0",
					"b3","w5","n2","d0","d0","g4","g0",
					"d0","n3","d0","d0","d0","g4","g0",
					"d0","n5","d0","g8","g1","g0","g0",
					"d0","d0","d0","g4","g0","g0","g0",
					"g1","g1","g1","g0","g0","g0","g0"
					],
				id: 'level10',
				start: [0, 3, 0],					//Coordinates for the block that David starts in for this level.
				slots: 6,							//How many active slots.
				overview: 'images/level10.gif',		//Overview path file
				tutorial: [false, null],			//Tutorial Array to display
				endDir: 3,							//Direction of endpoint.
				sound: [track3a, trackOver3b, 5.29],		// Sound track.
				endPos: [0, 0],						//Position of endpoint.
				special: [false],
				blocks: [true, true, false, false]		//Block array. Base, Function1, loop
			}
		//Level 11 - Sandy
			var level11 = {
				title: 'Section 11\nDesert\'s Edge',
				description: 'This area is much sandier than before, plan your route carefully.',
				width: 5,
				tiles: [
					"g2","s0","g7","g3","g3",
					"g6","d0","s0","d0","s0",
					"s0","s0","h0","s0","h6",
					"e0","d0","h5","d0","s0",
					"s0","s0","s0","s0","b8"
					],
				start: [4, 3, 2],					//Coordinates for the block that David starts in for this level. X, Y, Direction
				slots: 6,							//How many active slots.
				tutorial: [false, null],			//Tut Pos. 
				endDir: 3,							//Direction of endpoint.
				endPos: [0, 3],						//Position of endpoint.
				blocks: [true, true, false, true],	//Block array. Base, Function1, loop
				special: [false, 'lander'],			//If david gets up on the lander. Naughty David.	
				id: 'level00',						//ID
				sound: [track4b, trackOver4c, 6.69],		// Sound track.
				david2: false,
				david2Start: [0, 1, 0],
				overview: 'images/level11.gif'		//Overview path file
			}
		//Level 12 - The Rescue, Pull David 2 from the sand.
			var level12 = {
				title: 'Section 12\nThe Rescue',
				description: 'Recover the old David 2 from the sand and he\'ll help you through the section.',
				width: 5,
				tiles: [
					"g3","g3","e2","g3","g0",
					"s0","s0","d0","d0","g4",
					"s0","s0","s0","d0","g7",
					"s0","s0","e0","d0","d0",
					"s0","s0","s0","s0","b8"
					],
				start: [4, 3, 2],					//Coordinates for the block that David starts in for this level. X, Y, Direction
				slots: 6,							//How many active slots.
				tutorial: [true, 8],				//Tut Pos. 
				endDir: 0,							//Direction of endpoint.
				endPos: [2, 0],						//Position of endpoint.
				blocks: [true, true, false, false],	//Block array. Base, Function1, loop
				special: [true, 'david2'],			//If david gets up on the lander. Naughty David.	
				id: 'level00',						//ID
				sound: [track4b, trackOver4c, 6.69],		// Sound track.
				david2: true,
				david2Start: [2, 2, 3],
				overview: 'images/level12.gif'		//Overview path file
			}
		//Level 13 - Yard work. Clear away some moss.
			var level13 = {
				title: 'Section 13\nYard work',
				description: 'Use David 2\'s moss clearing ability to clear David 6\'s path to the end.',
				width: 5,
				tiles: [
					"s0","s0","e0","s0","s0",
					"h1","h1","h1","g1","g1",
					"s0","s0","s0","g4","g0",
					"d0","d0","h6","g3","g3",
					"s0","s0","s0","s0","s0"
					],
				start: [2, 4, 3],					//Coordinates for the block that David starts in for this level. X, Y, Direction
				slots: 6,							//How many active slots.
				tutorial: [true, 9],				//Tut Pos. 
				endDir: 0,							//Direction of endpoint.
				endPos: [2, 0],						//Position of endpoint.
				blocks: [true, true, false, true],	//Block array. Base, Function1, loop
				special: [false, 'lander'],			//If david gets up on the lander. Naughty David.	
				id: 'level00',						//ID
				sound: [track4d, trackOver4e, 6.69],		// Sound track.
				david2: true,
				david2Start: [0, 3, 0],
				overview: 'images/level13.gif'		//Overview path file
			}
			
			
	//
	//
	//	Drawing The Game, Creating the canvas.
	//
	//				

	//Function to create game
	function drawAll(){
		//Function to draw the stage.
			stage = new Kinetic.Stage({
					container: DavidSix,
					width: (allH * 1.8),
					height: allH
				});
		
		levelArray = new Array(level00, level01, level02, level03, level04, level05, level06, level07, level08, level09, level10, level11, level12, level13);	
		
		for(var i = 0; i < levelArray.length; i++){
			new overLevel(levelArray[i].id, levelArray[i].endDir, levelArray[i].endPos, levelArray[i].start, levelArray[i].overview, levelArray[i].width);
		}
		
		if(levelArray[currentLevel] == null || levelArray[currentLevel] == undefined || levelArray[currentLevel] == ""){
			currentLevel = 0;
			lvl = levelArray[currentLevel];
		}else{
			lvl = levelArray[currentLevel];
		}
		if(cutOn == true){
			drawStart();
		}else{
			levelDraw(levelArray[currentLevel]);
			intDraw();
		}	
			
		if(mute == true){
			muteAll();
		}
			
		layer_names.forEach(function(layer_name) {
			stage.add(layers[layer_name]);
		});
		
		// Image Smoothing, context reference.
		c0 = layers['level'].getCanvas().getElement();
		var ctxt0 = c0.getContext('2d');
			ctxt0.mozImageSmoothingEnabled = false;			//Prevent aliasing and keep the pixel look.
			ctxt0.imageSmoothingEnabled = false;
			ctxt0.webkitImageSmoothingEnabled = false;
	
		c1 = layers['intFace'].getCanvas().getElement();
		var ctxt1 = c1.getContext('2d');
			ctxt1.mozImageSmoothingEnabled = false;			//Prevent aliasing and keep the pixel look.
			ctxt1.imageSmoothingEnabled = false;
			ctxt1.webkitImageSmoothingEnabled = false;
			
		c2 = layers['tut'].getCanvas().getElement();
		var ctxt2 = c2.getContext('2d');
			ctxt2.mozImageSmoothingEnabled = false;			//Prevent aliasing and keep the pixel look.
			ctxt2.imageSmoothingEnabled = false;
			ctxt2.webkitImageSmoothingEnabled = false;
			
		c3 = layers['cut'].getCanvas().getElement();
		var ctxt3 = c3.getContext('2d');
			ctxt3.mozImageSmoothingEnabled = false;			//Prevent aliasing and keep the pixel look.
			ctxt3.imageSmoothingEnabled = false;
			ctxt3.webkitImageSmoothingEnabled = false;
		
		c4 = layers['menu'].getCanvas().getElement();
		var ctxt4 = c4.getContext('2d');
			ctxt4.mozImageSmoothingEnabled = false;			//Prevent aliasing and keep the pixel look.
			ctxt4.imageSmoothingEnabled = false;
			ctxt4.webkitImageSmoothingEnabled = false;
	}
	
	if(preloadON == false){
		console.log('Ignoring preload');
		drawAll();
	}

};
