var contentContainer;
var temp1;
var temp2;
var temp3;
var temp4;

var pollsObjs = [];

window.onload = init;


function init() {
	contentContainer = document.getElementById("contentContainer");
}

function showDefaultContent() {
	contentContainer.innerHTML = '<div class="header">			<div class="stats">				<p class="stat">					<span class="label label-info">5</span> Invitations				</p>				<p class="stat">					<span class="label label-success">27</span> On-going Polls				</p>				<p class="stat">					<span class="label label-danger">15</span> Overdue/Expired Polls				</p>			</div>			<h1 class="page-title">Dashboard</h1>			<ul class="breadcrumb">				<li><a href="index.html">Home</a></li>				<li class="active">Dashboard</li>			</ul>		</div>		<div class="main-content" id = "mainContentContainer">			<div class="panel panel-default">				<a href="#page-stats" class="panel-heading" data-toggle="collapse">Latest					Stats</a>				<div id="page-stats" class="panel-collapse panel-body collapse in">					<div class="row">						<div class="col-md-3 col-sm-6">							<div class="knob-container">								<input class="knob" data-width="200" data-min="0"									data-max="3000" data-displayPrevious="true" value="2500"									data-fgColor="#92A3C2" data-readOnly=true;>								<h3 class="text-muted text-center">Related Poll lists</h3>							</div>						</div>						<div class="col-md-3 col-sm-6">							<div class="knob-container">								<input class="knob" data-width="200" data-min="0"									data-max="4500" data-displayPrevious="true" value="3299"									data-fgColor="#92A3C2" data-readOnly=true;>								<h3 class="text-muted text-center">Polls You can									Participate in</h3>							</div>						</div>						<div class="col-md-3 col-sm-6">							<div class="knob-container">								<input class="knob" data-width="200" data-min="0"									data-max="2700" data-displayPrevious="true" value="1840"									data-fgColor="#92A3C2" data-readOnly=true;>								<h3 class="text-muted text-center">Pending Polls</h3>							</div>						</div>						<div class="col-md-3 col-sm-6">							<div class="knob-container">								<input class="knob" data-width="200" data-min="0"									data-max="15000" data-displayPrevious="true" value="10067"									data-fgColor="#92A3C2" data-readOnly=true;>								<h3 class="text-muted text-center">Completed Polls</h3>							</div>						</div>					</div>				</div>			</div>			<div class="row">				<div class="col-sm-6 col-md-6">					<div class="panel panel-default">						<div class="panel-heading no-collapse">							Not Collapsible<span class="label label-warning">+10</span>						</div>						<table class="table table-bordered table-striped">							<thead>								<tr>									<th>First Name</th>									<th>Last Name</th>									<th>Username</th>								</tr>							</thead>							<tbody>								<tr>									<td>Mark</td>									<td>Tompson</td>									<td>the_mark7</td>								</tr>								<tr>									<td>Ashley</td>									<td>Jacobs</td>									<td>ash11927</td>								</tr>								<tr>									<td>Audrey</td>									<td>Ann</td>									<td>audann84</td>								</tr>								<tr>									<td>John</td>									<td>Robinson</td>									<td>jr5527</td>								</tr>								<tr>									<td>Aaron</td>									<td>Butler</td>									<td>aaron_butler</td>								</tr>								<tr>									<td>Chris</td>									<td>Albert</td>									<td>cab79</td>								</tr>							</tbody>						</table>					</div>				</div>				<div class="col-sm-6 col-md-6">					<div class="panel panel-default">						<a href="#widget1container" class="panel-heading"							data-toggle="collapse">Collapsible </a>						<div id="widget1container" class="panel-body collapse in">							<h2>Heres a Tip</h2>							<p>								This template was developed with <a									href="http://middlemanapp.com/" target="_blank">Middleman</a>								and includes .erb layouts and views.							</p>							<p>All of the views you see here (sign in, sign up, users,								etc) are already split up so you dont have to waste your time								doing it yourself!</p>							<p>The layout.erb file includes the header, footer, and side								navigation and all of the views are broken out into their own								files.</p>							<p>If you arent using Ruby, there is also a set of plain								HTML files for each page, just like you would expect.</p>						</div>					</div>				</div>			</div>			<div class="row">				<div class="col-sm-6 col-md-6">					<div class="panel panel-default">						<div class="panel-heading no-collapse">							<span class="panel-icon pull-right"> <a href="#"								class="demo-cancel-click" rel="tooltip" title="Click to refresh"><i									class="fa fa-refresh"></i></a>							</span> Needed to Close						</div>						<table class="table list">							<tbody>								<tr>									<td><a href="#"><p class="title">Care Hospital</p></a>										<p class="info">Sales Rating: 86%</p></td>									<td>										<p>Date: 7/19/2012</p> <a href="#">View Transaction</a>									</td>									<td>										<p class="text-danger h3 pull-right" style="margin-top: 12px;">$20,500</p>									</td>								</tr>								<tr>									<td><a href="#"><p class="title">Custom Eyesight</p></a>										<p class="info">Sales Rating: 58%</p></td>									<td>										<p>Date: 7/19/2012</p> <a href="#">View Transaction</a>									</td>									<td>										<p class="text-danger h3 pull-right" style="margin-top: 12px;">$12,600</p>									</td>								</tr>								<tr>									<td><a href="#"><p class="title">Clear Dental</p></a>										<p class="info">Sales Rating: 76%</p></td>									<td>										<p>Date: 7/19/2012</p> <a href="#">View Transaction</a>									</td>									<td>										<p class="text-danger h3 pull-right" style="margin-top: 12px;">$2,500</p>									</td>								</tr>								<tr>									<td><a href="#"><p class="title">Safe Insurance</p></a>										<p class="info">Sales Rating: 82%</p></td>									<td>										<p>Date: 7/19/2012</p> <a href="#">View Transaction</a>									</td>									<td>										<p class="text-danger h3 pull-right" style="margin-top: 12px;">$22,400</p>									</td>								</tr>							</tbody>						</table>					</div>				</div>				<div class="col-sm-6 col-md-6">					<div class="panel panel-default">						<a href="#widget2container" class="panel-heading"							data-toggle="collapse">Collapsible </a>						<div id="widget2container" class="panel-body collapse in">							<h2>Built with Less</h2>							<p>The CSS is built with Less. There is a compiled version								included if you prefer plain CSS.</p>							<p>Fava bean jícama seakale beetroot courgette shallot								amaranth pea garbanzo carrot radicchio peanut leek pea sprouts								arugula brussels sprout green bean. Spring onion broccoli								chicory shallot winter purslane pumpkin gumbo cabbage squash								beet greens lettuce celery. Gram zucchini swiss chard mustard								burdock radish brussels sprout groundnut. Asparagus horseradish								beet greens broccoli brussels.</p>							<p>								<a class="btn btn-primary">Learn more »</a>							</p>						</div>					</div>				</div>			</div>		</div>';
}

function LoginAs() {
	
	if(sessionStorage.username != "" && sessionStorage.username != null && sessionStorage.identity !="" && sessionStorage.identity != null){
		if(sessionStorage.identity == "organiser"){
			return "organiser";
			
		} else if(sessionStorage.identity == "voter"){
			return "voter";
		} else{
			return false;
		}
		
		
	}else{
		return false;
	}
	
}

function loadPollModuleSelection() {
	
	var pollDetailContainer = document.createElement("DIV");
	pollDetailContainer.id = "pollDetailContainer";
	
	
	var moduleSelectionContainer = document.createElement("FORM");
	moduleSelectionContainer.id = "moduleSelectionContainer";
	
	var moduleSelectionContainerLabel = document.createElement("LABEL");
	moduleSelectionContainerLabel.setAttribute("for", "moduleSelectionContainer");
	moduleSelectionContainerLabel.innerHTML = "Please select a poll module: ";
	
	var selectPollModules = document.createElement("SELECT");
	selectPollModules.id = "selectPollModules";
	selectPollModules.name = "selectPollModules";
	
	var module1 = document.createElement("OPTION");
	module1.id = "module 1";
	module1.value = "module1";
	module1.innerHTML = "module 1";
	
	var module2 = document.createElement("OPTION");
	module2.id = "module 2";
	module2.value = "module2";
	module2.innerHTML = "module 2";
	
	contentContainer.appendChild(pollDetailContainer);
	
	pollDetailContainer.appendChild(document.createElement("BR"));
	pollDetailContainer.appendChild(moduleSelectionContainerLabel);
	pollDetailContainer.appendChild(document.createElement("BR"));
	pollDetailContainer.appendChild(moduleSelectionContainer);
	
	moduleSelectionContainer.appendChild(selectPollModules);
	
	
	pollDetailContainer.appendChild(document.createElement("BR"));
	var moduleLoader = document.createElement("DIV");
	moduleLoader.id = "moduleLoader";
	pollDetailContainer.appendChild(moduleLoader);
	
	
	selectPollModules.appendChild(module1);
	selectPollModules.appendChild(module2);
	
	
	module1.selected = true;
	module1Creation(moduleLoader);
	
	selectPollModules.addEventListener("change",function(){
		if(module1.selected){
			module1Creation(moduleLoader);
		}else if (module2.selected){
			module2Creation(moduleLoader);
		}
		
	});
	
	
}



