window.onload = function(){

	codeButtons = document.getElementsByClassName('codeButton');	
	if(codeButtons != null && codeButtons != undefined){
		for (var i in codeButtons) {
			codeButtons[i].onclick = function() {
				 if(this.nextSibling.nextSibling.style.display == 'block'){
					$(this).next().slideUp("slow");
					this.innerHTML='MORE';
				}else{
					$(this).next().slideDown("slow");
					this.innerHTML='LESS';
				}
			}
		}
	}
	
 	moreButtons = document.getElementsByClassName('moreButton');
	if(moreButtons != null && moreButtons != undefined){
		for (var i in moreButtons) {
			moreButtons[i].onclick = function() {
				 if(this.nextSibling.nextSibling.style.display == 'block'){
					$(this).next().slideUp("slow");
					this.innerHTML='details';
				}else{
					$(this).next().slideDown("slow");
					this.innerHTML='LESS';
				}
			}
		}
	}
	
	statButtons = document.getElementsByClassName('statButton');
	if(statButtons != null && statButtons != undefined){
		for (var i in statButtons) {
			statButtons[i].onclick = function() {
				if(this.nextSibling.nextSibling.style.display == 'block'){
					$(this).next().slideUp("slow");

				}else{
					$(this).next().slideDown("slow");
				}
			}
		}
	}
	
	playButton = document.getElementsByClassName('playButton');	
	if(playButton != null && playButton != undefined){
		for (var i in playButton) {
			playButton[i].onclick = function() {
				document.getElementById('DavidSix').style.display='block';
				document.getElementById('exit').style.display='block';
				startGame();
			}
		}
	}
	
	nextButton = document.getElementsByClassName('nextButton');	
	if(nextButton != null && nextButton != undefined){
		for (var i in nextButton) {
			nextButton[i].onclick = function() {
				var where = document.getElementsByClassName(this.id)[0].offsetTop;
				$('#wrap').animate({
					scrollTop: where
				}, 1400);
			}
		}
	}
	
	
	$(".briefButton").click(function() {
		var where = document.getElementById('Brief').offsetTop;
		if(document.getElementById('wrap').scrollTop > 0){
			var where = 0;
		}
		$('#wrap').animate({
			scrollTop: where
		}, 1400);
	});
	
	exitButton = document.getElementsByClassName('exitButton');	
	if(exitButton != null && exitButton != undefined){
		for (var i in exitButton) {
			exitButton[i].onclick = function() {
				location.reload();
			}
		}
	}
	
	$('.rightArrow').click(function(){
		var pos = parseInt(document.getElementById('tileImage').style.left);
		var width = document.getElementById('tileImage').offsetWidth;
		var tile = 127;
		if(pos > -width + tile){
			var string = "" + (pos-tile) + "px"
			document.getElementById('tileImage').style.left = string; 
		}
	});
	$('.leftArrow').click(function(){
		var pos = parseInt(document.getElementById('tileImage').style.left);
		var width = document.getElementById('tileImage').offsetWidth;
		var tile = 127;
		if(pos < 0){
			var string = "" + (pos+tile) + "px"
			document.getElementById('tileImage').style.left = string; 
		}
		
	});
	$('.rotate').click(function(){
		var pos = parseInt(document.getElementById('tileImage').style.top);
		var height = document.getElementById('tileImage').offsetHeight;
		var tile = height/4;
		if(pos <= 0 && pos >= -(tile*2)){
			var string = "" + (pos-tile) + "px"
			document.getElementById('tileImage').style.top = string; 
		}else{
			document.getElementById('tileImage').style.top = 0;
		}
	});
	
	$('.editTile li').click(function(){
		var id = $(this).attr('id')
		document.getElementById('tileImage').src = 'images/'+id+'.png';
		console.log('images/'+id+'.png');
		document.getElementById('tileImage').style.left = 0; 
	});
	
	$('.sectButton').click(function(){
		$('.newSect').slideToggle("slow");
	});
	
	$('.createButton').click(function(){
		$('.missionButton').css({'background-color':'#ffffff', 'color':'#131522'});
		$('.createButton').css({'background-color':'#131522', 'color':'#ffffff'});
		$('.missHold').animate({
			left: '-666.66666px'
		}, 800);
	});
	$('.missionButton').click(function(){
		$('.createButton').css({'background-color':'#ffffff', 'color':'#131522'});
		$('.missionButton').css({'background-color':'#131522', 'color':'#ffffff'});
		$('.missHold').animate({
			left: '0'
		}, 800);
	});
	$('.publish').click(function(){
		$('#publishBox').slideDown("slow");
		$(this).hide();
	});
	
	//Parallaxing
	wrap = document.getElementById('wrap');
	wrap.onscroll = function() {
		var scroll = wrap.scrollTop;
		if(document.getElementById('landerImg')){document.getElementById('landerImg').style.top = (scroll * 0.5) + 'px';}
		if(document.getElementById('satImg')){document.getElementById('satImg').style.top = ((scroll * 0.5)-(document.body.offsetHeight*1.24)) + 'px';}
	}

}
	
	
	