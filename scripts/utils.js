function createRequest() {
    try {
        request = new XMLHttpRequest();
    } catch (tryMS) {
        try {
            request = new ActiveXObject("Msxm12.XMLHTTP");
        } catch (otherMS) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                request = null;
            }
        }
    }
    
    return request;
}

function HttpAPI() {

    this.send = function(method, url, body) {
        var request = createRequest();
        if (request == null) {
            window.alert("Unable to create a request");
            return;
        }
        xmlHttp.open(method, url, false);
        if (typeof(body) == "undefined") {
            body = null;
        }
        xmlHttp.send(body);
        return xmlHttp.responseText;
    }

    this.sendAsync = function(method, url, body, callbackFn) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function(){
            if (xmlHttp.readyState === 4) {
                callbackFn(xmlHttp);
            }
        };
        xmlHttp.open(method, url, true);
        if (typeof(body) === "undefined") {
            body = null;
        }
        xmlHttp.send(body);
        return;
    }
}