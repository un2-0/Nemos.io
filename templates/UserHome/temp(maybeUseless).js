
	function checkSecondIDPassword(selectedPollName) {
		
		contentContainer.innerHTML = "";
		
		var secondIDPasswordReceiver = document.createElement("FORM");
		secondIDPasswordReceiver.id = "secondIDPasswordReceiver";
		secondIDPasswordReceiver.setAttribute("onsubmit","return false;");
		
		var secondIDPasswordContainer = document.createElement("FIELDSET");
		secondIDPasswordContainer.id = "secondIDPasswordContainer";
		
		var secondIDPasswordContainerLabel = document.createElement("LEGEND");
		secondIDPasswordContainerLabel.id = "secondIDPasswordContainerLabel";
		secondIDPasswordContainerLabel.innerHTML = "Please enter your second account and password to vote";

		
		var secondId = document.createElement("input");
		secondId.id = "secondId";
		secondId.setAttribute("type", "text");
		secondId.required = true;
		
		var secondIdLabel = document.createElement("label");
		secondIdLabel.innerHTML = "Second account Id:      ";
		secondIdLabel.setAttribute("for", "secondId");
		
		var secondPassword = document.createElement("input");
		secondPassword.id = "secondPassword";
		secondPassword.setAttribute("type", "password");
		secondPassword.required = true;
		
		var secondPasswordLabel = document.createElement("label");
		secondPasswordLabel.innerHTML = "Second account password: ";
		secondPasswordLabel.setAttribute("for", "secondPasswordLabel");
		
		var submitBtn = document.createElement("input");
		submitBtn.id = "submitBtn";
		submitBtn.value = "login to vote";
		submitBtn.setAttribute("type", "submit");

		
		
		contentContainer.appendChild(secondIDPasswordReceiver);
		
		secondIDPasswordReceiver.appendChild(secondIDPasswordContainer);
		
		secondIDPasswordContainer.appendChild(secondIDPasswordContainerLabel);
		
		secondIDPasswordContainer.appendChild(secondIdLabel);
		secondIDPasswordContainer.appendChild(secondId);
		
		secondIDPasswordContainer.appendChild(document.createElement("BR"));
		
		secondIDPasswordContainer.appendChild(secondPasswordLabel);
		secondIDPasswordContainer.appendChild(secondPassword);
		
		secondIDPasswordContainer.appendChild(document.createElement("BR"));
		secondIDPasswordContainer.appendChild(document.createElement("BR"));
		
		secondIDPasswordContainer.appendChild(submitBtn);
		
		
		contentContainer.appendChild(document.createElement("BR"));
		
		
		secondIDPasswordReceiver.addEventListener("submit", function() {

			/*Data in "checkVoterSecondIdPassword":
			 * 		"username": the first account id of the voter
			 * 		"secondId": the second account id of the voter
			 * 		"secondPassword"	the second account password ofthe voter
		 	 * 		"selectedPollName": the poll name that user chose to look at
			 * 
			 * 
			 *Data should be in response of the request: 
			 *			"result": the result of the operation, could be:
			 *						"success" -- 
			 *						"userDoesntExist" -- the second account id is not in the voter list of the poll
			 						"wrongPassWord" -- the second account password is the not correct password of the second account id 
			
			 * */
			
			/*
			  var secondIDPassword =
			  {"username":sessionStorage.username,"secondId":secondId.value,"secondPassword":secondPassword.value,"selectedPollName":selectedPollName};
			  
			  sender.sendAsync("POST", baseUrl+ "/checkVoterSecondIdPassword",
			  JSON.stringify(secondIDPassword), function(res){
			  
			  if (res.status == 200) { console.log(res); var body = res.response;
			  
			  body = JSON.parse(body);
			 */
			//for local test
			var body = {
				"result" : "success"
			};

			if (body.result == "success") {

				voting(secondId.value,selectedPollName);

			} else if (body.result == "userDoesntExist") {

				window.alert("Sorry, the second account id does not exist");
				secondIDPasswordReceiver.reset();

			} else if (body.result == "wrongPassWord") {

				window.alert("Sorry, the second account password is wrong");
				secondIDPasswordReceiver.reset();

			} else {

				window.alert("bad response");
			}

			/*
			  } else { window.alert("failed to login"); }
			  
			  });
			  */
			 

		});
		
		

	}