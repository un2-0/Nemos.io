var httpAPI;
var operationSelector;
var sendBtn;

var operations = {};

operations["echo"] = {
    params : {"msg" : "Massage: "}
}

operations["getContractAddress"] = {
    params : {"contractName" : "Contract Name: "} // name : label content
};

operations["login"] = {
    params : {
        "identity" : "Organizer or voter",
        "username" : "User Name: ",
        "password" : "Password: "
    }
}

operations["module1CreatePoll"] = {
    params : {
        "pollName" : "Poll Name",
        "organizerName" : "Organizer Name",
        "openTime" : "Openning Time",
        "closeTime" : "Closing Time",
        "pollDes" : "Description",
        "voterNum" : "Voter Number",
        "canoptNum" : "Candidate Number",
        "rulesNum" : "Vote Number",
        "canOpts": "Candidates"
    }
}

operations["showPollBasicInfo"] = {
    params : {
        "selectedPollName" : "Poll Name"
    }
}

operations["showPollList"] = {
    params: {
        "identity" : "Organizer or voter",
        "username" : "User Name"
    }
}

operations["checkVoterSecondAccount"] = {
    params : {
        "username" : "User Name",
        "pollName" : "Poll Name"
    }
}

operations["organiserRegister"] = {
    params : {
        "username" : "Organizer Name: ",
        "password" : "Password: "
    }
}

operations["checkVoterSecondIdPassword"] = {
    params : {
        "username" : "User Name: ",
        "secondId" : "Second ID: ",
        "secondPassword" : "Second Password: ",
        "selectedPollName" : "Poll Name"
    }
}

operations["pushToIpfs"] = {
    params : {
        "filedata" : "File Data: "
    }
}

operations["getFromIpfs"] = {
    params : {
        "hash" : "Hash: "
    }
}


var contracts = {};

window.onload = init;

function init() {
    console.log("in backend tests");
    httpAPI = new HttpAPI();
    console.log("successfully get a HttpAPI object");
    sendBtn = document.getElementById("sendBtn");
    sendBtn.onclick = generalSender;
    setUpOperationSelector();
}

function setUpOperationSelector() {
    operationSelector = document.getElementById("operation");
    operationSelector.innerHTML = "";
    var defaultOpt = document.createElement("OPTION");
    defaultOpt.value = 0;
    defaultOpt.innerHTML = "Select an operation";
    defaultOpt.disabled = true;
    defaultOpt.selected = true;
    operationSelector.appendChild(defaultOpt);
    for (var operation in operations) {
        if (operations.hasOwnProperty(operation)) {
            var opt = document.createElement("OPTION");
            opt.value = operation;
            opt.innerHTML = operation;
            operationSelector.appendChild(opt);
        }
    }
    operationSelector.onchange = operationChange;
}

function operationChange() {
    var operationName = this.options[this.selectedIndex].value;
    var operation = operations[operationName];
    if (operation) {
        setKVArea(operation.params);
    } else
        window.alert("No such operation");
}

// rearrange the areas for key-value pairs according to 
function setKVArea(params) {
    var kvArea = document.getElementById("kvArea");
    kvArea.innerHTML = "";
    for (var name in params) {
        if (params.hasOwnProperty(name)) {
            var parag = document.createElement("P");
            var label = document.createElement("LABEL");
            label.innerHTML = params[name];
            label.setAttribute("for", name);
            var input = document.createElement("INPUT");
            input.setAttribute("type", "text");
            input.setAttribute("class", "param");
            input.id = name;
            parag.appendChild(label);
            parag.appendChild(input);
            kvArea.appendChild(parag);
        }
    }
}

function setSendBtn(sender) {
    sendBtn.onclick = sender;
}

function showRequest(method, url, body) {
    document.getElementById("methodSent").innerHTML = method;
    document.getElementById("urlSent").innerHTML = url;
    document.getElementById("bodySent").innerHTML = JSON.stringify(body);
}

function showResponse(XMLHttpReq) {
    //window.alert("in showResponse");
    document.getElementById("statusCode").innerHTML = XMLHttpReq.status;
    document.getElementById("response").innerHTML = XMLHttpReq.response;

    console.log(XMLHttpReq);
}

function getOperationSelected() {
    return operationSelector.options[operationSelector.selectedIndex].value;
}

function getQuery() {
    var query = {};
    var paramInputs = document.getElementsByClassName("param");
    for (var i = 0; i < paramInputs.length; i++) {
        query[paramInputs[i].id] = paramInputs[i].value;
    }
    return query;
}

function makeUrl(operation) {
    return baseURL + "/" + operation;
}

function echo () {
    var method = "";
    var operation = getOperationSelected();
    var query = getQuery();
    var url = makeUrl(operation)
    var body = null;
    showRequest(method, url, body);
}

function generalSender() {
    var method = "POST";
    var operation = getOperationSelected();
    var query = getQuery();
    var url = makeUrl(operation);
    var body = JSON.stringify(query);
    showRequest(method, url, body);
    httpAPI.sendAsync(method, url, body, showResponse);
}