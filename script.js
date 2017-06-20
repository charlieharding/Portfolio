window.onload = function(){

	var proj_wrap, con_wrap, proj_link, con_link, proj_li, con_li, proj_close_svg, con_close_svg;
	var apollo_hov, drive_hov, david_hov, cod_hov;
	var drive_trigger, david_trigger, cod_trigger, apollo_trigger, drive_home, david_home, cod_home, apollo_home, bigtext_wrap;
	var hover_list = [];

	function setElements(){
		//Main nav
		proj_link = document.getElementById("project-link");
		proj_wrap = document.getElementById("project-wrap");
		proj_li = document.getElementById("proj-li");	
		proj_close_svg = document.getElementById("project-close-svg");
		proj_link.onclick = openProject;
		proj_close_svg.onclick = closeProject;
		con_link = document.getElementById("contact-link");
		con_wrap = document.getElementById("contact-wrap");
		con_li = document.getElementById("con-li");
		con_close_svg = document.getElementById("contact-close-svg");
		con_link.onclick = openContact;
		con_close_svg.onclick = closeProject;

		//Homepage hovers
		drive_trigger = {
			anchor: document.getElementById("drive-trigger"),
			class_replace: 'drive-show'
		}
		david_trigger = {
			anchor: document.getElementById("david-trigger"),
			class_replace: 'david-show'
		}
		cod_trigger = {
			anchor: document.getElementById("cod-trigger"),
			class_replace: 'cod-show'
		}
		apollo_trigger = {
			anchor: document.getElementById("apollo-trigger"),
			class_replace: 'apollo-show'
		}
		drive_home = document.getElementById("drive-home");
		david_home = document.getElementById("david-home");
		cod_home = document.getElementById("cod-home");
		apollo_home = document.getElementById("apollo-home");
		description = document.getElementById("description");
		bigtext_wrap = document.getElementById("bigtext-wrap");
		//drive_trigger = document.getElementById("drive-trigger");

		drive_trigger.anchor.addEventListener("mouseenter", function(event){
			home_hover(drive_trigger, true);
		});
		drive_trigger.anchor.addEventListener("mouseout", function(event){
			home_hover(drive_trigger, false);
		});

		david_trigger.anchor.addEventListener("mouseenter", function(event){
			home_hover(david_trigger, true);
		});
		david_trigger.anchor.addEventListener("mouseout", function(event){
			home_hover(david_trigger, false);
		});

		cod_trigger.anchor.addEventListener("mouseenter", function(event){
			home_hover(cod_trigger, true);
		});
		cod_trigger.anchor.addEventListener("mouseout", function(event){
			home_hover(cod_trigger, false);
		});

		apollo_trigger.anchor.addEventListener("mouseenter", function(event){
			home_hover(apollo_trigger, true);
		});
		apollo_trigger.anchor.addEventListener("mouseout", function(event){
			home_hover(apollo_trigger, false);
		});

		//Footer hovers
		apollo_hov = document.getElementById("apollo-hov");
		drive_hov = document.getElementById("drive-hov");
		david_hov = document.getElementById("david-hov");
		cod_hov = document.getElementById("cod-hov");
		hover_list.push(apollo_hov, drive_hov, david_hov, cod_hov);

		apollo_hov.addEventListener("mouseenter", function(event){
			hover(apollo_hov, true);
		});
		apollo_hov.addEventListener("mouseout", function(event){
			hover(apollo_hov, false);
		});

		drive_hov.addEventListener("mouseenter", function(event){
			hover(drive_hov, true);
		});
		drive_hov.addEventListener("mouseout", function(event){
			hover(drive_hov, false);
		});

		david_hov.addEventListener("mouseenter", function(event){
			hover(david_hov, true);
		});
		david_hov.addEventListener("mouseout", function(event){
			hover(david_hov, false);
		});

		cod_hov.addEventListener("mouseenter", function(event){
			hover(cod_hov, true);
		});
		cod_hov.addEventListener("mouseout", function(event){
			hover(cod_hov, false);
		});
	}

	function openProject() {
		document.body.className = "menu-open";
		proj_wrap.className = "proj-wrap-open wrap";
		if(con_wrap.className == "con-wrap-open wrap"){con_wrap.className = "con-wrap-close wrap";}
		proj_li.className = "link-open";
		con_li.className = "";
	}

	function openContact() {
		document.body.className = "menu-open";
		con_wrap.className = "con-wrap-open wrap";
		if(proj_wrap.className == "proj-wrap-open wrap"){proj_wrap.className = "proj-wrap-close wrap";}
		con_li.className = "link-open";
		proj_li.className = "";
	}

	function closeProject() {
		document.body.className = "menu-close";
		if(proj_wrap.className == "proj-wrap-open wrap"){proj_wrap.className = "proj-wrap-close wrap";}
		if(con_wrap.className == "con-wrap-open wrap"){con_wrap.className = "con-wrap-close wrap";}
		proj_li.className = "";
		con_li.className = "";
	}

	function hover(el, x){
		//el.parentElement.className = 'hov-on';
		for(i=0; i < hover_list.length; i++){
			if(x){
				if(el != hover_list[i]){
					hover_list[i].className = 'hov-on';
				}
			}else{
				hover_list[i].className = '';
			}
		}
	}

	function home_hover(el, x){
		//el.parentElement.className = 'hov-on';
		if(x){
			el.anchor.className = 'triggered';
			bigtext_wrap.className = 'home-hov-on';
			description.className = el.class_replace + ' ' + 'wrap hide-sub';
		}else{
			el.anchor.className = '';
			bigtext_wrap.className = '';
			description.className = 're-hide wrap';
		}
	}


	setElements();
	//console.log('text')
}

