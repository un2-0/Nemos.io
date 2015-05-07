var contentContainer;
var notification;
var	sender = new HttpAPI();
var temp;
baseUrl = "/apis/SmartVote";
window.onload(init());


function init() {
	
	contentContainer = document.getElementById("contentContainer");
	
	notification = document.createElement("h3");	

	loadInformation();

}


function loadInformation(){
	//window.alert("initialing");

	//window.alert(sessionStorage.userName);
	
	if(LoginAs() == "organiser"){
		document.getElementById("welcomer").innerHTML = "<span class='glyphicon glyphicon-user padding-right-small' style='position: relative; top: 3px;'></span>"+"Organiser: "+ sessionStorage.userName +"<i class='fa fa-caret-down'></i>";
		
	
	}else if(LoginAs() == "voter"){
		
		document.getElementById("welcomer").innerHTML = "<span class='glyphicon glyphicon-user padding-right-small' style='position: relative; top: 3px;'></span>"+"Voter: "+ sessionStorage.userName+" <i class='fa fa-caret-down'></i>";
		document.getElementById("createPoll").style.display="none";
	
	}else{
		document.getElementById("welcomer").innerHTML = "<span class='glyphicon glyphicon-user padding-right-small' style='position: relative; top: 3px;'></span>"+"Not login" +" <i class='fa fa-caret-down'></i>";
		document.getElementById("changeFirstPassword").style.display="none";
		document.getElementById("showPolls").style.display="none";
		document.getElementById("createPoll").style.display="none";
	}
	
	
	
}



function showPolls(){	
	
	contentContainer.innerHTML = "";	
	
	showPollList();
	
}



function createPoll(){
	
	contentContainer.innerHTML = "";
	
	loadPollModuleSelection();

	
}







function jumpToLogin() {
	
	window.location.href = "../../index.html";
	
	sessionStorage.userName = "";
	sessionStorage.identity = "";
	
	
}

//The scripts below were from UserHome.html
$(function() {
	$(".knob").knob();
});

$(function() {
	var uls = $('.sidebar-nav > ul > *').clone();
	uls.addClass('visible-xs');
	$('#main-menu').append(uls.clone());
});

$("[rel=tooltip]").tooltip();
$(function() {
	$('.demo-cancel-click').click(function() {
		return false;
	});
});

$(function() {
	var match = document.cookie.match(new RegExp('color=([^;]+)'));
	if (match)
		var color = match[1];
	if (color) {
		$('body').removeClass(function(index, css) {
			return (css.match(/\btheme-\S+/g) || []).join(' ')
		})
		$('body').addClass('theme-' + color);
	}

	$('[data-popover="true"]').popover({
		html : true
	});

});




