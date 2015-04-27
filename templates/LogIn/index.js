baseUrl = "/apis/SmartVote";
var sender;

window.onload = init;

function init() {
    sender = new HttpAPI();

    document.getElementById("loginBtn").onclick = login;
    document.getElementById("regBtn").onclick = register;
}

function login() {
    window.alert("in login");
    sender.sendAsync("GET", baseUrl+ "/login&", null, function(res) {
        if (res.status === 200) {
            console.log(res);
            var body = JSON.parse(res.response);
            if (body.process === "registered"){
                window.alert("account detected, loging you in");
                window.location.href = "./templates/OrganizerHome/OrganizerHome.html";
            } else {
                window.alert("bad response, fail to log in");
            }
        } else {
            window.alert("failed to login");
        }
    });
}

function register() {
    
}