function showPollList() {
	
	contentContainer.innerHTML = "";
	
	if (LoginAs() != false) {
		
		/*Data in request "showPollList" "body":
		 * 		"identity": voter?organiser?
		 * 		"username": the first account id
		 *
		 *Data that should be in response for "showPollList" request: 
		 * 		"result": the result of the request,"success" or "fail"
		 * 		
		 * 		"pollslist": an array that contains all the poll names of the user
		 * 						each slot in array should contain a poll name string.
		 *
		 * */
		
		/*
		var username = {"identity":sessionStorage.identity,"username":sessionStorage.username};
		
		sender.sendAsync("POST", baseUrl+ "/showPollList", JSON.stringify(username), function(res){
			
			if (res.status == 200) {
				console.log(res);
				var body = res.response;	
				
				body = JSON.parse(body);*/
			
				 // local test
				var	body = {"result":"success"
						
						,"pollslist":["aaaaa","bbbbbb","ccccc","dddddd","eeeeeee"]
					                     };
				
				
				if (body.result == "success") {
					
					var pollsList = document.createElement("ul");
					pollsList.id = "pollsList";
					
					contentContainer.appendChild(pollsList);
					
					for (var i = 0; i < body.pollslist.length; i++) {
						
						var singlePoll = document.createElement("li");
						singlePoll.id = "singlePoll" + i;
						
						var singlePollLink = document.createElement("a");
						singlePollLink.id = "singlePollLink" + i;
						
						singlePollLink.innerHTML = body.pollslist[i];
						
						pollsList.appendChild(singlePoll);
						
						singlePoll.appendChild(singlePollLink);
						
						pollsList.appendChild(document.createElement("br"));
					}
					
					
					pollsList.addEventListener("click",function(event){
						
						if (event.target !== event.currentTarget) {
							
							if(event.target.tagName == "A"){
					        loadBasicPollInformation(event.target.innerHTML);
							}
					    }
						
						event.stopPropagation();
						
					});
					
					
					
					
				} else {
					
					window.alert("bad response");
				}
				
		   /*     
		    } else {
				window.alert("failed to get polls list");
			}
			*/
	/*		
		});
		*/
		
	} else {
		contentContainer.appendChild(document.createTextNode("Not account logged in, fail to display polls list"));
	}
	
}




function loadBasicPollInformation(selectedPollName) {
	
		contentContainer.innerHTML = "";
		
		var currentDate = new Date();
		
		var selectedPollNameJSON = {"selectedPollName":selectedPollName};
		
		/*Data in "showPollBasicInfo":
		 * 		"selectedPollName": the poll name that user chose to look at
		 * 			
		 * 
		 * 
		 *Data should be in response of the request: 
		 *			"result":
		 *			"pollBasicInfo": 
		 *							an object that carries: 
		 *							"pollName" -- the poll name
		 *							"organizerName" -- the creator of the poll
		 *							"openTime" -- the openTime of the poll. ps: in form of the number of how many millisecond since 1970 jan 1st 00:00 in string
		 *							"closeTime" -- close Time
		 *							"pollDes" -- the description of the poll 
		
		 * */
		
		
		/*
		sender.sendAsync("POST", baseUrl+ "/showPollBasicInfo", JSON.stringify(selectedPollNameJSON), function(res){
			
			if (res.status == 200) {
				console.log(res);
				var body = res.response;	
				
				body = JSON.parse(body);
			*/
				 // local test
				var	body = {"result":"success"
						
						,"pollBasicInfo":{"pollName": selectedPollName, 
							"organizerName": "bbb",
							"openTime": new Date().getTime().toString(),
							"closeTime": "2130841353650",
							"pollDes": "cccc"}
				};
				
				
			if (body.result == "success") {
					
				
				var biContainer = document.createElement("div");
				
				var basicInfo = document.createElement("form");
				
				
				var pollName = document.createElement("output");
				pollName.id = "pollName";
				
				pollName.value = body.pollBasicInfo.pollName;
				
				var labelPN = document.createElement("label");
				labelPN.innerHTML = "Poll Name:  ";
				labelPN.setAttribute("for", "pollName");
				
				
				var organizerName = document.createElement("output");
				organizerName.id = "organizerName";
				
				organizerName.value = body.pollBasicInfo.organizerName;
				
				var labelON = document.createElement("label");
				labelON.innerHTML = "Oraniser Name(creator):  ";
				labelON.setAttribute("for", "organizerName");
				
				
				var openTime = document.createElement("output");
				openTime.id = "openTime";
				
				openTime.value = new Date(Number(body.pollBasicInfo.openTime)).toString();
				
				
				var labelOT = document.createElement("label");
				labelOT.innerHTML = "Open Time:  ";
				labelOT.setAttribute("for", "openTime");

				
				var closeTime = document.createElement("output");
				closeTime.id = "closeTime";
				
				closeTime.value = new Date(Number(body.pollBasicInfo.closeTime)).toString();
				
				var labelCT = document.createElement("label");
				labelCT.innerHTML = "Close Time:  ";
				labelCT.setAttribute("for", "closeTime");

				
				var pollDes = document.createElement("output");
				pollDes.id = "pollDes";
				pollDes.style.wordWrap = "break-word";
				
				pollDes.value = body.pollBasicInfo.pollDes;
				
				var labelDes = document.createElement("label");
				labelDes.innerHTML = "Poll Description:  ";
				labelDes.setAttribute("for", "pollDes");
				
				var nextBtn = document.createElement("BUTTON");
				nextBtn.id = "nextBtn";
				
				var OTDate = new Date(openTime.value);
				var CTDate = new Date(closeTime.value);
				
				
				if (CTDate > currentDate) {
					
					if(sessionStorage.identity == "voter"){
						nextBtn.innerHTML = "participate in the poll";	
						
					}else if(sessionStorage.identity == "organiser"){
						
						nextBtn.innerHTML = "please wait for the poll ends to see the result";
						nextBtn.disabled = true;
					}
				
				} else {
					nextBtn.innerHTML = "see the result";
					
				}
				
				
				contentContainer.appendChild(biContainer);
				biContainer.appendChild(basicInfo);
				
				
				//labelPN.insertBefore(document.createTextNode("Poll Name: "), pollName);
				
				basicInfo.appendChild(labelON);
				basicInfo.appendChild(document.createElement("br"));
				basicInfo.appendChild(organizerName);
				
				basicInfo.appendChild(document.createElement("br"));
				basicInfo.appendChild(document.createElement("br"));
				
				basicInfo.appendChild(labelPN);
				basicInfo.appendChild(document.createElement("br"));
				basicInfo.appendChild(pollName);
				
				basicInfo.appendChild(document.createElement("br"));
				basicInfo.appendChild(document.createElement("br"));
				
				
				
				basicInfo.appendChild(labelOT);
				basicInfo.appendChild(document.createElement("br"));
				basicInfo.appendChild(openTime);
				
				basicInfo.appendChild(document.createElement("br"));
				basicInfo.appendChild(document.createElement("br"));
				
				basicInfo.appendChild(labelCT);
				basicInfo.appendChild(document.createElement("br"));
				basicInfo.appendChild(closeTime);
				
				basicInfo.appendChild(document.createElement("br"));
				basicInfo.appendChild(document.createElement("br"));
				
				basicInfo.appendChild(labelDes);
				basicInfo.appendChild(document.createElement("br"));
				basicInfo.appendChild(pollDes);
				
				basicInfo.appendChild(document.createElement("br"));
				basicInfo.appendChild(document.createElement("br"));	
				
				contentContainer.appendChild(nextBtn);
				
				
				
				nextBtn.addEventListener("click",function(){
					
				
					if (CTDate > currentDate) {
						if(sessionStorage.identity == "voter"){
						
						checkVoterSecondAccount(selectedPollName);
							
							
						}else if(sessionStorage.identity == "organiser"){
							
						}
						
					} else {
					
						showResult(selectedPollName);
					}
					
					
					
				});
				
				
		
			}else{
				
				window.alert("failed to get poll basic information");
				}
			
	/*	
		
	}else{
	
			window.alert("failed to get poll basic information");
		
	}
	
		});	*/
}

/**
 * Check if the voter has already get the second account.
 * If not, then generate a username-password pair as the second pair
 * @param selectedPollName
 */
function checkVoterSecondAccount(selectedPollName) {
	
		/*Data in "checkVoterSecondAccount":
		 * 		"username": the first account id of the voter
	 	 * 		"selectedPollName": the poll name that user chose to look at
		 * 			

		 *Data should be in response of the request: 
		 *			"result": the result of the operation, could be:
		 *						"secondPasswordSet" -- the voter has already retreived the random second account Id and password
		 *						"secondPasswordNotSet" -- the voter did not get the random second account id and password
		 						"voterNotInList" -- the voter are not eligible to vote in this poll
	
		 * */	
	
	/*	
	var checkInfo = {"username": sessionStorage.username,"pollName": selectedPollName};
	
	sender.sendAsync("POST", baseUrl+"/checkVoterSecondAccount", JSON.stringify(checkInfo), function(res){
	
		if (res.status == 200) {
			console.log(res);
			var body = res.response;
			
			body = JSON.parse(body);
		*/
	
			var	body = {"result":"secondPasswordSet"};

			
			if (body.result == "secondPasswordSet") {
				
				checkSecondIDPassword(selectedPollName);
				
				
			} else if (body.result == "secondPasswordNotSet") {
				
				window.alert("You have not got your randomly assigned second account ID and Password, generating one for you.");
				
				getSecondIDPassword(selectedPollName);
				
			} else if (body.result == "voterNotInList"){
				
				window.alert("Sorry, you are not eligible to participate in this poll");
				
				window.location.reload();
				
			} else {
				
				window.alert("bad response");
			}
	  /*      
	    } else {
			window.alert("failed to login to the poll");
		}
		
		
	});
	*/
}

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

	
	
	var changeSecondIdPaBtn = document.createElement("BUTTON");
	changeSecondIdPaBtn.id = "changeSecondIdPaBtn";
	changeSecondIdPaBtn.innerHTML = "change second account password";

		
	
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
	contentContainer.appendChild(changeSecondIdPaBtn);

	
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
	
	
	
	changeSecondIdPaBtn.addEventListener("click",function(){
		
		
		
		if(secondId.value != "" && secondId.value != null){
			
			if(secondPassword.value != "" && secondPassword.value != null)
			{
			
				//same request as above
			/*	
				var secondIDPassword =
				  {"username":sessionStorage.username,"secondId":secondId,value,"secondPassword":secondPassword.value,"selectedPollName":selectedPollName};
				  
				  sender.sendAsync("POST", baseUrl+ "/checkVoterSecondIdPassword",JSON.stringify(secondIDPassword), function(res){
				  
				  if (res.status == 200) {
					  
					  console.log(res); 
					  
					  var body = res.response;
				  
					  body = JSON.parse(body);
				 */ 
					  
						var body = {
							"result" : "success"
						};
				
						if (body.result == "success") {

							changeSecondPassword(secondId.value,selectedPollName);

						} else if (body.result == "userDoesntExist") {

							window.alert("Sorry, the user name does not exist");
							secondIDPasswordReceiver.reset();

						} else if (body.result == "wrongPassWord") {

							window.alert("Sorry, your password is wrong");
							secondIDPasswordReceiver.reset();

						} else {

							window.alert("bad response");
						}
					  
				/*	  
				  
				  } else { window.alert("failed to login"); }
			});
				  
				*/  
				
			}else {
				window.alert("Please enter password");
				secondPassword.scrollIntoView();
			}
			
			
		} else{
			window.alert("Please enter id");
			secondId.scrollIntoView();
			
		}
		
	});

}

