window.onload = function(){

	var proj_wrap, con_wrap, proj_link, con_link, proj_li, con_li, proj_close_svg, con_close_svg
	var apollo_hov, drive_hov, david_hov, cod_hov; 

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

		//Footer hovers
		apollo_hov = document.getElementById("apollo-hov");
		drive_hov = document.getElementById("drive-hov");
		david_hov = document.getElementById("david-hov");
		cod_hov = document.getElementById("cod-hov");

		apollo_hov.addEventListener("mouseenter", function(event){
			hoverIn(apollo_hov);
		});
		apollo_hov.addEventListener("mouseout", function(event){
			hoverOut(apollo_hov);
		});

		drive_hov.addEventListener("mouseenter", function(event){
			hoverIn(drive_hov);
		});
		drive_hov.addEventListener("mouseout", function(event){
			hoverOut(drive_hov);
		});

		david_hov.addEventListener("mouseenter", function(event){
			hoverIn(david_hov);
		});
		david_hov.addEventListener("mouseout", function(event){
			hoverOut(david_hov);
		});

		cod_hov.addEventListener("mouseenter", function(event){
			hoverIn(cod_hov);
		});
		cod_hov.addEventListener("mouseout", function(event){
			hoverOut(cod_hov);
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
		proj_wrap.className = "proj-wrap-close wrap";
		con_wrap.className = "con-wrap-close wrap";
		proj_li.className = "";
		con_li.className = "";
	}

	function hoverIn(el){
		el.parentElement.className = 'hov-on';
	}

	function hoverOut(el){
		el.parentElement.className = '';
	}

	setElements();
	//console.log('text')
}

