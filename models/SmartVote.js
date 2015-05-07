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

	handlers.showVotings = function(urlObj) {
		return getPolls();
	}

	handlers.addVt = function(urlObj) {
		return createPollAccount(urlObj.path.toString().split("&")[1], urlObj.path.toString().split("&")[2], urlObj.path.toString().split("&")[3], urlObj.path.toString().split("&")[4], urlObj.path.toString().split("&")[5], urlObj.path.toString().split("&")[6], urlObj.path.toString().split("&")[7]);
	}

	handlers.getOpnum = function(urlObj, httpReq) {
		return network.getHttpResponseJSON(svApi.getOpnum(urlObj.path.toString().split("&")[1]));
	}

	handlers.getDescription = function(urlObj, httpReq) {
		return network.getHttpResponseJSON(svApi.getDescription(urlObj.path.toString().split("&")[1]));
	}

	handlers.getOpentime = function(urlObj, httpReq) {
		return network.getHttpResponseJSON(svApi.getOpentime(urlObj.path.toString().split("&")[1]));
	}

	handlers.getClosetime = function(urlObj, httpReq) {
		return network.getHttpResponseJSON(svApi.getClosetime(urlObj.path.toString().split("&")[1]));
	}

	handlers.getCreatetime = function(urlObj, httpReq) {
		return network.getHttpResponseJSON(svApi.getCreatetime(urlObj.path.toString().split("&")[1]));
	}

	handlers.getCreatorusrname = function(urlObj, httpReq) {
		return network.getHttpResponseJSON(svApi.getCreatorusrname(urlObj.path.toString().split("&")[1]));
	}

	handlers.showStat = function(urlObj, httpReq) {
		return getStat(urlObj.path.toString().split("&")[1]);
	}

	handlers.vote = function(urlObj, httpReq) {
		return vote(urlObj.path.toString().split("&")[1], urlObj.path.toString().split("&")[2]);
	}

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
	// TODO
    handlers.login = function (query) {
        var response = {};
        printQuery(query);
        var identity = query.identity;
        if (identity === "organizer") {
            // login in as an organizer
        } else if (identity === "voter") {
            // login in as a voter
        } else {
            return network.getHttpResponse(400, {}, "Bad query.");
        }
        response.result = "success";
        return network.getHttpResponseJSON(JSON.stringify(response));
    }

    /**
     * Creating polls in module1.
     * @param query = {
     *            "pollName" : 
     *            "organizerName" : 
     *            "openTime" : 13 digits
     *            "closeTime" : 13 digits
     *            "pollDes" : the description of the poll
     *            "voterNum" : how many voters in the poll
     *            "canoptNum" : how many candidates/options in the poll
     *            "rulesNum" : a voter can vote for how many candidates/options in one voting
     *            "canOpts": [{candidate1 name:,candidate1 description},{,},{,},] --- an array that contains 
     *                all the detail information of all candidates/options in the poll. Each slot in the array includes
     *                an object {name:?,description:?}
     *        }
     * @response response = {
     *               "result": "success" or "pollNameExist"
     *               "publicKeys": [{"id":"01", "password":"Doe"},
     *                             {"id":"02", "password":"Smith"},
     *                             {"id":"03", "password":"Jones"}]
     *                             An array that contains all the public id and
     *                             random password for each voters in the poll.
     *                             Each slot in the poll should contain a JSON
     *                             object with "id" and "password"
     *           }
     */
    // TODO
    handlers.module1CreatePoll = function (query) {
        /*
         * Data structure in request "module1CreatePoll":
         * a stringtified JSON object that contains:
         *  Data structure of the response of the "module1CreatPoll":
                  */
        printQuery(query); // TODO can be removed

        var pollName = query.pollName;
        var organizerName = query.organizerName;
        var openTime = Number(query.openTime);
        var closeTime = Number(query.closeTime);
        var pollDes = query.pollDes;
        var voterNum = Number(query.voterNum);
        var canoptNum = Number(query.canoptNum);
        var rulesNum = Number(query.rulesNum);
        var canOpts = query.canOpts;
        
        var response = {};
        if (pollNameExists(pollName)) {
            response.result = "pollNameExist";
            response.publicKeys = null;
            return network.getHttpResponseJSON(JSON.stringify(response));
        }
        reponse.result = "success";
        reponse.publicKeys = generatePublicKeys(voterNum);
        return network.getHttpResponseJSON(JSON.stringify(response));
    }

    /**
     * Get all the basic information about a particular poll/election.
     * @param query = {}
     * 
     * @response response = {
     *     "result":"success" | "fail"
     *     "pollBasicInfo":{
     *         "pollName": str, 
     *         "organizerName": str,
     *         "openTime":
     *         "closeTime":
     *         "pollDes":
     *      }
     * }
     */
    handlers.showPollBasicInfo = function (query) {
        printQuery(query);
        var pollName = query.selectedPollName;
        /*
         * response = {
         *            }
         */
        var response = {};
        if (!pollNameExists(pollName)) {
            response.result = "fail";
            response.pollBasicInfo = null;
            return network.getHttpResponseJSON(JSON.stringify(response));
        }
        // TODO
        response.result = "success";
        response.pollBasicInfo = {};
        response.pollBasicInfo.pollName = pollName;
        return network.getHttpResponseJSON(JSON.stringify(response));
    }
    
    /**
     * Show all the polls that:
     * 1. are created by the user (if an organizer)
     * 2. the user can participate (if a voter)
     * @param query = {"username" : str, "identity" : str}
     * 
     * @response response = {
     *               "result": "success" or others
     *               "pollslist": ["pollname1","pollname2","pollname3", ...]
     *           }
     */
    handlers.showPollList = function (query) {
        printQuery(query);
        var response = {};
        var username = query.username;
        var identity = query.identity;
        if (identity === "organizer" && organizerExist(username)) {
            // TODO
            // get all the polls that are created by the organizer
            // set up response
        } else if (identity === "voter" && voterExist(username)) {
            // TODO
            // get all the polls that the voter can participate in
            // set up response
        } else {
            return network.getHttpResponse(400, {},
                    "Bad query");
        }
        return network.getHttpResponseJSON(JSON.stringify(response));
    }
    
    /**
     * Check if the voter has already get the second account for a particular
     * poll.
     * @param query = {"username": str, "pollName": str}
     * @response response = {
     *               "result" : "secondPasswordSet" or "secondtPasswordNotSet"
     *                           or "voterNotInList"
     *           }
     */
    handlers.checkVoterSecondAccount = function (query) {
        printQuery(query);
        var username = query.username;
        var pollName = query.pollName;
        // TODO
    }
    
    /**
     * 
     * @param query = {
     *            "username" : str
     *            "secondId" : str
     *            "secondPassword" : str
     *            "selectedPollName" : str
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
        var pollName = query.selectedPollName;
        
        var response = {};
        // TODO
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

    // functions in the middle
    function generatePublicKeys(voterNum) {
        // TODO
    }

	// functions to talk with the blockchain
    function pollNameExists(pollName) {
        // TODO
        return true;
    }
    
    function organizerExists(username) {
        // TODO
        return false;
    }
    
    function voterExists(username) {
        // TODO
        return false;
    }

	function getPolls() {
		return network.getHttpResponseJSON(svApi.showPolls());
	}

	function createPollAccount(plname, opnum, description, opentime, closetime ,createtime, creatorusrname) {
		svApi.createPollAccount(plname);
		if (COMMITTING) {
			monk.Commit();
		}
		svApi.initPoll(plname, opnum, description, opentime, closetime ,createtime, creatorusrname);
		if (COMMITTING) {
			monk.Commit();
		}
		svApi.setStatus(plname, 1);
		if (COMMITTING) {
			monk.Commit();
		}
		return network.getHttpResponseJSON("success");
	}

	function getStat(plname) {
		return network.getHttpResponseJSON(svApi.getStat(plname));
	}

	function vote(plname, opnum) {
		var hash = svApi.vote(plname, opnum);
		if (COMMITTING) {
			monk.Commit();
		}
		return network.getHttpResponseJSON(hash);
	}
	
	// functions talking with ipfs
	/**
	 * Writes a file to the ipfs file system and returns the hash
     * as a hex string.
     * NOTE: The hash is stripped of its first two bytes, in order to 
     * get a 32 byte value. The first byte is the hashing algorithm
     * used (it's always 0x12), and the second is the length of the
     * hash (it is always 0x20). See DappCore.ipfsHeader.
     */
    function writeFileToIpfs(data) {
        var hashObj = ipfs.PushFileData(data);
        if(hashObj.Error !== "") {
            return "";
        } else {
            // This would be the 32 byte hash (omitting the initial "1220").
            return "0x" + hashObj.Data.slice(6);
        }
    };

	this.testshowVotings = function() {
		return svApi.showPolls();
	}

	this.test = function() {
		var plAddr = svApi.createPollAccount("myFirstPoll");
		if (COMMITTING) {
			monk.Commit();
		}
		Println("8888888888888888888\n" + sutil.hexToString(svApi.test1("myFirstPoll")));
	}

	this.test1 = function() {
		var plAddr = svApi.createPollAccount("mySecondPoll");
		if (COMMITTING) {
			monk.Commit();
		}
		Println("9999999999999999999\n" + sutil.hexToString(svApi.test1("mySecondPoll")));
	}

	this.test2 = function() {
		var plname = "myFirstPoll";
		svApi.createPollAccount(plname);
		if (COMMITTING) {
			monk.Commit();
		}
		svApi.initPoll(plname, 20, "2222", "3333", "444444" ,"55555555", "6666666666");
		if (COMMITING) {
			monk.Commit();
		}
		println("ccccccccccccccccc" + svApi.test1(plname));
	}

	this.test3 = function() {
		var n = 20;
		var s = n.toString(16);
		Println("aaaaaaaaaaaaaa" + n);
		Println("vvvvvvvvvvvvvvvv" + s);
	}

	this.init = function() {
		svApi.init();
	}

}

// Initialization
var sv = new SmartVote();
Println("Starting SmartVote");
sv.init();
//sv.test();
//sv.test1();
//sv.test3();
//sv.testshowVotings();
//sv.test2();
//sv.test3();
network.registerIncomingHttpCallback(sv.handle);
Println("SmartVote Initialized");