function getSecondIDPassword(selectedPollName) {
	
	/*Happend when the voter has not get the initially random second account id and password
	 * Data in "getVoterSecondIdPassword":
	 * 		"username": the first account id of the voter
 	 * 		"selectedPollName": the poll name that user chose to look at
	 * 
	 * 
	 *Data should be in response of the request: 
	 *			"result": the result of the operation.
	 *			"secondIdPassword": {"id": random second account id,"password": random second account password}
	 * 
	 * e.g body = {"result":"success",
		            "secondIdPassword":{"id":"aaaaaaa","password":"bbbbbbb"}
				   };
	 * 
	 * 
	 * */
	
	
	/*
	var voterGetSecondIdPassword = {"username":sessionStorage.username,"selectedPollName":selectedPollName};
	
	sender.sendAsync("POST", baseUrl+ "/getVoterSecondIdPassword", JSON.stringify(voterGetSecondIdPassword), function(res){ 

		if (res.status == 200) {
					console.log(res);
					var body = res.response;
					
					body = JSON.parse(body);
		*/	
	
		//for local test
		var	body = {"result":"success",
		            "secondIdPassword":{"id":"aaaaaaa","password":"bbbbbbb"}
				   };
					
					if (body.result == "success") {
						
						contentContainer.innerHTML = "";
						
						var secondIdPassword = document.createElement("H3");
						secondIdPassword.id = "secondIdPassword";
						
						secondIdPassword.innerHTML = "Second Account Id: "+body.secondIdPassword.id+ "*******Password: "+body.secondIdPassword.password;
						
						
						var backToPollBasicInfo = document.createElement("BUTTON");
						backToPollBasicInfo.id = "backToPollBasicInfo";
						backToPollBasicInfo.innerHTML = "go back";
						
						
						contentContainer.appendChild(secondIdPassword);
						contentContainer.appendChild(document.createElement("BR"));
						contentContainer.appendChild(backToPollBasicInfo);
						
						window.alert("Please keep your assigned ID and Password safely!" +
								"\nWithout it, you can not participate in the poll!");
						
						
						backToPollBasicInfo.addEventListener("click",function(){
							
							loadBasicPollInformation(selectedPollName);
							
						});
						
						
					} else {
						
						window.alert("bad response");
					}
		/*	        
			    } else {
					window.alert("failed to get voter second account Id & Password");
				}

		});
	*/
	
	
	
}

function voting(secondIdValue,selectedPollName) {
	contentContainer.innerHTML = "";
	
	/*Happend when the voter has not get the initially random second account id and password
	 * Data in "getVoterSecondIdPassword":
	 * 
	 * 		"secondId": the second account id of the voter
 	 * 		"selectedPollName": the poll name that user chose to look at
	 * 
	 * 
	 *Data should be in response of the request: 
	 *
	 *			"result":"voterVoted" ? "voterNotVoted"
	 *
	 *			"rulesNum": 
	 *
	 *			"candidates": an array contains all the name and description of all 
	 *
	 * 			"votes": 	exists when the voter has voted previously (with result "voterVoted"), 
	 * 						it should be an array that each slot in it should be "1"(if voter voted for candidate) or "0"(if not)
	 * 						each slot represent a voter. for example votes[0] represent the vote from voter for candidate 1.
	 * 						ps: the length of votes should be equal with the length of candidates					
	 * 
	 * e.g. 3 candidates, one voter can vote for only one candidate
	 *  body = {			"result":"voterNotVoted",
							"rulesNum": "1",
							"candidates": [{"name":"1","canDes":"1"}
							,{"name":"2","canDes":"2"},{"name":"3","canDes":"3"}]
							
					};
	 * 
	 * OR
	 * 	body = {			"result":"voterVoted",
							"rulesNum": "1",
							"candidates": [{"name":"1","canDes":"1"}
							,{"name":"2","canDes":"2"},{"name":"3","canDes":"3"}],
							"votes":["1","0","0"]
							
					};
	 * 	
	 * 
	 * */
	
	
	/*
	var voterVotingInfo = {"secondId": secondIdValue,"selectedPollName":selectedPollName};
	
	sender.sendAsync("POST", baseUrl+ "/getVotingInfo", JSON.stringify(voterVotingInfo), function(res){ 

		
		if (res.status == 200) {
			
					console.log(res);
					var body = res.response;
					
					body = JSON.parse(body);
			*/	
					
					//test
					var body = {
							"result":"voterNotvoted",
							"rulesNum": "1",
							"candidates": [{"name":"1","canDes":"1"}
							,{"name":"2","canDes":"2"},{"name":"3","canDes":"3"}]
							
					};
					
					
						
					var votingContainer = document.createElement("FORM");
					votingContainer.id ="votingContainer";
					votingContainer.setAttribute("onsubmit","return false;");
					
					var votingTable = document.createElement("TABLE");
					votingTable.id = "votingTable";
					
					var rulesDescription = document.createElement("H3");
					rulesDescription.id ="rulesDescription";
					rulesDescription.innerHTML = "In one ballot, You can only vote for "+body.rulesNum+ " candidate(s)/option(s).";
					
					
					var submitBtn = document.createElement("INPUT");
					submitBtn.setAttribute("type","submit");
					submitBtn.value = "submit your ballot";
					
					contentContainer.appendChild(votingContainer);
					
					votingContainer.appendChild(rulesDescription);
					votingContainer.appendChild(document.createElement("BR"));
					
					votingContainer.appendChild(votingTable);
					votingContainer.appendChild(document.createElement("BR"));
					votingContainer.appendChild(submitBtn);
					
					var rowZero = document.createElement("TR");
					rowZero.id = "rowZero";
					
					var tableHead1 = document.createElement("TH");
					tableHead1.innerHTML = "Candidate/Opion Name";
					
					var tableHead2 = document.createElement("TH");
					tableHead2.innerHTML = "Candidate/Opion Description";
					
					var tableHead3 = document.createElement("TH");
					tableHead3.innerHTML = "Vote for Candidate/Opion";
					
					votingTable.appendChild(rowZero);
					
					rowZero.appendChild(tableHead1);
					rowZero.appendChild(tableHead2);
					rowZero.appendChild(tableHead3);
					
					var checkBoxes = [];
					
					for (var i = 0; i < body.candidates.length; i++) {
						
							
							var tempTR = document.createElement("TR");
							
							var canName = document.createElement("TD");
							canName.innerHTML = body.candidates[i].name;
							
							var canDesc = document.createElement("TD");
							canDesc.innerHTML = body.candidates[i].canDes;
							
							var canCB = document.createElement("TD");
							
							var tempCB = document.createElement("INPUT");
							tempCB.setAttribute("type","checkbox");
							tempCB.id = "can"+i+"CB";
							tempCB.value = body.candidates[i].name;
							
							
							votingTable.appendChild(tempTR);
							tempTR.appendChild(canName);
							tempTR.appendChild(canDesc);
							tempTR.appendChild(canCB);
							
							canCB.appendChild(tempCB);
							
							checkBoxes[i] = tempCB;
												
					}
					
					if (body.result == "voterVoted") {
						
						for (var i = 0; i < checkBoxes.length; i++) {
							
							if(body.votes[i] == "1"){
								checkBoxes[i].checked = true;
							}
							
						}
						
					}	
					
					votingContainer.addEventListener("submit",function(){
						
						var count = 0;
						
						for (var i = 0; i < checkBoxes.length; i++) {
							
							if(checkBoxes[i].checked == true){
								count += 1;
							}
							
						}
						
						if(count > Number(body.rulesNum) ){
							
							window.alert("You can only vote for "+body.rulesNum+" candidates/options." +
									"\nPlese recheck your votes.");
							
							rulesDescription.scrollIntoView();
						
						}else{
							
							var ballot = {"secondId":secondIdValue,"selecedPollName":selectedPollName,"votes":[]};
							
							for (var i = 0; i < checkBoxes.length; i++) {
								
								if(checkBoxes[i].checked == true){
									ballot.votes[i] = "1";
								}else {
									ballot.votes[i] = "0";
								}
								
							}
							
							/*Data in "submitVote":
							 * 			"secondId": the voter second account id
							 * 			"selecedPollName": the poll name
							 * 			"votes": array, value in each slot is either "1"(string) or "0"(string). which means the vote for candidate or not
							 * 
							 * Data in response:
							 * 
							 * 			"result": "success" (if all good) or some other string (bad response -- submition failed)
							 * 
							 * */
							
						/*
							sender.sendAsync("POST", baseUrl+ "/submitVote", JSON.stringify(ballot), function(res){ 

								if (res.status == 200) {
											console.log(res);
											var body = res.response;
											
											body1 = JSON.parse(body);
										
											//test
								*/			
											var body1 = {"result":"success"};
											
											if (body1.result == "success") {
												
												window.alert("Your vote has been successfully submited." +
														"\nYou can also login again to change your vote when poll is open");

												window.location.reload();
												
											} else {
												
												window.alert("bad response");
											}
									
									/*	
									    } else {
											window.alert("failed to submit vote");
										}

								});
							*/
							
							
						}
						
					});
			        
		/*	
					
					
			    } else {
			    	
					window.alert("failed to retrieve voting content");
					loadBasicPollInformation(selectedPollName);
				}
			
		});
	
		*/
	
	
}


