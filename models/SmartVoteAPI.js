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

    this.userExists = function(identity, username) {
        if (((identity === "organizer") && (esl.ll.Main(amAddr, sutil.stringToHex("adminNameToAdminAddress"), sutil.stringToHex(username)) != "0x0")) || ((identity === "voter") && (esl.ll.Main(amAddr, sutil.stringToHex("voterNameToVoterAddress"), sutil.stringToHex(username)) != "0x0")) || ((identity === "anonymousVoter") && (esl.ll.Main(amAddr, sutil.stringToHex("anonymousVoterNameToAnonymousVoterAddress"), sutil.stringToHex(username)) != "0x0"))) {
            return true;
        }
        return false;
    }

    this.electionNameExists = function(electionName) {
        if (esl.ll.Main(emAddr, sutil.stringToHex("electionNameToElectionAddress"), sutil.stringToHex(electionName)) != "0x0") {
            return true;
        }
        return false;
    }

    this.registerUser = function(identity, username) {
        var txData = [];
        if (identity === "organizer") {
            txData.push("createAdmin");
        } else if (identity === "voter") {
            txData.push("createVoter");
        } else if (identity === "anonymousVoter") {
            txData.push("createAnonymousVoter");
        }
        txData.push(username);
        var hash = sendMsg(amAddr, txData);
		return hash;
    }

    this.registerElection = function(username, pollName) {
        var txData = [];
        txData.push("registerElection");
        txData.push(electionNameToElectionAddress(pollName));
        var hash = sendMsg(userNameToUserAddress("voter", username), txData);
		return hash;
    }

    this.setUserPassword = function(identity, username, password) {
        var txData = [];
        txData.push("setPassword");
        txData.push(password);        
        var hash = sendMsg(userNameToUserAddress(identity, username), txData);
        return hash;
    }

    this.checkUserPassword = function(identity, username, password) {
        if (((identity === "organizer") && (password == sutil.hexToString(esl.single.Value(userNameToUserAddress(identity, username), sutil.stringToHex("password"))))) || ((identity === "voter") && (password == sutil.hexToString(esl.single.Value(userNameToUserAddress(identity, username), sutil.stringToHex("password"))))) || ((identity === "anonymousVoter") && (password == sutil.hexToString(esl.single.Value(userNameToUserAddress(identity, username), sutil.stringToHex("password")))))) {
            return true;
        }
        return false;
    }

    this.createElection = function(username, electionName) {
        var txData = [];
        txData.push("createElection");
        txData.push(userNameToUserAddress("organizer", username));
        txData.push(electionName);
        var hash = sendMsg(emAddr, txData);
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
        var txData = [];
        var fileHash = writeFile(description);
        txData.push("setSingleAttribute");
        txData.push("hash");
        txData.push(fileHash);
        var hash = sendMsg(electionNameToElectionAddress(electionName), txData);
        return hash;
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

    this.getAvailablePolls = function(identity, username) {
        if (identity === "organizer") {
            var pollAddr = esl.ll.Main(emAddr, sutil.stringToHex("electionList"), sutil.stringToHex("HEAD"));
            var pollNames = [];
            while (pollAddr != "0x0") {
                if (getElectionOwner("electionAddress", pollAddr, "username") === username) {
                    pollNames.push(electionAddressToElectionName(pollAddr));
                };
                pollAddr = esl.ll.Main(emAddr, sutil.stringToHex("electionList"), pollAddr);
            }
        } else {
            var pollAddr = esl.ll.Main(userNameToUserAddress(identity, username), sutil.stringToHex("electionList"), sutil.stringToHex("HEAD"));
            var pollNames = [];
            while (pollAddr != "0x0") {
                pollNames.push(electionAddressToElectionName(pollAddr));
                pollAddr = esl.ll.Main(userNameToUserAddress(identity, username), sutil.stringToHex("electionList"), pollAddr);
            }
        }
        return pollNames;
    }

    this.getPollBasicInfo = function(electionName) {
        var info = {};
        info.pollName = electionName;
        info.organizerName = getElectionOwner("electionName", electionName, "username");
        info.openTime = getOpenTime(electionName);
        info.closeTime = getCloseTime(electionName);
        info.pollDes = getDescription(electionName);
        return info;
    }

    function generateIdPrefix() {
        return parseInt((new Date()).getTime(), 10).toString(36);
    }

    function generateRandomPassword(passwordLength) {
        var password = new Array(passwordLength + 1).join().replace(/(.|$)/g, function(){return ((Math.random()*36)|0).toString(36)[Math.random()<.5?"toString":"toUpperCase"]();});
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

    function userNameToUserAddress(identity, username) {
        var varStr = "";
        if (identity === "organizer") {
            varStr = "adminNameToAdminAddress";
        } else if (identity === "voter") {
            varStr = "voterNameToVoterAddress";
        } else if (identity === "anonymousVoter") {
            varStr = "anonymousVoterNameToAnonymousVoterAddress";
        }
        return esl.ll.Main(amAddr, sutil.stringToHex(varStr), sutil.stringToHex(username));
    }

    function userAddressToUserName(identity, userAddress) {
        var varStr = "";
        if (identity === "organizer") {
            varStr = "adminAddressToAdminName";
        } else if (identity === "voter") {
            varStr = "voterAddressToVoterName";
        } else if (identity === "anonymousVoter") {
            varStr = "anonymousVoterAddressToAnonymousVoterName";
        }
        return sutil.hexToString(esl.ll.Main(amAddr, sutil.stringToHex(varStr), userAddress));
    }

    function electionNameToElectionAddress(electionName) {
        return esl.ll.Main(emAddr, sutil.stringToHex("electionNameToElectionAddress"), sutil.stringToHex(electionName));
    }

    function electionAddressToElectionName(electionAddress) {
        return sutil.hexToString(esl.ll.Main(emAddr, sutil.stringToHex("electionAddressToElectionName"), electionAddress));
    }

    function getElectionOwner(electionStrType, electionStr, userStrType) {
        var owner = "";
        if (electionStrType === "electionName") {
            electionStr = electionNameToElectionAddress(electionStr);
        }
        owner = esl.single.Value(electionStr, sutil.stringToHex("owner"));
        if (userStrType === "username") {
            owner = userAddressToUserName("organizer", owner);
        }
        return owner;
    }

    function getOpenTime(electionName) {
        return sutil.hexToString(esl.single.Value(electionNameToElectionAddress(electionName), sutil.stringToHex("opened")));
    }

    function getCloseTime(electionName) {
        return sutil.hexToString(esl.single.Value(electionNameToElectionAddress(electionName), sutil.stringToHex("closed")));
    }

    function getDescription(electionName) {
        return getFile(esl.single.Value(electionNameToElectionAddress(electionName), sutil.stringToHex("hash")));
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

    this.test4 = function() {
        return electionNameToElectionAddress("123123");
    }
};
