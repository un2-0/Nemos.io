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
        request.open(method, url, false);
        if (typeof(body) == "undefined") {
            body = null;
        }
        request.send(body);
        return request.responseText;
    }

    this.sendAsync = function(method, url, body, callbackFn) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if (request.readyState === 4) {
                callbackFn(request);
            }
        };
        request.open(method, url, true);
        if (typeof(body) == "undefined") {
            body = null;
        }
        request.send(body);
        return;
    }
}