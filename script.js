window.onload = function(){

	var proj_link
	var proj_li
	var close_svg

	function setElements(){
		proj_link = document.getElementById("project-link");
		proj_li = document.getElementById("proj-li");
		close_svg = document.getElementById("close-svg");
		proj_link.onclick = openProject;
		close_svg.onclick = closeProject;
	}
	

	function openProject() {
		console.log('open')
		document.body.className = "menu-open";
		proj_li.className = "link-open";
	}

	function closeProject() {
		console.log('close')
		document.body.className = "";
		proj_li.className = "";
	}



	setElements();
	//console.log('text')
}