function showResult(selectedPollName) {
	contentContainer.innerHTML = "";
	
	/*Data in "getResult" request:
	 * 			"selectedPollName": the poll name that has closed and contained result
	 * 
	 * Data in response:
	 * 			"result": "success" (if all good) or some other string (bad response -- no result to provide or something else)
	 * 			
	 * 			"candidates": an array that each slot has an object that contains:
	 * 											"name": candidate name
	 * 											"canDes": the description of the candidate
	 * 											"votes": string, number of vote count of that the candidate gained
	 * 													 
	 * 			"log": array, each slot has an object with:
	 * 							"id": second account id
	 * 							"votes": array, its length equals with length of candidates array. each slot should be "1" or "0".
	 * 	
	 * 
	 * 
	 * e.g.
	 * 		body = {"result": "success",
							"candidates": [{"name":"a","canDes":"a","votes":"4"},
							               {"name":"b","canDes":"b","votes":"2"},
							               {"name":"c","canDes":"c","votes":"4"}],
							"log": [{"id":"aaa","votes":["1","0","1"]},
							        {"id":"bbb","votes":["0","1","1"]},
							        {"id":"ccc","votes":["1","0","1"]},
							        {"id":"ddd","votes":["1","1","0"]},
							        {"id":"fff","votes":["1","0","1"]},
							]
							
							
					};
	 * 
	 * 
	 * 
	 * */
	
	/*
	var pollName = {"selectedPollName":selectedPollName};
	
	sender.sendAsync("POST", baseUrl+ "/getResult", JSON.stringify(pollName), function(res){ 

		if (res.status == 200) {
			
					console.log(res);
					
					var body = res.response;
					
					body = JSON.parse(body);
		*/			
					
					//test
					var body = {"result": "success",
							"candidates": [{"name":"a","canDes":"a","votes":"4"},
							               {"name":"b","canDes":"b","votes":"2"},
							               {"name":"c","canDes":"c","votes":"4"}],
							"log": [{"id":"aaa","votes":["1","0","1"]},
							        {"id":"bbb","votes":["0","1","1"]},
							        {"id":"ccc","votes":["1","0","1"]},
							        {"id":"ddd","votes":["1","1","0"]},
							        {"id":"fff","votes":["1","0","1"]},
							]
							
							
					};
	
	
	
					if (body.result == "success") {
						
						var resultTable = document.createElement("TABLE");
						resultTable.id = "resultTable";
						
						var resultsDescription = document.createElement("H3");
						resultsDescription.id ="resultsDescription";
						resultsDescription.innerHTML = "Final result of "+selectedPollName;
						
						var logTable = document.createElement("TABLE");
						logTable.id = "logTable";
						
						var logDescription = document.createElement("H3");
						logDescription.id ="logDescription";
						logDescription.innerHTML = "Details of votings from all voters";
						
						var goBackBtn = document.createElement("BUTTON");
						goBackBtn.innerHTML = "Go back";
						
						
						
						contentContainer.appendChild(resultsDescription);
						contentContainer.appendChild(document.createElement("BR"));
						contentContainer.appendChild(resultTable);
						
						contentContainer.appendChild(document.createElement("BR"));
						contentContainer.appendChild(document.createElement("BR"));
						
						contentContainer.appendChild(logDescription);
						contentContainer.appendChild(document.createElement("BR"));
						contentContainer.appendChild(logTable);
						
						
						contentContainer.appendChild(goBackBtn);
						
						var rowZero = document.createElement("TR");
						rowZero.id = "rowZero";
						
						var tableHead1 = document.createElement("TH");
						tableHead1.innerHTML = "Candidate/Opion Name";
						
						var tableHead2 = document.createElement("TH");
						tableHead2.innerHTML = "Candidate/Opion Description";
						
						var tableHead3 = document.createElement("TH");
						tableHead3.innerHTML = "Final votes";
						
						resultTable.appendChild(rowZero);
						
						rowZero.appendChild(tableHead1);
						rowZero.appendChild(tableHead2);
						rowZero.appendChild(tableHead3);
						
						for (var i = 0; i < body.candidates.length; i++) {
							
								
								var tempTR = document.createElement("TR");
								
								var canName = document.createElement("TD");
								canName.innerHTML = body.candidates[i].name;
								
								var canDesc = document.createElement("TD");
								canDesc.innerHTML = body.candidates[i].canDes;
								
								var canVotes = document.createElement("TD");
								canVotes.innerHTML = body.candidates[i].votes;
								
								
								resultTable.appendChild(tempTR);
								tempTR.appendChild(canName);
								tempTR.appendChild(canDesc);
								tempTR.appendChild(canVotes);													
						}
						
			//********************************************************************			
						var logRowZero = document.createElement("TR");
						logRowZero.id = "rowZero";
						
						var voterSecondId = document.createElement("TH");
						voterSecondId.innerHTML = "Second Account Id";
						
						logTable.appendChild(logRowZero);
						logRowZero.appendChild(voterSecondId);
						
						var total = [];
						
						for (var i = 0; i < body.candidates.length; i++) {
	
							var canName = document.createElement("TH");
							canName.innerHTML = body.candidates[i].name;	
							
							logRowZero.appendChild(canName);
							
							total[i] = 0;
						}
						
						
						
						for (var i = 0; i < body.log.length; i++) {
							
							var tempTR = document.createElement("TR");
							
							var secondAccountId = document.createElement("TD");
							secondAccountId.innerHTML = body.log[i].id;
							
							logTable.appendChild(tempTR);
							tempTR.appendChild(secondAccountId);
							
							
							for (var j = 0; j < body.log[i].votes.length; j++) {
								
								var voteForCan = document.createElement("TD");
								
								voteForCan.innerHTML = body.log[i].votes[j];
								
								tempTR.appendChild(voteForCan);
								
								if(body.log[i].votes[j] == "1"){
									total[j] += 1;
								}
							}				
						}
						
						var logRowLast = document.createElement("TR");
						logRowLast.id = "logRowLast";
						
						var totalTag = document.createElement("TD");
						totalTag.innerHTML = "Total";
						
						logTable.appendChild(logRowLast);
						logRowLast.appendChild(totalTag);
						
						for (var i = 0; i < total.length; i++) {	
							
							var totalData = document.createElement("TD");
							totalData.innerHTML = total[i];	
							
							logRowLast.appendChild(totalData);
							
							total[i] = 0;
						}
						
						goBackBtn.onclick = function(){window.location.reload()};
						
						
					} else {
						
						window.alert("bad response");
					}
		/*	        
			    } else {
					window.alert("failed to login");
				}

		});
*/
}

function changeFirstPassword() {
	
	contentContainer.innerHTML = "";
	
	var newFirstPasswordReceiver = document.createElement("FORM");
	newFirstPasswordReceiver.id = "newFirstPasswordReceiver";
	newFirstPasswordReceiver.setAttribute("onsubmit","return false;");
	
	var newFirstPasswordContainer = document.createElement("FIELDSET");
	newFirstPasswordContainer.id = "newFirstPasswordContainer";
	
	var newFirstPasswordContainerLabel = document.createElement("LEGEND");
	newFirstPasswordContainerLabel.id = "newFirstPasswordContainerLabel";
	newFirstPasswordContainerLabel.innerHTML = "Please enter new first password:";
	
	var newFirstPassword1 = document.createElement("INPUT");
	newFirstPassword1.id = "newFirstPassword1";
	newFirstPassword1.setAttribute("type", "password");
	newFirstPassword1.required = true;
	
	var newFirstPassword1Label = document.createElement("LABEL");
	newFirstPassword1Label.innerHTML = "Enter your new password: ";
	newFirstPassword1Label.setAttribute("for", "newFirstPassword1Label");
	
	var newFirstPassword2 = document.createElement("INPUT");
	newFirstPassword2.id = "newFirstPassword2";
	newFirstPassword2.setAttribute("type", "password");
	newFirstPassword2.required = true;
	
	var newFirstPassword2Label = document.createElement("LABEL");
	newFirstPassword2Label.innerHTML = "Plese enter again: ";
	newFirstPassword2Label.setAttribute("for", "newFirstPassword2Label");
	
	var submitBtn = document.createElement("INPUT");
	submitBtn.id = "submitBtn";
	submitBtn.value = "Submit";
	submitBtn.setAttribute("type", "submit");
	
	
	contentContainer.appendChild(newFirstPasswordReceiver);
	
	newFirstPasswordReceiver.appendChild(newFirstPasswordContainer);
	
	newFirstPasswordContainer.appendChild(newFirstPasswordContainerLabel);
	
	newFirstPasswordContainer.appendChild(newFirstPassword1Label);
	newFirstPasswordContainer.appendChild(newFirstPassword1);
	
	newFirstPasswordContainer.appendChild(document.createElement("BR"));
	
	newFirstPasswordContainer.appendChild(newFirstPassword2Label);
	newFirstPasswordContainer.appendChild(newFirstPassword2);
	
	newFirstPasswordContainer.appendChild(document.createElement("BR"));
	newFirstPasswordContainer.appendChild(document.createElement("BR"));
	
	newFirstPasswordContainer.appendChild(submitBtn);
	
	newFirstPasswordReceiver.addEventListener("submit",function(){
		
		if (newFirstPassword1.value === newFirstPassword2.value) {
			
			
			/*Data in "changeFirstPassword" request:
			 * 			"username": first account id
			 * 			"newFirstPassword": new first account password
			 * 			
			 * Data in response:
			 * 			"result": "success" or not
		
			 * */
			
			/*
			var newFirstPassword = {"username":sessionStorage.username,"newFirstPassword":newFirstPassword1.value};
			
			sender.sendAsync("POST", baseUrl+ "/changeFirstPassword", JSON.stringify(newFirstPassword), function(res){ 

				if (res.status == 200) {
							console.log(res);
							var body = res.response;
							
							body = JSON.parse(body);
				*/			
							//test
							var body = {"result":"success"};
							
							
							if (body.result == "success") {
								
								window.alert("successfully changed your first password");
								
								jumpToLogin();

								
							} else {
								
								window.alert("bad response");
							}			
			/*				
							
				} else {
					window.alert("failed to change second password");
				}

			});			
							
			*/				
							
							
			
		} else {
			window.alert("Two passwords do not match, please try again.");
			
			newFirstPasswordReceiver.reset();
			
			newFirstPassword1.scrollIntoView();
		
		}
		
		
	});
	
}

