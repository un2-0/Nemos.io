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
        if (((identity === "organizer") && (esl.ll.Main(amAddr, sutil.stringToHex("adminNameToAdminAddress"), sutil.stringToHex(username)) != "0x0")) || ((identity === "voter") && (esl.ll.Main(amAddr, sutil.stringToHex("voterNameToVoterAddress"), sutil.stringToHex(username)) != "0x0")) || ((identity === "anonymousVoter") && (esl.ll.Main(amAddr, sutil.stringToHex("anoNameToAnoAddress"), sutil.stringToHex(username)) != "0x0"))) {
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
        var hash;

        if (identity === "organizer") {
            txData.push("createAdmin");
        } else if (identity === "voter") {
            txData.push("createVoter");
        } else if (identity === "anonymousVoter") {
            txData.push("createAno");
        }
        txData.push(username);
        hash = sendMsg(amAddr, txData);
		return hash;
    }

    this.getVoters = function(electionName) {
        var voters = [];
        var userAddr = esl.ll.Main(electionNameToElectionAddress(electionName), sutil.stringToHex("voterList"), sutil.stringToHex("HEAD"));
        var username;
        var password;
        var distributed;

        while (userAddr != "0x0") {
            username = userAddressToUserName("voter", userAddr);
            password = sutil.hexToString(esl.single.Value(userAddr, sutil.stringToHex("password")));
            distributed = parseInt(esl.kv.Value(electionNameToElectionAddress(electionName), sutil.stringToHex("distributed"), userAddr), 10).toString();
            voters.push({"id": username, "password": password, "status": distributed});
            userAddr = esl.ll.Main(electionNameToElectionAddress(electionName), sutil.stringToHex("voterList"), userAddr);
        }
        return voters;
    }

    this.setDistributionStatus = function(electionName, username, distributed) {
        if (esl.ll.Main(electionNameToElectionAddress(electionName), sutil.stringToHex("reverseVoterList"), sutil.stringToHex(username)) != "0x0") {
            var txData = [];
            var hash;

            distributed = parseInt(distributed, 10);
            txData.push("setKvAttribute");
            txData.push("distributed");
            txData.push(userNameToUserAddress(username));
            txData.push("0x" + distributed.toString(16));
            hash = sendMsg(electionNameToEletionAddress(electionName), txData);
    		return hash;
        } else {
            return "Invalid Voter"
        }
    }

    this.registerElection = function(pollName, username, target) {
        var txData = [];
        var hash;

        if ((target === "voter") || (target === "anonymousVoter")) {
            txData.push("registerElection");
            txData.push(electionNameToElectionAddress(pollName));
            hash = sendMsg(userNameToUserAddress(target, username), txData);
        } else if (target === "voter-poll") {
            txData.push("registerVoter");
            txData.push(userNameToUserAddress("voter", username));
            hash = sendMsg(electionNameToElectionAddress(pollName), txData);
        } else if (target === "anonymousVoter-poll") {
            txData.push("registerAno");
            txData.push(userNameToUserAddress("anonymousVoter", username));
            hash = sendMsg(electionNameToElectionAddress(pollName), txData);
        }
		return hash;
    }

    this.deregisterElection = function(pollName, username, target) {
        var txData = [];
        var hash;

        if ((target === "voter") || (target === "anonymousVoter")) {
            txData.push("deregisterElection");
            txData.push(electionNameToElectionAddress(pollName));
            hash = sendMsg(userNameToUserAddress(target, username), txData);
        } else if (target === "voter-poll") {
            txData.push("deregisterVoter");
            txData.push(userNameToUserAddress("voter", username));
            hash = sendMsg(electionNameToElectionAddress(pollName), txData);
        } else if (target === "anonymousVoter-poll") {
            txData.push("deregisterAno");
            txData.push(userNameToUserAddress("anonymousVoter", username));
            hash = sendMsg(electionNameToElectionAddress(pollName), txData);
        }
		return hash;
    }

    this.setUserPassword = function(identity, username, password) {
        var txData = [];
        var hash;

        txData.push("setPassword");
        txData.push(password);        
        hash = sendMsg(userNameToUserAddress(identity, username), txData);
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
        var hash;

        txData.push("createElection");
        txData.push(userNameToUserAddress("organizer", username));
        txData.push(electionName);
        hash = sendMsg(emAddr, txData);
        return hash;
    }

    this.setOpenTime = function(electionName, openTime) {
        var txData = [];
        var hash;

        txData.push("setSingleAttribute");
        txData.push("opened");
        txData.push(openTime.toString());
        hash = sendMsg(electionNameToElectionAddress(electionName), txData);
        return hash;
    }

    this.setCloseTime = function(electionName, closeTime) {
        var txData = [];
        var hash;

        txData.push("setSingleAttribute");
        txData.push("closed");
        txData.push(closeTime.toString());
        hash = sendMsg(electionNameToElectionAddress(electionName), txData);
        return hash;
    }

    this.setOptions = function(electionName, optionNum) {
        var txData = [];

        optionNum = parseInt(optionNum, 10);
        txData.push("setOptions");
        txData.push("0x" + optionNum.toString());
        var hash = sendMsg(electionNameToElectionAddress(electionName), txData);
        return hash;
    }

    this.setDescription = function(electionName, description) {
        var txData = [];
        var fileHash = writeFile(description);

        txData.push("setSingleAttribute");
        txData.push("desHash");
        txData.push(fileHash);
        var hash = sendMsg(electionNameToElectionAddress(electionName), txData);
        return hash;
    }

    this.initLog = function(electionName) {
        var txData = [];
        var logAddress = createLog(electionName);

        txData.push("setSingleAttribute");
        txData.push("logHash");
        txData.push(logAddress);
        var hash = sendMsg(electionNameToElectionAddress(electionName), txData);
        return hash;
    }

    this.setLog = function(newElectionLog) {
        var txData = [];
        var logAddress = writeFile(JSON.stringify(newElectionLog));

        txData.push("setSingleAttribute");
        txData.push("logHash");
        txData.push(logAddress);
        var hash = sendMsg(electionNameToElectionAddress(newElectionLog.electionName), txData);
        return hash;
    }

    this.getLog = function(electionName) {
        var logAddress = esl.single.Value(electionNameToElectionAddress(electionName), sutil.stringToHex("logHash"));

        return JSON.parse(readFile(logAddress));
    }

    this.hasVoted = function(electionName, username) {
        var logAddress = esl.single.Value(electionNameToElectionAddress(electionName), sutil.stringToHex("logHash"));
        var electionLog = JSON.parse(readFile(logAddress));
        if (electionLog.votingLog[username] == undefined) {
            return false;
        }
        return true;
    }

    this.generatePublicKeys = function(voterNum, passwordLength) {
        var id = "";
        var password = "";
        var publicKeys = [];
        var idPrefix = generateIdPrefix();
        var i = 0;

        while (publicKeys.length != voterNum) {
            i++;
            id = idPrefix + padLeft((i).toString(), voterNum.toString().length);
            if (!this.userExists("voter", id)) {
                password = generateRandomPassword(passwordLength);
                publicKeys.push({"id":id, "password":password});
            }
        }
        return publicKeys;
    }

    this.generatePrivateKey = function(passwordLength) {
        var privateKey = {};

        do {
            privateKey.id = generateRandomId();
        } while(this.userExists("anonymousVoter", privateKey.id));
        privateKey.password = generateRandomPassword(passwordLength);
        return privateKey;
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
        Println(info.organizerName);
        info.openTime = this.getOpenTime(electionName);
        Println(info.openTime);
        info.closeTime = this.getCloseTime(electionName);
        Println(info.closeTime);
        info.pollDes = this.getElectionDescription(electionName);
        Println("1   1111111111111 " + info.pollDes);
        return info;
    }

    this.validateUser = function(identity, username, electionName) {
        if (identity === "voter") {
            if (esl.ll.Main(userNameToUserAddress("voter", username), sutil.stringToHex("reverseElectionList"), electionNameToElectionAddress(electionName)) != "0x0") {
                return "secondPasswordNotSet";
            }
            else {
                return "secondPasswordSet";
            }
        } else if (identity === "anonymousVoter") {
            if (esl.ll.Main(electionNameToElectionAddress(electionName), sutil.stringToHex("reverseAnoList"), userNameToUserAddress("anonymousVoter", username)) != "0x0") {
                return "validId";
            } else {
                return "invalidId";
            }
        }
    }

    this.getVotingInfo = function(electionName) {
        var desHash = esl.single.Value(electionNameToElectionAddress(electionName), sutil.stringToHex("desHash"));
        var des = JSON.parse(readFile(desHash));
        var votingInfo = {};

        votingInfo.rulesNum = des.rulesNum;
        votingInfo.candidates = des.canOpts;
        return votingInfo;
    }

    this.getVotes = function(electionName, username) {
        var logHash = esl.single.Value(electionNameToElectionAddress(electionName), sutil.stringToHex("logHash"));
        var electionLog = JSON.parse(readFile(logHash));
        var optionNumber = parseInt(esl.single.Value(electionNameToElectionAddress(electionName), sutil.stringToHex("optionNumber")).slice(2), 10);
        var votes = [];
        var optionIndex = "";

        for (var i = 0; i < optionNumber; i++) {
            votes.push("0");
        }

        for (var i = 0; i < electionLog.voted[username].length; i++) {
            optionIndex = electionLog.voted[username][i];
            votes[parseInt(optionIndex, 10) - 1] = electionLog.votes[username][optionIndex];
        }
        return votes;
    }

    this.voteOps = function(voteOperation, electionName, username, optionIndex, ballot) {
        var txData = [];

        optionIndex = parseInt(optionIndex, 10);
        ballot = parseInt(ballot, 10);
        if (voteOperation === "vote") {
            txData.push("vote");
        } else if (voteOperation === "devote") {
            txData.push("devote");
        }
        txData.push(electionNameToElectionAddress(electionName));
        txData.push("0x" + optionIndex.toString(16));
        txData.push("0x" + ballot.toString(16));
        var hash = sendMsg(userNameToUserAddress("anonymousVoter", username), txData);
        return hash;
    }

    this.getOpenTime = function(electionName) {
        return sutil.hexToString(esl.single.Value(electionNameToElectionAddress(electionName), sutil.stringToHex("opened")));
    }

    this.getCloseTime = function(electionName) {
        return sutil.hexToString(esl.single.Value(electionNameToElectionAddress(electionName), sutil.stringToHex("closed")));
    }

    this.getElectionDescription = function(electionName) {
        var des = JSON.parse(readFile(esl.single.Value(electionNameToElectionAddress(electionName), sutil.stringToHex("desHash"))));

        return des.pollDes;
    }

    this.getDescription = function(electionName) {
        var des = JSON.parse(readFile(esl.single.Value(electionNameToElectionAddress(electionName), sutil.stringToHex("desHash"))));

        return des;
    }

    this.getResult = function(electionName) {
        var electionResult = {};
        var des = this.getDescription(electionName);
        var electionLog = this.getLog(electionName);
        var votes = [];
        electionResult["candidates"] = []
        electionResult["log"] = []

        for (var i = 0; i < des.canOpts.length; i++) {
            electionResult["candidates"].push({"name": des.canOpts[i].name, "canDes": des.canOpts[i].canDes, "votes": getOptionResult(electionName, (i + 1).toString())});
        }

        var crtAno;
        var anoAddr = esl.ll.Main(electionNameToElectionAddress(electionName), sutil.stringToHex("anoList"), sutil.stringToHex("HEAD"));
        while (anoAddr != "0x0") {
            crtAno = userAddressToUserName("anonymousVoter", anoAddr);
            votes = []
            for (var i = 0; i < des.canOpts.length; i++) {
                votes.push("0");
            }
            if (electionLog.voted[crtAno]) {
                for (var i = 0; i < electionLog.voted[crtAno].length; i++) {
                    votes[parseInt(electionLog.voted[crtAno][i], 10) - 1] = electionLog.votes[crtAno][electionLog.voted[crtAno][i]];
                }
            }
            electionResult["log"].push({"id": crtAno, "votes": votes});
            anoAddr = esl.ll.Main(electionNameToElectionAddress(electionName), sutil.stringToHex("anoList"), anoAddr);
        }

        return electionResult
    }

    function generateRandomId() {
        return (parseInt((Math.floor(Math.random() * 99)).toString() + ((new Date()).getTime()).toString(), 10)).toString(36);
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
            varStr = "anoNameToAnoAddress";
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
            varStr = "anoAddressToAnoName";
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

    /* {"created":"1432107243000",
        "electionName":"pl1",
        "lastModified":1432108176583,
        "operationLog":[{"timestamp":"1432108176585","username":"usr1","operation":"vote$|$1$|$1"},{"timestamp":"1432108176999","username":"usr1","operation":"devote$|$1$|$1"}],
        "votingLog":{"usr1":[{"timestamp":"1432108176999","operation":"vote$|$1$|$1"}],"usr2":[{"timestamp":"1432108176999","operation":"devote$|$1$|$1"}]},
        "voted":{"usr1":["1","2"]},
        "votes":{"usr1":{"1":"2", "2":"3"}}}
        Note: vote$|$1$|$2   =   vote 2 ballot for option 1
              undo$|$1$|$2   =   withdraw 2 ballot for option 1
    */
    function createLog(electionName) {
        var electionLog = {};

        electionLog.electionName = electionName;
        electionLog.created = parseInt(esl.single.Value(electionNameToElectionAddress(electionName), sutil.stringToHex("CREATED")), 16).toString() + "000";
        electionLog.lastModified = (new Date()).getTime();
        electionLog.operationLog = [];
        electionLog.votingLog = {};
        electionLog.voted = {};
        electionLog.votes = {};
        return writeFile(JSON.stringify(electionLog));
    }

    function getOptionResult(electionName, optionIndex) {
        return parseInt(esl.kv.Value(electionNameToElectionAddress(electionName), sutil.stringToHex("ballots"), parseInt(optionIndex, 10)), 16);
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

    this.test = function() {
        return this.getVoters("pl7");
    }
};
