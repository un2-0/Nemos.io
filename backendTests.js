var httpAPI;
var methodSelector;
var sendBtn;

var methods = {};

methods["echo"] = {
    sender : echo,
    params : {"msg" : "Massage: "}
}

methods["getContractAddress"] = {
    sender : echo,
    params : {"contractName" : "Contract Name: "} // name : label content
};

var contracts = {};

window.onload = init;

function init() {
    console.log("in backend tests");
    httpAPI = new HttpAPI();
    console.log("successfully get a HttpAPI object");
    sendBtn = document.getElementById("sendBtn");
    setUpMethodSelector();
}

function setUpMethodSelector() {
    methodSelector = document.getElementById("method");
    methodSelector.innerHTML = "";
    var defaultOpt = document.createElement("OPTION");
    defaultOpt.value = 0;
    defaultOpt.innerHTML = "Select a method";
    defaultOpt.disabled = true;
    defaultOpt.selected = true;
    methodSelector.appendChild(defaultOpt);
    for (var methodName in methods) {
        if (methods.hasOwnProperty(methodName)) {
            var opt = document.createElement("OPTION");
            opt.value = methodName;
            opt.innerHTML = methodName;
            methodSelector.appendChild(opt);
        }
    }
    methodSelector.onchange = methodChange;
}

function methodChange() {
    var methodName = this.options[this.selectedIndex].value;
    var method = methods[methodName];
    if (method) {
        setKVArea(method.params);
        setSendBtn(method.sender);
    } else
        window.alert("No such method");
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


// sender functions
function echo() {
    var methodName = methodSelector.options[methodSelector.selectedIndex].value;
    var str = methodName + "$";
    var paramInputs = document.getElementsByClassName("param");
    for (var i = 0; i < paramInputs.length; i++) {
        paramInputs[i];
        str = str + paramInputs[i].id + "=" + paramInputs[i].value + "&";
    }
    window.alert(str);
}

function getContractAddress() {
    // TODO
}