function changeSecondPassword(secondId,selectedPollName) {
	contentContainer.innerHTML = "";
	
	var newSecondPasswordReceiver = document.createElement("FORM");
	newSecondPasswordReceiver.id = "newSecondPasswordReceiver";
	newSecondPasswordReceiver.setAttribute("onsubmit","return false;");
	
	var newSecondPasswordContainer = document.createElement("FIELDSET");
	newSecondPasswordContainer.id = "newSecondPasswordContainer";
	
	var newSecondPasswordContainerLabel = document.createElement("LEGEND");
	newSecondPasswordContainerLabel.id = "newSecondPasswordContainerLabel";
	newSecondPasswordContainerLabel.innerHTML = "Please enter new second password:";
	
	var newSecondPassword1 = document.createElement("INPUT");
	newSecondPassword1.id = "newSecondPassword1";
	newSecondPassword1.setAttribute("type", "password");
	newSecondPassword1.required = true;
	
	var newSecondPassword1Label = document.createElement("LABEL");
	newSecondPassword1Label.innerHTML = "Enter your new password: ";
	newSecondPassword1Label.setAttribute("for", "newSecondPassword1");
	
	var newSecondPassword2 = document.createElement("INPUT");
	newSecondPassword2.id = "newSecondPassword2";
	newSecondPassword2.setAttribute("type", "password");
	newSecondPassword2.required = true;
	
	var newSecondPassword2Label = document.createElement("LABEL");
	newSecondPassword2Label.innerHTML = "Plese enter again: ";
	newSecondPassword2Label.setAttribute("for", "newSecondPassword2");
	
	var submitBtn = document.createElement("INPUT");
	submitBtn.id = "submitBtn";
	submitBtn.value = "Submit";
	submitBtn.setAttribute("type", "submit");
	
	
	contentContainer.appendChild(newSecondPasswordReceiver);
	
	newSecondPasswordReceiver.appendChild(newSecondPasswordContainer);
	
	newSecondPasswordContainer.appendChild(newSecondPasswordContainerLabel);
	
	newSecondPasswordContainer.appendChild(newSecondPassword1Label);
	newSecondPasswordContainer.appendChild(newSecondPassword1);
	
	newSecondPasswordContainer.appendChild(document.createElement("BR"));
	
	newSecondPasswordContainer.appendChild(newSecondPassword2Label);
	newSecondPasswordContainer.appendChild(newSecondPassword2);
	
	newSecondPasswordContainer.appendChild(document.createElement("BR"));
	newSecondPasswordContainer.appendChild(document.createElement("BR"));
	
	newSecondPasswordContainer.appendChild(submitBtn);
	
	newSecondPasswordReceiver.addEventListener("submit",function(){
		
		if (newSecondPassword1.value === newSecondPassword2.value) {
			
			/*Data in "changeSecondPassword" request:
			 * 			"username": first account id
			 * 			"secondId": second account id
			 * 			"newSecondPassword": new second account password
			 * 			"selectedPollName": the poll name
			 * 			
			 * Data in response:
			 * 			"result": "success" or not
		
			 * */
			
			/*
			var newSecondPassword = {"username":sessionStorage.username,"secondId":secondId,"newSecondPassword":newSecondPassword1.value,"selectedPollName":selectedPollName};
			
			sender.sendAsync("POST", baseUrl+ "/changeSecondPassword", JSON.stringify(newSecondPassword), function(res){ 

				if (res.status == 200) {
							console.log(res);
							var body = res.response;
							
							body = JSON.parse(body);
				*/			
							//test
							var body = {"result":"success"};
							
							
							if (body.result == "success") {
								
								window.alert("successfully changed your second password");
								
								loadBasicPollInformation(selectedPollName);

								
							} else {
								
								window.alert("bad response");
							}			
			/*				
							
				} else {
					window.alert("failed to change second password");
				}

			});			
							
			*/				
							
							
			
		} else {
			window.alert("Two passwords do not match, please try again.");
			
			newSecondPasswordReceiver.reset();
			
			newSecondPassword1.scrollIntoView();
		
		}
		
		
	});
	
}




