
function jumpToLogin() {
	window.location.href = "../LogIn/index.html";
}

/*this method has not been tested yet, probably need to delete
"form" tag in the html file and to use other reliable tags.*/

function matchPassword() {
	if (document.getElementById("password1")!= document.getElementByID("password2")) { 
		alert("Your passwords do not match. Please try again."); 
		document.getElementById("password2").focus(); 
		return false; 
		} 
	else
		return true; 
		}
}

