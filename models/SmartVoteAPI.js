/**
 * The SmartVoteAPI class
 */
function SmartVoteAPI() {

	var dougAddr = RootContract;
	var amAddr = "";
	var emAddr = "";
	var monkAddr = "";
	var mysubs = [];

	var txData = {};

	// Codes for polling
	// 0 - non existing
	// 1 - pending
	// 2 - failed
	// 3 - succeeded
	this.checkTx = function(txHash){
		Println("CHECKING HASH: " + txHash);
		var txObj = txData[txHash];
		if(txObj === undefined){
			return 0;
		}
		// failedF
		if (txObj.status === 2){
			delete txData[txHash];
		} else if (txObj.status === 4){
			delete txData[txHash];
		}
		return txObj.status;
	}

	this.newTxObj = function(){
		return {"status" : 0 };
	}

	this.statUpdateBlock = function(event){
		var blockObj = event.Resource;
		if(blockObj.Transactions.length === 0){
			return;
		}
		var txs = blockObj.Transactions;
		for(var i = 0; i < txs.length; i++){
			var tx = txs[i];
			var hash = '0x' + tx.Hash;
			var txObj = txData[hash];
			if(txObj !== undefined && txObj.status == 3){
				txObj.status = 4;
			}
			if(hash === accTx){
				myaccAddr = esl.kv.Value(afAddr, StringToHex("accounts"), myMonkAddr);
				Println("Updating myaccAddr: " + myaccAddr);
				accTx = "";
			}
		}
	}

	this.statUpdatePost = function(event){
		var hash = "0x" + event.Resource.Hash;
		Println("Post tx received: " + hash);
		var txObj = txData[hash];
		if(txObj !== undefined && txObj.status < 3){
			txObj.status = 3;
		}

	}

	this.statUpdateFail = function(event){
		var txObj = txData[event.Resource.Hash];
		if(txObj !== undefined){
			txObj.status = 2;
		}
	}

	// functions for adding new type of txs
	this.trackTx = function(txHash){
		Println("Added hash for tracking: " + txHash.slice(0,6) + "...");
		var txObj = this.newTxObj();
		txObj.status = 1;
		txData[txHash] = txObj;
		Println("Added tx data");
	}
/*
	this.createPollAccount = function(plname) {
		var txData = [];
		Println("Creating poll in blockchain.");
		txData.push("create");
		txData.push(plname);
		var hash = sendMsg(plfAddr, txData);
		return hash;
	}

	this.initPoll = function(plname, opnum, description, opentime, closetime ,createtime, creatorusrname) {
		var txData = [];
		Println("Initing poll in blockchain.");
		txData.push("set");
		txData.push("0x" + opnum.toString(16));
		txData.push(description);
		txData.push(opentime);
		txData.push(closetime);
		txData.push(createtime);
		txData.push(creatorusrname);
		var hash = sendMsg(plname2Addr(plname), txData);
		return hash;
	}

	this.setStatus = function(plname, status) {
		var txData = [];
		txData.push("setstatus");
		txData.push("0x" + status.toString(16));
		var hash = sendMsg(plname2Addr(plname), txData);
		return hash;
	}

	this.checkStatus = function(plname) {
		return parseInt(esl.single.Value(plname2Addr(plname), sutil.stringToHex("status")), 16);
	}

	this.getDescription = function(plname) {
		return sutil.hexToString(esl.single.Value(plname2Addr(plname), sutil.stringToHex("description")));
	}

	this.getOpentime = function(plname) {
		return sutil.hexToString(esl.single.Value(plname2Addr(plname), sutil.stringToHex("opened")));
	}

	this.getClosetime = function(plname) {
		return sutil.hexToString(esl.single.Value(plname2Addr(plname), sutil.stringToHex("closed")));
	}

	this.getCreatetime = function(plname) {
		return sutil.hexToString(esl.single.Value(plname2Addr(plname), sutil.stringToHex("created")));
	}

	this.getCreatorusrname = function(plname) {
		return sutil.hexToString(esl.single.Value(plname2Addr(plname), sutil.stringToHex("creator")));
	}

	this.setOpnum = function(plname, opnum) {
		var txData = [];
		opnum = parseInt(opnum);
		txData.push("setopnum");
		txData.push("0x" + opnum.toString(16));
		var hash = sendMsg(plname2Addr(plname), txData);
		return hash;
	}

	this.getOpnum = function(plname) {
		return esl.single.Value(plname2Addr(plname), sutil.stringToHex("opnum")).slice(2);
	}

	this.refreshPoll = function(plname) {
		plAddr = plname2Addr(plname);
		var opentime = esl.single.Value(plAddr, StringToHex("opentime"));
		var closetime = esl.single.Value(plAddr, StringToHex("closetime"));
		var status = esl.single.Value(plAddr, StringToHex("status"));
		var crttime = Date();
		if (crttime < closetime && crttime > opentime && status == 0) {
			setStatus(plname, 1);
		}
		else if (status == 1){
			setStatus(plname, 0);
		}
	}

	this.vote = function(plname, opnum) {
		var txData = [];
		opnum = parseInt(opnum);
		txData.push("vote");
		txData.push("0x" + opnum.toString(16));
		var hash = sendMsg(plname2Addr(plname), txData);
		return hash;
	}

	this.showPolls = function() {
		var plnum = esl.single.Value(plfAddr, sutil.stringToHex("plnum")).slice(2);
		if (plnum == 0) {
			Println("No poll in block chain.");
			return 0;
		}
		var pllist = "";
		for (var i = 1; i <= plnum; i++) {
			pllist += sutil.hexToString(esl.kv.Value(plfAddr, sutil.stringToHex("pllist"), i)) + ";";
		}
		pllist = pllist.slice(0, pllist.length - 1);
		Println("poll list:  " + pllist);
		return pllist;
	}

	this.getStat = function(plname) {
		plAddr = plname2Addr(plname);
		var stat = "";
		var opnum = this.getOpnum(plname);
		for (var i = 1; i <= opnum; i++) {
			stat += parseInt(esl.kv.Value(plAddr, sutil.stringToHex("ops"), i).slice(2)) + ";";
		}
		stat = stat.slice(0, stat.length - 1);
		return stat;
	}

	function plname2Addr(plname) {
		var pubAddr = esl.ll.Main(plfAddr, sutil.stringToHex("plnames"), sutil.stringToHex(plname));
		return esl.kv.Value(plfAddr, sutil.stringToHex("polls"), pubAddr);
	}
*/

    this.organizerExists = function(username) {
        if (esl.ll.Main(amAddr, sutil.stringToHex("adminNameToAdminAddress"), sutil.stringToHex(username)) != "0x0") {
            return true;
        };
        return false;
    }

    this.voterExists = function(username) {
        if (esl.ll.Main(amAddr, sutil.stringToHex("voterNameToVoterAddress"), sutil.stringToHex(username)) != "0x0") {
            return true;
        };
        return false;
    }

    this.electionNameExists = function(electionName) {
        if (esl.ll.Main(emAddr, sutil.stringToHex("electionNameToElectionAddress"), sutil.stringToHex(electionName)) != "0x0") {
            return true;
        }
        return false;
    }

    this.registerOrganizer = function(username) {
        var txData = [];
        txData.push("createAdmin");
        txData.push(username);
        var hash = sendMsg(amAddr, txData);
		return hash;
    }

    this.registerVoter = function(username) {
        var txData = [];
        txData.push("createVoter");
        txData.push(username);
        var hash = sendMsg(amAddr, txData);
		return hash;
    }

    this.registerElection = function(username, pollName) {
        var txData = [];
        txData.push("registerElection");
        txData.push(electionNameToElectionAddress(pollName));
        var hash = sendMsg(voterNameToVoterAddress(username), txData);
		return hash;

    }

    this.setOrganizerPassword = function(username, password) {
        var txData = [];
        txData.push("setPassword");
        txData.push(password);
        var hash = sendMsg(adminNameToAdminAddress(username), txData);
        return hash;
    }

    this.setVoterPassword = function(username, password) {
        var txData = [];
        txData.push("setPassword");
        txData.push(password);
        var hash = sendMsg(voterNameToVoterAddress(username), txData);
        return hash;
    }

    this.checkOrganizerPassword = function(username, password) {
        if (password == sutil.hexToString(esl.single.Value(adminNameToAdminAddress(username), sutil.stringToHex("password")))) {
            return true;
        }
        return false;
    }

    this.checkVoterPassword = function(username, password) {
        if (password == sutil.hexToString(esl.single.Value(voterNameToVoterAddress(username), sutil.stringToHex("password")))) {
            return true;
        }
        return false;
    }

    this.createElection = function(username, electionName) {
        var adminAddr = adminNameToAdminAddress(username);
        var txData = [];
        txData.push("createElection");
        txData.push(adminAddr);
        txData.push(electionName);
        var hash = sendMsg(adminNameToAdminAddress(username), txData);
        return hash;
    }

    this.setOpenTime = function(electionName, openTime) {
        var txData = [];
        txData.push("setSingleAttribute");
        txData.push("opened");
        txData.push(openTime.toString());
        var hash = sendMsg(electionNameToElectionAddress(electionName), txData);
        return hash;
    }

    this.setCloseTime = function(electionName, closeTime) {
        var txData = [];
        txData.push("setSingleAttribute");
        txData.push("closed");
        txData.push(closeTime.toString());
        var hash = sendMsg(electionNameToElectionAddress(electionName), txData);
        return hash;
    }

    this.setDescription = function(electionName, description) {
        return ;
    }

    this.generatePublicKeys = function(voterNum) {
        var id = "";
        var password = "";
        var publicKeys = [];
        var idPrefix = generateIdPrefix();
        for (var i = 0; i < voterNum; i++) {
            id = idPrefix + padLeft((i + 1).toString(), voterNum.toString().length);
            password = generateRandomPassword(8);
            publicKeys.push({"id":id, "password":password});
        }
        return publicKeys;
    }

    function generateIdPrefix() {
        return parseInt((new Date()).getTime(), 10).toString(36);
    }

    function generateRandomPassword(passwordLength) {
        var password = new Array(passwordLength + 1).join().replace(/(.|$)/g, function(){return ((Math.random()*36)|0).toString(36)[Math.random()<.5?"toString":"toUpperCase"]();});;
        return password;
    }
    
    function padLeft(indexStr,length){ 
        if(indexStr.length >= length) {
            return indexStr; 
        }
        else {
            return padLeft("0" +indexStr, length); 
        }
} 

    function contractNameToAddress(contractName) {
	    return esl.ll.Main(dougAddr, sutil.stringToHex("DOUG"), sutil.stringToHex(contractName));
	}

    function adminNameToAdminAddress(username) {
        return esl.ll.Main(amAddr, sutil.stringToHex("adminNameToAdminAddress"), sutil.stringToHex(username));
    }

    function voterNameToVoterAddress(username) {
        return esl.ll.Main(amAddr, sutil.stringToHex("voterNameToVoterAddress"), sutil.stringToHex(username));
    }

    function anonymousVoterNameToAnonymousVoterAddress(username) {
        return esl.ll.Main(amAddr, sutil.stringToHex("anonymousVoterNameToAnonymousVoterAddress"), sutil.stringToHex(username));
    }

    function electionNameToElectionAddress(electionName) {
        return esl.ll.Main(emAddr, sutil.stringToHex(electionName), sutil.stringToHex(electionName));
    }

	this.init = function() {
		Println("Initializing SmartVote");
		// Start subscribing to tx events.
		//this.sub();
		Println("DOUG address: " + dougAddr);
		emAddr = contractNameToAddress("electionManager");
		Println("emAddr: " + emAddr);
		amAddr = contractNameToAddress("accountManager");
		Println("amAddr: " + amAddr);
		monkAddr = "0x" + monk.ActiveAddress().Data;
		Println("monkAddr: " + monkAddr);
	}

	this.test1 = function(plname) {
		Println("vvvvvvvvv");
		return storageAt(plname2addr(plname), 0xCCCC);
	}

    this.test2 = function() {
        var addr = esl.ll.Main(amAddr, sutil.stringToHex("adminList"), sutil.stringToHex("HEAD"));
        return esl.single.Value(addr, sutil.stringToHex("accountManagerAddress"));
    }

    this.test3 = function() {
        var str = '{"person":[name: "Bob", occupation: "Plumber"]}';
        Println("bbbbhhhhhhhhhhhhhhc     " + str);
        var bytes = [];
        for (var i = 0; i < str.length; i++)
        {
            bytes.push(str.charCodeAt(i));
        }
        Println("bbbbbbbbbbbbbcc     " + str);
        var hash = ipfs.PushFileData(str);
        if (hash === "") {
            Println("Error when adding file to ipfs.");
            return "0x0";
        }
        return hash;
    }
};
