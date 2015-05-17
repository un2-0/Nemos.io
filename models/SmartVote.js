function SmartVote() {

	var COMMITTING = true;

	var handlers = {};
	svApi = new SmartVoteAPI();

	/**
	 * Used to handle all incoming requests. It is set as the callback for
	 * incoming http requests. It parses the request URL into an object, then
	 * pass that object into the appropriate sub handler (should one exist).
	 * Sub handlers needs to return a response object.
	 * @param httpReq = {
	 *            Method: POST // always POST
	 *            Host:localhost:3000
	 *            Header:{...}
	 *            Body:     // query goes here
	 *            URL: {
	 *                User:
	 *                Host:
	 *                Path:/apis/SmartVote/<operation-name>
	 *                RawQuery: // always empty
	 *                Fragment:
	 *                Scheme:
	 *                Opaque:
	 *            }
	 *        }
	 */
	this.handle = function (httpReq) {
		Println("Receiving request...");

		var urlObj = network.parseUrl(httpReq);
		// urlObj = {
		//     path:<opeartion-name>
		//     options: // always empty
		//     error:
		// }

		// Error 400 bad request
		if (urlObj.error !== "") {
			return null;
		}

		var res = urlObj.path[0];
		Println("res: " + res);
		var hFunc = handlers[res];

		// If the according handler method doesn't exist, return an error.
		if (typeof (hFunc) !== "function") {
			return network.getHttpResponse(400, {},
			        "Bad request: no resource named: " + res + ".");
		}

		var query = JSON.parse(httpReq.Body);
		Println("query-------------------------------------------------------");
		Println(query);
		var resp = hFunc(query);
		Println("resp: " + resp);

        // Weak check, but this is clearly not a valid response.
        if (typeof (resp) !== "object" || resp.Body === undefined
                || resp.Header === undefined || resp.Status === undefined) {
            return null;
        }

		if (JSON.stringify(resp).length < 10000) {
			Println("RESPONSE OBJECT: " + JSON.stringify(resp));
		} else {
			Println("RESPONSE OBJECT: " + JSON.stringify(resp).substr(0, 10000) + " ...{truncated}");
		};

		return resp;
	}

/*
	handlers.getContractAddress = function (query) {
	    // create the response JSON object
	    var response;
	    if (query.contractName) {
	        var response = svApi.contractName2Addr(query.contractName);
	        return network.getHttpResponseJSON(response);
	    } else {
            return network.getHttpResponse(400, {}, "Bad query.");
	    }
	}
*/
	/**
	 * Login - as an organizer or a voter.
	 * @param query = {
	 *            "identity" : "organizer" or "voter",
	 *            "username" : str,
	 *            "password" : str
	 *        }
	 * @response response = {
	 *               result = "success" or "userDoesntExist" or "wrongPassWord"
	 *           }
	 */
    handlers.login = function (query) {
        var response = {};
        printQuery(query);
        var identity = query.identity;
        var username = query.username;
        if (identity === "anonymousVoter"){
            response.pollName = getAvailablePolls(identity, username);
        } else if ((identity != "organizer") && (identity != "voter") && (identity != "anonymousVoter")) {
            return network.getHttpResponse(400, {}, "Bad query.");
        }
        response.result = checkUser(identity, username, query.password);
        return network.getHttpResponseJSON(response);
    }

    /**
     * Creating elections in module1.
     * @param query = {
     *            "electionName" : 
     *            "organizerName" : 
     *            "openTime" : 13 digits
     *            "closeTime" : 13 digits
     *            "electionDes" : the description of the election
     *            "voterNum" : how many voters in the election
     *            "canoptNum" : how many candidates/options in the election
     *            "rulesNum" : a voter can vote for how many candidates/options in one voting
     *            "canOpts": [{candidate1 name:,candidate1 description},{,},{,},] --- an array that contains 
     *                all the detail information of all candidates/options in the election. Each slot in the array includes
     *                an object {name:?,description:?}
     *        }
     * @response response = {
     *               "result": "success" or "electionNameExist"
     *               "publicKeys": [{"id":"01", "password":"Doe"},
     *                             {"id":"02", "password":"Smith"},
     *                             {"id":"03", "password":"Jones"}]
     *                             An array that contains all the public id and
     *                             random password for each voters in the election.
     *                             Each slot in the election should contain a JSON
     *                             object with "id" and "password"
     *           }
     */
    // TODO
    handlers.module1CreatePoll = function (query) {
        /*
         * Data structure in request "module1CreateElection":
         * a stringtified JSON object that contains:
         *  Data structure of the response of the "module1CreatElection":
                  */
        printQuery(query); // TODO can be removed

        var pollName = query.pollName;
        var organizerName = query.username;
        var openTime = parseInt(query.openTime, 10);
        var closeTime = parseInt(query.closeTime, 10);
        var pollDes = query.pollDes;
        var voterNum = parseInt(query.voterNum, 10);
        var canoptNum = parseInt(query.canoptNum, 10);
        var rulesNum = parseInt(query.rulesNum, 10);
        var canOpts = query.canOpts;
        
        var response = createElection(query);
        if (response.result !== "pollNameExist") {
            registerVoters(pollName, response.publicKeys);
        }
        return network.getHttpResponseJSON(response);
    }
    
    /**
     * Create polls in module2.
     * @param query = {

     * }
     * @response response = {
     * }
     */
    // TODO
    handlers.module2CreatePoll = function (query) {
         
    }

    /**
     * Organizer registration.
     * @param query = {
     *     "username" : str,
     *     "password" : str
     * }
     * @response response = {
     *               result = "success" or "usernameExist"
     * }
     */
    handlers.organizerRegister = function (query) {
        printQuery(query);
        var organizerName = query.username;
        var password = query.password;
        var response = {};
        response.result = registerUser("organizer", organizerName, password);
        return network.getHttpResponseJSON(response);
    }

    /**
     * Get all the basic information about a particular election/election.
     * @param query = {
     *     "selectedElectionName" : str
     * }
     * @response response = {
     *     "result":"success" | "fail"
     *     "electionBasicInfo":{
     *         "electionName": str, 
     *         "organizerName": str,
     *         "openTime":
     *         "closeTime":
     *         "electionDes":
     *      }
     * }
     */
    handlers.showPollBasicInfo = function (query) {
        var electionName = query.selectedPollName;
        var response = {};
        if (!electionNameExists(electionName)) {
            response.result = "fail";
            response.pollBasicInfo = null;
        } else {
            response.result = "success";
            response.pollBasicInfo = getPollBasicInfo(electionName);
        }
        return network.getHttpResponseJSON(response);
    }
    
    /**
     * Show all the elections that:
     * 1. are created by the user (if an organizer)
     * 2. the user can participate (if a voter)
     * @param query = {"username" : str, "identity" : str}
     * 
     * @response response = {
     *               "result": "success" or others
     *               "pollslist": ["electionname1","electionname2","electionname3", ...]
     *           }
     */
    handlers.showPollList = function (query) {
        printQuery(query);
        var response = {};
        var username = query.username;
        var identity = query.identity;
        if (userExists(identity, username)) {
            response.result = "success";
            response.pollslist = getAvailablePolls(identity, username);  
        } else {
            return network.getHttpResponse(400, {},
                    "Bad query");
        }
        return network.getHttpResponseJSON(response);
    }
    
    /**
     * Check if the voter has already get the second account for a particular
     * election.
     * @param query = {"username": str, "electionName": str}
     * @response response = {
     *               "result" : "secondPasswordSet" or "secondtPasswordNotSet"
     *                           or "voterNotInList"
     *           }
     */
    handlers.checkVoterSecondAccount = function (query) {
        printQuery(query);
        var username = query.username;
        var electionName = query.selectedPollName;
        var response = {};
        response.result = validateVoter(username, electionName);
        return network.getHttpResponseJSON(response);
    }
    
    /**
     * Check if the username and password of the second account are right.
     * @param query = {
     *            "username" : str
     *            "secondId" : str
     *            "secondPassword" : str
     *            "selectedElectionName" : str
     *        }
     * @response response = {
     *               "result" : "success" or "userDoesntExist" or
     *                          "wrongPassWord"
     *           }
     */
    handlers.checkVoterSecondIdPassword = function (query) {
        printQuery(query);
        var username = query.username;
        var secondId = query.secondId;
        var secondPassword = query.secondPassword;
        var electionName = query.selectedElectionName;
        
        var response = {};
        // TODO
    }
    
    /**
     * Generate a username-password pair as the second account of a voter.
     * @param query = {
     *     "username" : str,
     *     "selectedElectionName": str
     * }
     * @response response = {
     *     "result" : "success",
           "secondIDPassword": {"id": str,"password": str}
     * }
     */
    handlers.getVoterSecondIdPassword = function (query) {
        printQuery(query);
        var username = query.username;
        var electionName = query.selectedPollName;
        var response = {};

        response.result = "success";
        response.secondIdPassword = generatePrivateKey(8);
        registerAnonymousVoter(electionName, response.secondIdPassword);
        deregisterElection(electionName, username, "voter");
        return network.getHttpResponseJSON(response);
    }
    
    /**
     * Check the ballot by a second ID.
     * @param query = {
     *     "secondId": "The Second ID: ",
     *     "selectedElectionName": "Election Name: "
     * }
     * @response response = {
     *     "rulesNum": "1",
     *     "candidates": [{"name":"1","canDes":"1"}
     *                   ,{"name":"2","canDes":"2"},
     *                    {"name":"3","canDes":"3"}]
     * }
     */
    handlers.getVotingInfo = function (query) {
        printQuery(query);
        var secondID = query.secondId;
        var electionName = query.selectedElectionName;
        // TODO
    }
    
    /**
     * Show the result of a poll.
     * @param query = {"selectedPollName" : str"}
     * @response response = {
     *     "result": "success" or else
     *     "candidates": [{"name": str, "canDes": str, "votes":num}, ...]
     *     "log": [{"id": <second account id>,
     *              "votes": <array, its length equals with length of candidates
     *                        array. each slot should be "1" or "0">
     *             }, ...]
     * }
     */
    handlers.showResult = function (query) {
        printQuery(query);
        var pollName = query.selectedPollName;
        // TODO
    }
    
    /**
     * Change the password of the first account of a voter.
     * @param query = {
     *     "username": <First Account Username>,
     *     "newFirstPassword": <New First Account Password>
     * }
     * @response response = {
     *     "result": "success" or not
     * }
     */
    handlers.changePassword = function (query) {
        var username = query.username;
        var newPassword = query.newPassword;
        var response = {};
        if (userExists("organizer", username)) {
            response.result = changePassword("organizer", username, newPassword);
        } else if (userExists("voter", username)) {
            response.result = changePassword("voter", username, newPassword);
        } else if (userExists("anonymousVoter", username)) {
            response.result = changePassword("anonymousVoter", username, newPassword);
        } else {
            return network.getHttpResponse(400, {},
                    "Bad query");
        }
        return network.getHttpResponseJSON(response);
    }

    /**
     * Demo for using ipfs - push a JSON string into ipfs and return the hash.
     * @param query = {"filedata": a JSON str}
     * @response response = {
     *               result = "success" or "failure",
     *               result_text = str,
     *               hash = str
     *           }
     */
    handlers.pushToIpfs = function (query) {
        printQuery(query);
        var response = {};
        var filedata = query.filedata;

        if (filedata == "") {
            response.result = "failure";
            response.result_text = "Empty filedata";
            return network.getHttpResponseJSON(JSON.stringify(response));
        }
        
        var hashObj = ipfs.PushFileData(filedata);
        if(hashObj.Error !== "") {
            response.result = "failure";
            response.result_text = "Someting wrong with ipfs";
            return network.getHttpResponseJSON(JSON.stringify(response));
        } else {
            response.result = "success";
            response.hash = hashObj.Data;
            return network.getHttpResponseJSON(JSON.stringify(response));
        }
    }

    /**
     * Demo for using ipfs - get a JSON string from ipfs by a filename.
     * @param query = {"hash" : str}
     * @response response = {
     *               result : "success" or "failure",
     *               result_text : str
     *               filedata : a JSON str
     *           }
     */
    handlers.getFromIpfs = function (query) {
        printQuery(query);
        var response = {};
        var fileObj = ipfs.GetFile(query.hash, false);
        
        if(fileObj.Error !== "") {
            response.result = "failure";
            response.result_text = "Cannot get a file.";
            return network.getHttpResponseJSON(JSON.stringify(response));
        } else {
            response.result = "success";
            response.filedata = fileObj.Data;
            return network.getHttpResponseJSON(JSON.stringify(response));
        }
    }

	// functions for testing
    /**
     * Print out all the properties (name : val) in the query.
     */
    function printQuery(query) {
        Object.getOwnPropertyNames(query).forEach(function (element, index, array) {
            var info = element + " : " + query[element];
            Println(info);
        });
    }

    function generatePublicKeys(voterNum, passwordLength) {
        return svApi.generatePublicKeys(voterNum, passwordLength);
    }

    function generatePrivateKey(passwordLength) {
        return svApi.generatePrivateKey(passwordLength);
    }

    function registerVoters(pollName, publicKeys) {
        for (var i = 0; i < publicKeys.length; i++) {
            registerUser("voter", publicKeys[i].id, publicKeys[i].password);
            registerElection(pollName, publicKeys[i].id, "voter");
        }
    }

    function registerAnonymousVoter(pollName, privateKey) {
        registerUser("anonymousVoter", privateKey.id, privateKey.password);
        registerElection(pollName, privateKey.id, "anonymousVoter");
    }

    function registerElection(pollName, username, target) {
        svApi.registerElection(pollName, username, target);
        if (COMMITTING) {
            monk.Commit();
        }
        svApi.registerElection(pollName, username, target + "-poll");
        if (COMMITTING) {
            monk.Commit();
        }
        return "success";
    }

    function deregisterElection(pollName, username, target) {
        svApi.deregisterElection(pollName, username, target);
        if (COMMITTING) {
            monk.Commit();
        }
        return "success";
    }

    function electionNameExists(electionName) {
        return svApi.electionNameExists(electionName);
    }
    
    function userExists(identity, username) {
        return svApi.userExists(identity, username);
    }

    function registerUser(identity, username, password) {
        if (userExists(identity, username)) {
            return "usernameExist";
        }
        else {
            svApi.registerUser(identity, username);
            if (COMMITTING) {
                monk.Commit();
            }
            setUserPassword(identity, username, password);
            if (COMMITTING) {
                monk.Commit();
            }
            return "success";
        }        
    }
	
    function checkUser(identity, username, password) {
        if (!userExists(identity, username)) {
            return "userDoesntExist";
        }
        else {
            if (svApi.checkUserPassword(identity, username, password)) {
                return "success";
            }
            return "wrongPassWord";
        }
    }

    function createElection(query) {
        var response = {};
        var organizerName = query.organizerName;
        var pollName = query.pollName;
        var des = {};
        des.moduleName = query.moduleName;
        des.pollName = query.pollName;
        des.pollDes = query.pollDes;
        des.canoptNum = query.canoptNum;
        des.rulesNum = query.rulesNum;
        des.canOpts = query.canOpts;

        if (electionNameExists(pollName)) {
            response.result = "pollNameExist";
            response.publicKeys = null;
        }
        else {
            svApi.createElection(organizerName, pollName);
            if (COMMITTING) {
                monk.Commit();
            }
            setOpenTime(pollName, parseInt(query.openTime, 10));
            if (COMMITTING) {
                monk.Commit();
            }
            setCloseTime(pollName, parseInt(query.closeTime, 10));
            if (COMMITTING) {
                monk.Commit();
            }
            setDescription(pollName, JSON.stringify(des));
            if (COMMITTING) {
                monk.Commit();
            }
            response.result = "success";
            response.publicKeys = generatePublicKeys(query.voterNum, 8);
        }
        return response;
    }

    function changePassword(identity, username, password) {
        setUserPassword(identity, username, password);
        if (COMMITTING) {
            monk.Commit();
        }
        return "success";
    }

    function setOpenTime(electionName, openTime) {
        return svApi.setOpenTime(electionName, openTime);
    }

    function setCloseTime(electionName, closeTime) {
        return svApi.setCloseTime(electionName, closeTime);
    }

    function setDescription(electionName, description) {
        return svApi.setDescription(electionName, description);
    }

    function getAvailablePolls(identity, username) {
        return svApi.getAvailablePolls(identity, username);
    }

    function getPollBasicInfo(electionName) {
        return svApi.getPollBasicInfo(electionName);
    }

    function setUserPassword(identity, username, password) {
        return svApi.setUserPassword(identity, username, password);
    }

    function validateVoter(username, electionName) {
        return svApi.validateVoter(username, electionName);
    }

	this.init = function() {
		svApi.init();
	}

}

// Initialization
var sv = new SmartVote();
Println("Starting SmartVote");
sv.init();
network.registerIncomingHttpCallback(sv.handle);
Println("SmartVote Initialized");
