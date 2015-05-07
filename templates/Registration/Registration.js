//window.onload;










































/*
 * this method has not been tested yet, probably need to delete "form" tag in
 * the html file and to use other reliable tags.
 * could be deleted once the checkFrom method finished
 */

/*
function matchPassword() {
	if (document.getElementById("password1")!= document.getElementByID("password2")) { 
		alert("Your passwords do not match. Please try again."); 
		document.getElementById("password2").focus(); 
		return false; 
		}
	else
		return true; 
		}

function checkForm(form)
{
	//var re;
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

  if(form.passwordone.value != "" && form.passwordone.value == form.passwordtwo.value) {
    if(form.passwordone.value.length < 6) {
      alert("Error: Password must contain at least six characters!");
      form.passwordone.focus();
      return false;
    }
    if(form.passwordone.value == form.username.value) {
      alert("Error: Password must be different from Username!");
      form.password1.focus();
      return false;
    }
    re = /[0-9]/;
    if(!re.test(form.password1.value)) {
      alert("Error: password must contain at least one number (0-9)!");
      form.password1.focus();
      return false;
    }
    re = /[a-z]/;
    if(!re.test(form.passwordone.value)) {
      alert("Error: password must contain at least one lowercase letter (a-z)!");
      form.passwordone.focus();
      return false;
    }
    re = /[A-Z]/;
    if(!re.test(form.passwordone.value)) {
      alert("Error: password must contain at least one uppercase letter (A-Z)!");
      form.passwordone.focus();
      return false;
    }
  } else {
    alert("Error: Please check that you've entered and confirmed your password!");
    form.passwordone.focus();
    return false;
  }

  alert("You entered a valid password: " + form.passwordone.value);
  return true;
}
*/

function jumpToLogin() {

		
		window.location.href = "../../index.html";	
		
}