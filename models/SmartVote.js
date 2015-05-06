function SmartVote() {

	var COMMITTING = true;

	var handlers = {};
	svApi = new SmartVoteAPI();

	// Used to handle all incoming requests. It is set as the callback for
	// incominghttp requests. It parses the request URL into an object, then
	// pass that object into the appropriate sub handler (should one exist).
	// Sub handlers needs to return a response object.
	this.handle = function (httpReq) {
		Println("Receiving request...");
		
		// all our queries go in body
		
		// Println("http request:");
		// Println(typeof (httpReq));    // object
		// Println(httpReq);
		// The structure of httpReq:
		// httpReq = {
		//    Method:GET     // or POST
		//    Host:localhost:3000
		//    Header:{...}
		//    Body:     // query goes here, no matter GET or POST
		//    URL:{
		//        User:<nil>
		//        Host:
		//        Path:/apis/SmartVote/getContractAddress
		//        RawQuery: // always empty
		//        Fragment:
		//        Scheme:
		//        Opaque:
		//    }
		// }

		var urlObj = network.parseUrl(httpReq);
		// The structure of urlObj
		// urlObj = {
		//     path:[getContractAddress]
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
		// Return an error.
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
	
    handlers.login = function (query) {
        Println(query.username);
        Println(query.password);
        var response = {};
        response.result = "success";
        return network.getHttpResponseJSON(JSON.stringify(response));
    }
    
    /**
     * Creating polls in module1
     */
    handlers.module1CreatePoll = function (query) {
        /*
         * Data structure in request "module1CreatePoll":
         * a stringtified JSON object that contains:
         *     "pollName" : 
         *     "organizerName" : 
         *     "openTime" : 13 digits
         *     "closeTime" : 13 digits
         *     "pollDes" : the description of the poll
         *     "voterNum" : how many voters in the poll
         *     "canoptNum" : how many candidates/options in the poll
         *     "rulesNum" : a voter can vote for how many candidates/options in one voting
         *     "canOpts": [{candidate1 name:,candidate1 description},{,},{,},] --- an array that contains 
         *                all the detail information of all candidates/options in the poll. Each slot in the array includes
         *                an object {name:?,description:?}
         * 
         *  Data structure of the response of the "module1CreatPoll":
         *     "result": "success"(if all good)
         *               "pollNameExist" (the poll name is existed)
         *     "publicKeys": An array that contains all the public id and random password
         *                   for each voters in the poll. Each slot in the poll should contain
         *                   a JSON object with "id" and "password"
         *                   [{"id":"01", "password":"Doe"},
         *                    {"id":"02", "password":"Smith"},
         *                    {"id":"03", "password":"Jones"}]
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
    
    handlers.showPollBasicInfo = function (query) {
        printQuery(query);
        var pollName = query.selectedPollName;
        /*
         * response = {"result":"success" | "fail"
         *             "pollBasicInfo":{
         *                 "pollName": "aaa", 
         *                 "organizerName": "bbb",
         *                 "openTime": new Date().getTime().toString(),
         *                 "closeTime": "2930841353650",//new Date().getTime().toString(),
         *                 "pollDes": "cccc"
         *                 }
         *            }
         */
        var response = {};
        if (!pollNameExists(pollName)) {
            response.result = "fail";
            response.pollBasicInfo = null;
            return network.getHttpResponseJSON(JSON.stringify(response));
        }
        response.result = "success";
        response.pollBasicInfo = {};
        response.pollBasicInfo.pollName = pollName;
        return network.getHttpResponseJSON(JSON.stringify(response));
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