//---------------------------------------poll-creation modules----------------------------------------------
function module1Creation(moduleLoader) {
	
	moduleLoader.innerHTML = "";
	
	//window.alert("module 1 selected");
	//moduleLoader.innerHTML = "module 1 load test";
	
	//loadBasicPollInformation(moduleLoader, "create");
	
	var module1Form = document.createElement("form");
	module1Form.id = "module1Form";
	module1Form.setAttribute("onsubmit","return false;");
	
	//-------------------------------------------------------------------------------------
	
	var pollName = document.createElement("input");
	pollName.id = "pollName";
	pollName.setAttribute("type", "text");
	pollName.required = true;
	var labelPN = document.createElement("label");
	labelPN.innerHTML = "Poll Name:  ";
	labelPN.setAttribute("for", "pollName");
	
	var organizerName = document.createElement("output");
	organizerName.id = "organizerName";
	organizerName.value = sessionStorage.username;
	var labelON = document.createElement("label");
	labelON.innerHTML = "Oraniser Name(creator):  ";
	labelON.setAttribute("for", "organizerName");
	
	var openTime = document.createElement("input");
	openTime.id = "openTime";
	openTime.setAttribute("type", "datetime-local");
	openTime.required = true;
	var labelOT = document.createElement("label");
	labelOT.innerHTML = "Open Time:  ";
	labelOT.setAttribute("for", "openTime");

	
	var closeTime = document.createElement("input");
	closeTime.id = "closeTime";
	closeTime.setAttribute("type", "datetime-local");
	closeTime.required = true;
	var labelCT = document.createElement("label");
	labelCT.innerHTML = "Close Time:  ";
	labelCT.setAttribute("for", "closeTime");

	
	var pollDes = document.createElement("textarea");
	pollDes.id = "pollDes";
	pollDes.setAttribute("rows", "10");
	pollDes.setAttribute("cols", "70");
	pollDes.required = true;
	var labelDes = document.createElement("label");
	labelDes.innerHTML = "Poll Description:  ";
	labelDes.setAttribute("for", "pollDes");

	
	//----------------------------------------------------------------------------------------------
	
	var parasContainerLabel = document.createElement("label");
	parasContainerLabel.innerHTML = "Set parameters for module-1 poll:  ";
	
	var voterNum = document.createElement("input");
	voterNum.setAttribute("type","number");
	voterNum.id = "voterNum";
	voterNum.name = "voterNum";
	voterNum.required = true;
	voterNum.setAttribute("min",1);
	voterNum.setAttribute("max",500);
	
	var voterNumLabel = document.createElement("label");
	voterNumLabel.id = "voterNumLabel";
	voterNumLabel.innerHTML = "decide how many voters in this poll <strong>(1~500)</strong>:  ";
	voterNumLabel.setAttribute("for", "voterNum");
	
	
	
	var canoptNum = document.createElement("input");
	canoptNum.setAttribute("type","number");
	canoptNum.id = "canoptNum";
	canoptNum.name = "canoptNum";
	canoptNum.required = true;
	canoptNum.setAttribute("min",1);
	canoptNum.setAttribute("max",50);
	
	var canoptNumLabel = document.createElement("label");
	canoptNumLabel.id = "canoptNumLabel";
	canoptNumLabel.innerHTML = "decide how many candidates/opions in this poll <strong>(1~50)</strong>:  ";
	canoptNumLabel.setAttribute("for", "canoptNum");
	
	
	var rulesNum = document.createElement("input");
	rulesNum.setAttribute("type","number");
	rulesNum.id = "rulesNum";
	rulesNum.name = "rulesNum";
	rulesNum.required = true;
	rulesNum.setAttribute("min",1);
	rulesNum.setAttribute("max",1);

	
	var rulesNumLabel = document.createElement("label");
	rulesNumLabel.id = "rulesNumLabel";
	rulesNumLabel.innerHTML = "decide a voter can vote for how many candidates/options <strong>(must less than or equal with the number of candidates/options)</strong>:  ";
	rulesNumLabel.setAttribute("for", "rulesNum");
		
	
	//----------------------------------------------------------------------------------------------
	

	var canOptContainer = document.createElement("fieldset");
	canOptContainer.id = "canOptContainer";
	
	var canOptContainerLabel = document.createElement("legend");
	canOptContainerLabel.id = "canOptContainerLabel";
	
	var subPollBtn = document.createElement("input");
	 subPollBtn.setAttribute("type","submit");
	 subPollBtn.value = "creat poll";
 
	 
	//---------------------------------------------------------------------------------------------- 
	moduleLoader.appendChild(module1Form);
	
	module1Form.appendChild(labelON);
	module1Form.appendChild(document.createElement("br"));
	module1Form.appendChild(organizerName);
	
	module1Form.appendChild(document.createElement("br"));
	module1Form.appendChild(document.createElement("br"));
	
	
	module1Form.appendChild(labelPN);
	module1Form.appendChild(document.createElement("br"));
	module1Form.appendChild(pollName);
	
	module1Form.appendChild(document.createElement("br"));
	module1Form.appendChild(document.createElement("br"));
	

	module1Form.appendChild(labelOT);
	module1Form.appendChild(document.createElement("br"));
	module1Form.appendChild(openTime);
	
	module1Form.appendChild(document.createElement("br"));
	module1Form.appendChild(document.createElement("br"));
	
	module1Form.appendChild(labelCT);
	module1Form.appendChild(document.createElement("br"));
	module1Form.appendChild(closeTime);
	
	module1Form.appendChild(document.createElement("br"));
	module1Form.appendChild(document.createElement("br"));
	
	module1Form.appendChild(labelDes);
	module1Form.appendChild(document.createElement("br"));
	module1Form.appendChild(pollDes);
	
	module1Form.appendChild(document.createElement("br"));
	module1Form.appendChild(document.createElement("br"));
	
	module1Form.appendChild(parasContainerLabel);
	module1Form.appendChild(document.createElement("br"));
	
	
	module1Form.appendChild(voterNumLabel);
	module1Form.appendChild(document.createElement("br"));
	module1Form.appendChild(voterNum);
	module1Form.appendChild(document.createElement("br"));
	
	
	module1Form.appendChild(canoptNumLabel);
	module1Form.appendChild(document.createElement("br"));
	module1Form.appendChild(canoptNum);
	module1Form.appendChild(document.createElement("br"));
	
	module1Form.appendChild(rulesNumLabel);
	module1Form.appendChild(document.createElement("br"));
	module1Form.appendChild(rulesNum);
	module1Form.appendChild(document.createElement("br"));
	
	module1Form.appendChild(document.createElement("br"));
	module1Form.appendChild(document.createElement("br"));
	
	module1Form.appendChild(canOptContainer);
	canOptContainer.appendChild(canOptContainerLabel);
	module1Form.appendChild(document.createElement("br"));
	module1Form.appendChild(subPollBtn);
	
	
	//-----------------------------------------------------------------------------------------------
	
	rulesNum.addEventListener("change",function(){
		
		if (rulesNum.value > rulesNum.max) {
			rulesNum.value = rulesNum.max;
		}
		
		if(canoptNum.value >=1 ){
		canOptContainerLabel.innerHTML = "Set information for " + canoptNum.value + " candidates/options, and each voter can vote for " + rulesNum.value + " candidates/options: ";
		}
		
	});
	
	
	canoptNum.addEventListener("change",function(){
		
		if (canoptNum.value > canoptNum.max) {
			canoptNum.value = canoptNum.max;
			rulesNum.setAttribute("max",canoptNum.value);
		}else{
			rulesNum.setAttribute("max",canoptNum.value);
		}
		
		if(rulesNum.value > canoptNum.value){
			rulesNum.value = canoptNum.value;
		}
		
		
		
		canOptContainer.innerHTML = "";
		canOptContainer.appendChild(canOptContainerLabel);
		
		canOptContainerLabel.innerHTML = "Set information for " + canoptNum.value + " candidates/options, and each voter can vote for " + rulesNum.value + " candidates/options: ";
		
		
		 for (var i = 0; i < canoptNum.value; i++) {
			/* 
			 temp5 = document.createElement("input");
			 temp5.setAttribute("type","text");
			 temp5.id = "canID"+i;
			 temp5.required = true;
			 */
			 temp1 = document.createElement("input");
			 temp1.setAttribute("type","text");
			 temp1.id = "canOpt"+i;
			 temp1.required = true;
			 
			 temp2 = document.createElement("textarea");
			 temp2.id = "canDes"+i;
			 temp2.setAttribute("rows", "10");
			 temp2.setAttribute("cols", "50");
			 temp2.required = true;
			 
			 /*
			 temp6 = document.createElement("label");
			 temp6.id = "canIDLabel"+i;
			 temp6.setAttribute("for", temp5.id);
			 temp6.innerHTML = "Candidate/Option " +(i+1)+" ID: ";
			 */
			 
			 temp3 = document.createElement("label");
			 temp3.id = "canOptLabel"+i;
			 temp3.setAttribute("for", temp1.id);
			 temp3.innerHTML = "Candidate/Option " +(i+1)+" name: ";
	//		 temp3.innerHTML = temp1.id;
			 
			 temp4 = document.createElement("label");
			 temp4.id = "canDesLabel"+i;
			 temp4.setAttribute("for", temp2.id);
			 temp4.innerHTML = "Candidate/Option " +(i+1)+" description: ";
	//		 temp4.innerHTML = temp2.id;
			 
			 
			/* canOptContainer.appendChild(temp6);
			 canOptContainer.appendChild(document.createElement("br"));
			 canOptContainer.appendChild(temp5);
			 canOptContainer.appendChild(document.createElement("br"));*/
			 canOptContainer.appendChild(temp3);
			 canOptContainer.appendChild(document.createElement("br"));
			 canOptContainer.appendChild(temp1);
			 canOptContainer.appendChild(document.createElement("br"));
			 canOptContainer.appendChild(temp4);
			 canOptContainer.appendChild(document.createElement("br"));
			 canOptContainer.appendChild(temp2);
			 canOptContainer.appendChild(document.createElement("br"));
			 
			 temp1 = null;
			 temp2 = null;
			 temp3 = null;
			 temp4 = null;
		}
	});

	
	
	
	module1Form.addEventListener("submit",function(){
				 
			 
		var currentDate = new Date();
		
		
		var OTDate = new Date(openTime.value);
		var CTDate = new Date(closeTime.value);
		
		var OTDate13String = OTDate.getTime();
		var CTDate13String = CTDate.getTime();
		
		OTDate13String = OTDate13String.toString();
		CTDate13String = CTDate13String.toString();
		
	
		//window.alert("type of input datetime: "+typeof(openTime)+"\ntype of current date: "+typeof(currentDate));
		window.alert("OT: " + new Date(Number(OTDate13String)) + "\nCT: " + new Date(Number(CTDate13String)) + "\nCuT: "+ currentDate);

		if(currentDate > OTDate){
			window.alert("illegal open time (open time should be after current time)");
			openTime.scrollIntoView();
			
		}else if (currentDate > CTDate){
			window.alert("illegal close time (close time should be after current time)");
			closeTime.scrollIntoView();

		}else if (OTDate >= CTDate){
			window.alert("open time should be before close time");
			openTime.scrollIntoView();
		}else {
			window.alert("Sumbmit to creat poll");
				 
			temp1 = {"moduleName": "module1",
					"pollName": pollName.value.toString(),
					"organizerName": organizerName.value.toString(),
					"openTime": OTDate13String, 
					"closeTime": CTDate13String,
					"pollDes": pollDes.value.toString(),
					"voterNum": voterNum.value.toString(),
					"canoptNum": canoptNum.value.toString(),
					"rulesNum": rulesNum.value.toString(),
					"canOpts": []
					};
				
			for (var i = 0; i < canoptNum.value; i++) {
				
				temp2 = {/*"id":document.getElementById("canID"+i).value.toString(),*/"name":document.getElementById("canOpt"+i).value.toString(), "description": document.getElementById("canDes"+i).value.toString()};
				temp1.canOpts.push(temp2);
	
			}
			
			console.log(temp1);
		/*
			window.alert("\nname1: "+temp1.canOpts[0].name
					+"\ndescription1: "+temp1.canOpts[0].description
					+"\nname2: "+temp1.canOpts[1].name
					+"\ndescription2: "+temp1.canOpts[1].description);
			*/
		
	/* Data structure in request "module1CreatePoll":
	 * a stringtified JSON object that contains:
	 *				"moduleName":
	 *				"pollName" : 
					"organizerName" : 
					"openTime" : 
					"closeTime" :
					"pollDes" : the description of the poll
					"voterNum" : how many voters in the poll
					"canoptNum" : how many candidates/opions in the poll
					"rulesNum" : a voter can vote for how many candidates/opions in one voting
					"canOpts": [{candidate1 name:,candidate1 description},{,},{,},] --- an array that cantains 
					all the detail information of all candidates/options in the poll. Each slot in the array includes
					an object {name:?,description:?}
	 * 
	 *  Data structure of the response of the "module1CreatPoll":
	 *  	an standard httpJSON response with body including:
	 *			"result": "success"(if all good)
	 *  				  "pollNameExist" (the poll name is existed)
	 *  	
	 *  		"publicKeys": An array that cantains all the public id and random password
	 *  					  for each voters in the poll. Each slot in the poll should contain
	 *  					  a JSON object with "id" and "password"
	 *  
	 *  					  [{"id":"01", "password":"Doe"},
						      {"id":"02","password":"Smith"},
						      {"id":"03", "password":"Jones"}]
						                     
	 *  				  
	 *  	
	 * 		
	*/		
			sender.sendAsync("POST", baseUrl+ "/module1CreatePoll", JSON.stringify(temp1), function(res){
				if (res.status == 200) {
					console.log(res);
					var body = res.response;	
					
					body = JSON.parse(body);
					
					 // local test
					/*var	body = {"result":"success"
							
							,"publicKeys":[
						                         {"id":"01", "password":"Doe"},
						                         {"id":"02","password":"Smith"},
						                         {"id":"03", "password":"Jones"}
						                     ]};
					*/
					
					if (body.result == "success") {
						
							contentContainer.innerHTML = "";
							 
							 for (var i = 0; i < body.publicKeys.length; i++) {
								temp1 = document.createTextNode("voter"+i+"**** id: "+body.publicKeys[i].id+ " ******* password: "+body.publicKeys[i].password);
								contentContainer.appendChild(temp1);
								contentContainer.appendChild(document.createElement("br"));
								contentContainer.appendChild(document.createElement("br"));
							}
								
							 contentContainer.appendChild(document.createElement("br"));
							 
							 var exit = document.createElement("button");
							 exit.innerHTML = "exit";
							 exit.addEventListener("click", function(){
								 window.location.reload();
							 })
							 
							 contentContainer.appendChild(exit);
					 
					 
					 
					 
						
					} else if (body.result == "pollNameExist") {
						
						window.alert("Sorry, the poll name exists");
						pollName.innerHTML = "try another name";
						pollName.scrollIntoView();
						
					} else {
						
						window.alert("bad response");
					}
			        
			    } else {
					window.alert("failed to create poll");
				}
					
					
			});
			 
		
		}
	
});
	
	

}





