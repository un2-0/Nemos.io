
function jumpToLogin() {
	window.location.href = "../../index.html";
}

/*
 * this method has not been tested yet, probably need to delete "form" tag in
 * the html file and to use other reliable tags.
 */

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

//not been tested yet.
function checkForm(form)
{
	var re;
  if(form.username.value == "") {
    alert("Error: Username cannot be blank!");
    form.username.focus();
    return false;
  }
  
  re = /^\w+$/;
  if(!re.test(form.username.value)) {
    alert("Error: Username must contain only letters, numbers and underscores!");
    form.username.focus();
    return false;
  }

  if(form.pwd1.value != "" && form.pwd1.value == form.pwd2.value) {
    if(form.pwd1.value.length < 6) {
      alert("Error: Password must contain at least six characters!");
      form.pwd1.focus();
      return false;
    }
    if(form.pwd1.value == form.username.value) {
      alert("Error: Password must be different from Username!");
      form.pwd1.focus();
      return false;
    }
    re = /[0-9]/;
    if(!re.test(form.pwd1.value)) {
      alert("Error: password must contain at least one number (0-9)!");
      form.pwd1.focus();
      return false;
    }
    re = /[a-z]/;
    if(!re.test(form.pwd1.value)) {
      alert("Error: password must contain at least one lowercase letter (a-z)!");
      form.pwd1.focus();
      return false;
    }
    re = /[A-Z]/;
    if(!re.test(form.pwd1.value)) {
      alert("Error: password must contain at least one uppercase letter (A-Z)!");
      form.pwd1.focus();
      return false;
    }
  } else {
    alert("Error: Please check that you've entered and confirmed your password!");
    form.pwd1.focus();
    return false;
  }

  alert("You entered a valid password: " + form.pwd1.value);
  return true;
}