// TODO backend by qiao
function module2Creation(moduleLoader) {
	moduleLoader.innerHTML = "";
	
	//window.alert("module 2 selected");
	//moduleLoader.innerHTML = "module 2 load test";
	
	var module2Form = document.createElement("form");
	module2Form.id = "module2Form";
	module2Form.setAttribute("onsubmit","return false;");
	
	var organizerName = document.createElement("output");
	organizerName.id = "organizerName";
	organizerName.value = sessionStorage.username;
	var labelON = document.createElement("label");
	labelON.innerHTML = "Oraniser Name(creator):  ";
	labelON.setAttribute("for", "organizerName");
	
	
	var pollNum = document.createElement("input");
	pollNum.setAttribute("type","number");
	pollNum.id = "pollNum";
	pollNum.name = "pollNum";
	pollNum.required = true;
	pollNum.setAttribute("min",1);
	pollNum.setAttribute("max",5);
	
	var pollNumLabel = document.createElement("label");
	pollNumLabel.id = "pollNumLabel";
	pollNumLabel.innerHTML = "decide how many polls you want <strong>(1~5)</strong>:  ";
	pollNumLabel.setAttribute("for", "pollNum");
	
	var subPollBtn = document.createElement("input");
	 subPollBtn.setAttribute("type","submit");
	 subPollBtn.value = "creat poll";
	
	var pollsContainer = document.createElement("fieldset");
	pollsContainer.id = "pollsContainer";
	
	var pollsContainerLabel = document.createElement("legend");
	pollsContainerLabel.id = "pollsContainerLabel";
	
	
	moduleLoader.appendChild(module2Form);
	
	module2Form.appendChild(labelON);
	module2Form.appendChild(document.createElement("br"));
	module2Form.appendChild(organizerName);
	module2Form.appendChild(document.createElement("br"));
	module2Form.appendChild(pollNumLabel);
	module2Form.appendChild(document.createElement("br"));
	module2Form.appendChild(pollNum);
	module2Form.appendChild(document.createElement("br"));
	
	module2Form.appendChild(pollsContainer);
	module2Form.appendChild(document.createElement("br"));
	module2Form.appendChild(subPollBtn);

	pollNum.addEventListener("change",function(){
		
		if (pollNum.value > pollNum.max) {
			pollNum.value = pollNum.max;
		}
		
		
		
		pollsContainer.innerHTML = "";
		pollsContainer.appendChild(pollsContainerLabel);
		pollsContainer.appendChild(document.createElement("br"));
		
		pollsContainerLabel.innerHTML = "Polls: "
		
		for (var j = 0; j < pollNum.value; j++) {
			
			module2AddPolls(j,pollsContainer);
				
		
			}

	});
	
	//-------------------------------------------------------------------------------------
	
	
	
	module2Form.addEventListener("submit",function(){
		
		
			for (var i = 0; i < pollNum.value; i++) {
				if(!checkTime(i)){
					break;
				} else if(!checkVoterNum(i)){
					break;
				}
			}
			
			var tempFianlArray = [];
			
			for (var i = 0; i < pollNum.value; i++) {
				
				temp1 = pollsObjs[i];
				temp2 = pollsObjs[i].candadites;
				
				var OTDate = new Date(temp1.openTime.value);
				var CTDate = new Date(temp1.closeTime.value);
				
				var OTDate13String = OTDate.getTime();
				var CTDate13String = CTDate.getTime();
				
				OTDate13String = OTDate13String.toString();
				CTDate13String = CTDate13String.toString();
				
				window.alert("OT: " + new Date(Number(OTDate13String)) + "\nCT: " + new Date(Number(CTDate13String)));

				
				var tempPollDetail = {"moduleName":"module2",
						"pollName": temp1.pollName.value,
						"openTime": OTDate13String,
						"closeTime": CTDate13String,
						"pollDes": temp1.pollDes.value,
						"voterNum": temp1.voterNum.value,
						"canoptNum": temp1.canoptNum.value,
						"rulesNum": temp1.rulesNum.value,
						"candadites":[]}; 
				
				
				for (var j = 0; j < temp2.length; j++) {
					tempCanDetail = {"name":"","canDes":""};
					
					tempCanDetail.name = temp2[j].name.value;	
					tempCanDetail.canDes = temp2[j].canDes.value;
					
					tempPollDetail.candadites[j] = tempCanDetail;
				}
				
				tempFianlArray[i] = tempPollDetail;
			}
			
			var pollsInfo = {"pollsInfo": tempFianlArray};
			
			console.log(pollsInfo);
			
			
			/* Data structure in request "module2CreatePoll":
			 * a stringified JSON object that contains an array with tag "pollInfo".
			 *  Each slot in "pollInfo" array contains (each slot includes all the information of each created poll
			 *  ) (continuous poll):
			 *  			"moduleName":
			 *				"pollName" : 
							"organizerName" : 
							"openTime" : 
							"closeTime" :
							"pollDes" : the description of the poll
							"voterNum" : how many voters in the poll
							"canoptNum" : how many candidates/opions in the poll
							"rulesNum" : a voter can vote for how many candidates/opions in one voting
							"canOpts": [{candidate1 name:,candidate1 description},{,},{,},] --- an array that cantains 
							all the detail information of all candidates/options in the poll. Each slot in the array includes
							an object {name:?,description:?}
			 * 
			 *  Data structure of the response of the "module1CreatPoll":
			 *  	an standard httpJSON response with body including:
			 *				"result":"success" (if all good)
			 *						"pollNameExist" (if any poll name in the continuous poll is existed)
			 * 				
			 * 				"publicKeys": An array that contains all the publicId and random password for each voter
			 * 				in poll 1 (the initial poll) or each candidate in all polls.
			 * 				
			 * 				each slot in the array should contains an array with each slot containing
			 * 				an object {"id": (publickId),"password": (random password)}
			 *
			 *	Example (response for the request of 2 polls):
			 *  		{"result":"success"
							
							,"publicKeys":[
											[
												{"id":"01", "password":"Doe"},
						                         {"id":"02","password":"Smith"},
						                         {"id":"03", "password":"Jones"}
						                         									],
						                         
											[
												{"id":"01", "password":"Doe"},
						                         {"id":"02","password":"Smith"},
						                         {"id":"03", "password":"Jones"}
						                         									]
						                         									
						                     
						                     ]};
								                     
			 *  				  
			 *  	
			 * 		
			*/
			
				
			sender.sendAsync("POST", baseUrl+ "/module2CreatePoll", JSON.stringify(pollsInfo), function(res){
				/*	
				if (res.status == 200) {
					console.log(res);
					var body = res.response;	
					
					body = JSON.parse(body);
				*/
					 // local test
					var	body = {"result":"success"
							
							,"publicKeys":[[{"id":"01", "password":"Doe"},
						                         {"id":"02","password":"Smith"},
						                         {"id":"03", "password":"Jones"}],
						                         
											[{"id":"01", "password":"Doe"},
						                         {"id":"02","password":"Smith"},
						                         {"id":"03", "password":"Jones"}]
						                     ]};
					
					
					if (body.result == "success") {
						
							contentContainer.innerHTML = "";
							 
							for(var j =0 ; j<body.publicKeys.length;j++){
								
								if(j == 0){ 
									contentContainer.appendChild(document.createTextNode("Poll 1 voters publickIDs and passwords:"));
									contentContainer.appendChild(document.createElement("br"));
								}else {
									contentContainer.appendChild(document.createTextNode("Poll "+j+" candidates publickIDs and passwords for poll "+(j+1)+": "));
									contentContainer.appendChild(document.createElement("br"));
								}
								
							 for (var i = 0; i < body.publicKeys[j].length; i++) {
								
								if(j == 0){
								temp1 = document.createTextNode("voter"+i+"**** id: "+body.publicKeys[j][i].id+ " ******* password: "+body.publicKeys[j][i].password);
								contentContainer.appendChild(temp1);
								contentContainer.appendChild(document.createElement("br"));
								} else{
									temp1 = document.createTextNode("candidate"+i+"**** id: "+body.publicKeys[j][i].id+ " ******* password: "+body.publicKeys[j][i].password);
									contentContainer.appendChild(temp1);
									contentContainer.appendChild(document.createElement("br"));	
								}
								
							}
							 
							 contentContainer.appendChild(document.createElement("br"));
							 contentContainer.appendChild(document.createElement("br"));
							 contentContainer.appendChild(document.createElement("br"));
							}
							
							 
							 var exit = document.createElement("button");
							 exit.innerHTML = "exit";
							 exit.addEventListener("click", function(){
								 window.location.reload();
							 })
							 
							 contentContainer.appendChild(exit);
					 
					 
					 
					 
						
					} else if (body.result == "pollNameExist") {
						
						window.alert("Sorry, the poll name exists");
						pollName.innerHTML = "try another name";
						pollName.scrollIntoView();
						
					} else {
						
						window.alert("bad response");
					}
			   /*    
			    } else {
					window.alert("failed to create poll");
				}
				*/	
			});
		 
		
		
});
	
}

//---------------------------module2 API ---------------------------------------------------------------------

function module2AddPolls(j,pollsContainer) {
	
	var singlePollContainer = document.createElement("fieldset");
	singlePollContainer.id = "singlePollContainer" + j;
	
	var singlePollContainerLabel = document.createElement("legend");
	singlePollContainerLabel.id = "singlePollContainerLabel"+j;
	singlePollContainerLabel.innerHTML = "Poll "+ (j+1)+" settings: ";

	
	var pollName = document.createElement("input");
	pollName.id = "pollName" + j;
	
	pollName.setAttribute("type", "text");
	pollName.required = true;
	var labelPN = document.createElement("label");
	labelPN.innerHTML = "Poll Name:  ";
	labelPN.setAttribute("for", "pollName" + j);
	
	var openTime = document.createElement("input");
	openTime.id = "openTime" + j;
	openTime.setAttribute("type", "datetime-local");
	openTime.required = true;
	var labelOT = document.createElement("label");
	labelOT.innerHTML = "Open Time:  ";
	labelOT.setAttribute("for", "openTime" + j);

	
	var closeTime = document.createElement("input");
	closeTime.id = "closeTime" + j;
	closeTime.setAttribute("type", "datetime-local");
	closeTime.required = true;
	var labelCT = document.createElement("label");
	labelCT.innerHTML = "Close Time:  ";
	labelCT.setAttribute("for", "closeTime" + j);

	
	var pollDes = document.createElement("textarea");
	pollDes.id = "pollDes" + j;
	pollDes.setAttribute("rows", "10");
	pollDes.setAttribute("cols", "70");
	pollDes.required = true;
	var labelDes = document.createElement("label");
	labelDes.innerHTML = "Poll Description:  ";
	labelDes.setAttribute("for", "pollDes" + j);

	
	//----------------------------------------------------------------------------------------------
	
	var parasContainerLabel = document.createElement("label");
	parasContainerLabel.innerHTML = "Set parameters for module 2 poll:  ";
	
	var voterNum = document.createElement("input");
	voterNum.setAttribute("type","number");
	voterNum.id = "voterNum" + j;
	voterNum.name = "voterNum" + j;
	voterNum.required = true;
	voterNum.setAttribute("min",1);
	voterNum.setAttribute("max",500);
	
	var voterNumLabel = document.createElement("label");
	voterNumLabel.id = "voterNumLabel" + j;
	voterNumLabel.innerHTML = "decide how many voters in this poll <strong>(1~500)</strong>:  ";
	voterNumLabel.setAttribute("for", "voterNum" + j);
	
	
	
	var canoptNum = document.createElement("input");
	canoptNum.setAttribute("type","number");
	canoptNum.id = "canoptNum" + j;
	canoptNum.name = "canoptNum" + j;
	canoptNum.required = true;
	canoptNum.setAttribute("min",1);
	canoptNum.setAttribute("max",50);
	
	var canoptNumLabel = document.createElement("label");
	canoptNumLabel.id = "canoptNumLabel" + j;
	canoptNumLabel.innerHTML = "decide how many candidates/opions in this poll <strong>(1~50)</strong>:  ";
	canoptNumLabel.setAttribute("for", "canoptNum" + j);
	
	
	var rulesNum = document.createElement("input");
	rulesNum.setAttribute("type","number");
	rulesNum.id = "rulesNum" + j;
	rulesNum.name = "rulesNum" + j;
	rulesNum.required = true;
	rulesNum.setAttribute("min",1);
	rulesNum.setAttribute("max",1);

	
	var rulesNumLabel = document.createElement("label");
	rulesNumLabel.id = "rulesNumLabel" + j;
	rulesNumLabel.innerHTML = "decide a voter can vote for how many candidates/options <strong>(must less than or equal with the number of candidates/options)</strong>:  ";
	rulesNumLabel.setAttribute("for", "rulesNum" + j);
		
	
	//----------------------------------------------------------------------------------------------
	

	var canOptContainer = document.createElement("fieldset");
	canOptContainer.id = "canOptContainer" + j;
	
	var canOptContainerLabel = document.createElement("legend");
	canOptContainerLabel.id = "canOptContainerLabel" + j;
	
	
	
	
	//---------------------------------------------------------------------------------------------- 
	
	pollsContainer.appendChild(singlePollContainer);
	
	singlePollContainer.appendChild(singlePollContainerLabel);
	
	singlePollContainer.appendChild(labelPN);
	singlePollContainer.appendChild(document.createElement("br"));
	singlePollContainer.appendChild(pollName);
	
	singlePollContainer.appendChild(document.createElement("br"));
	singlePollContainer.appendChild(document.createElement("br"));
	

	singlePollContainer.appendChild(labelOT);
	singlePollContainer.appendChild(document.createElement("br"));
	singlePollContainer.appendChild(openTime);
	
	singlePollContainer.appendChild(document.createElement("br"));
	singlePollContainer.appendChild(document.createElement("br"));
	
	singlePollContainer.appendChild(labelCT);
	singlePollContainer.appendChild(document.createElement("br"));
	singlePollContainer.appendChild(closeTime);
	
	singlePollContainer.appendChild(document.createElement("br"));
	singlePollContainer.appendChild(document.createElement("br"));
	
	singlePollContainer.appendChild(labelDes);
	singlePollContainer.appendChild(document.createElement("br"));
	singlePollContainer.appendChild(pollDes);
	
	singlePollContainer.appendChild(document.createElement("br"));
	singlePollContainer.appendChild(document.createElement("br"));
	
	singlePollContainer.appendChild(parasContainerLabel);
	singlePollContainer.appendChild(document.createElement("br"));
	
	
	singlePollContainer.appendChild(voterNumLabel);
	singlePollContainer.appendChild(document.createElement("br"));
	singlePollContainer.appendChild(voterNum);
	singlePollContainer.appendChild(document.createElement("br"));
	
	
	singlePollContainer.appendChild(canoptNumLabel);
	singlePollContainer.appendChild(document.createElement("br"));
	singlePollContainer.appendChild(canoptNum);
	singlePollContainer.appendChild(document.createElement("br"));
	
	singlePollContainer.appendChild(rulesNumLabel);
	singlePollContainer.appendChild(document.createElement("br"));
	singlePollContainer.appendChild(rulesNum);
	singlePollContainer.appendChild(document.createElement("br"));
	
	singlePollContainer.appendChild(document.createElement("br"));
	singlePollContainer.appendChild(document.createElement("br"));
	
	singlePollContainer.appendChild(canOptContainer);
	canOptContainer.appendChild(canOptContainerLabel);
	
	singlePollContainer.appendChild(document.createElement("br"));
	singlePollContainer.appendChild(document.createElement("br"));
	
	
	var a = {pollName:pollName,
			openTime:openTime,
			closeTime:closeTime,
			pollDes: pollDes,
			voterNum: voterNum,
			canoptNum: canoptNum,
			rulesNum:rulesNum,
			candadites:[]};
	
	//-----------------------------------------------------------------------------------------------
	rulesNum.addEventListener("change",function(){	
		
		if (rulesNum.value > rulesNum.max) {
			rulesNum.value = rulesNum.max;
		}
		
		if(canoptNum.value >=1 ){
			canOptContainerLabel.innerHTML = "Set information for " + canoptNum.value + " candidates/options, and each voter can vote for " + rulesNum.value + " candidates/options: ";
		}
		
	});

	
	
	canoptNum.addEventListener("change",function(){
	
	if (canoptNum.value > canoptNum.max) {
		canoptNum.value = canoptNum.max;
		rulesNum.setAttribute("max",canoptNum.value);

	} else{
		rulesNum.setAttribute("max",canoptNum.value);
	}
	
	if(rulesNum.value > canoptNum.value){
		rulesNum.value = canoptNum.value;
	}
	
	
	
	canOptContainer.innerHTML = "";
	canOptContainer.appendChild(canOptContainerLabel);
	
	canOptContainerLabel.innerHTML = "Set information for " + canoptNum.value + " candidates/options, and each voter can vote for " + rulesNum.value + " candidates/options: ";

	 for (var i = 0; i < canoptNum.value; i++) {
		 temp1 = document.createElement("input");
		 temp1.setAttribute("type","text");
		 temp1.id = "canOpt"+j+","+i;
		 temp1.required = true;
		 
		 temp2 = document.createElement("textarea");
		 temp2.id = "canDes"+j+","+i;
		 temp2.setAttribute("rows", "10");
		 temp2.setAttribute("cols", "50");
		 temp2.required = true;
		 
		 temp3 = document.createElement("label");
		 temp3.id = "canOptLabel"+j+","+i;
		 temp3.setAttribute("for", temp1.id);
		 temp3.innerHTML = "Candidate/Option " +(i+1)+" name: ";
//		 temp3.innerHTML = temp1.id;
		 
		 temp4 = document.createElement("label");
		 temp4.id = "canDesLabel"+j+","+i;
		 temp4.setAttribute("for", temp2.id);
		 temp4.innerHTML = "Candidate/Option " +(i+1)+" description: ";
//		 temp4.innerHTML = temp2.id;
		 
		 
		 canOptContainer.appendChild(document.createElement("br"));
		 canOptContainer.appendChild(temp3);
		 canOptContainer.appendChild(document.createElement("br"));
		 canOptContainer.appendChild(temp1);
		 canOptContainer.appendChild(document.createElement("br"));
		 canOptContainer.appendChild(temp4);
		 canOptContainer.appendChild(document.createElement("br"));
		 canOptContainer.appendChild(temp2);
		 canOptContainer.appendChild(document.createElement("br"));
		 
		 var b = {name: temp1,canDes: temp2};
		 a.candadites[i] = b;
		 
		 temp1 = null;
		 temp2 = null;
		 temp3 = null;
		 temp4 = null;
	}
});
	
	pollsObjs[j] = a;
	
	
}

function checkTime(i) {
	var currentDate = new Date();
	
	var openTime = pollsObjs[i].openTime;
	var closeTime = pollsObjs[i].closeTime;
	
	var preOpenTime = pollsObjs[i].openTime;
	var preCloseTime = pollsObjs[i].closeTime;
	
	
	var OTDate = new Date(openTime.value);
	var CTDate = new Date(closeTime.value);
	
	//window.alert("type of input datetime: "+typeof(openTime)+"\ntype of current date: "+typeof(currentDate));
	//window.alert("OT: " + openTime.value + "\nCT: " + closeTime.value + "\nCuT: "+ currentDate);

	if(currentDate > OTDate){
		window.alert("Error in Poll: "+(i+1)+"\nillegal open time (open time should be after current time)");
		openTime.scrollIntoView();
		return false;
		
	}else if (currentDate > CTDate){
		window.alert("Error in Poll: "+(i+1)+"\nillegal close time (close time should be after current time)");
		closeTime.scrollIntoView();
		return false;

	}else if (OTDate >= CTDate){
		window.alert("Error in Poll: "+(i+1)+"\nopen time should be before close time");
		openTime.scrollIntoView();
		return false;
	}else {
		
		if(i == 0){
			return true;
		} else {
			var preCloseTime = pollsObjs[i-1].closeTime;
			
			var preCTDate = new Date(preCloseTime.value);
			
			if(OTDate <= preCTDate){
				window.alert("Error in Poll: "+(i+1)+"\nopen time should be after the close time of previous poll");
				openTime.scrollIntoView();
				return false;
			} else{
				return true;
			}
		}

	}
	
	
}

function checkVoterNum(i) {
	if(i == 0){
		return true;
	}else {
		var preCanNum = pollsObjs[i-1].canoptNum;
		
		var voterNum = pollsObjs[i].voterNum;
		
		if(voterNum.value >= preCanNum.value){
		window.alert("Error in Poll: "+(i+1)+"\nThe voter number should be less than the candidate/opion num of previous poll");
		voterNum.scrollIntoView();
		return false;
		} else {
			return true;
		}
	}
	
	
}


