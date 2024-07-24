const { initRoom } = require("./src/startRoom.js")

nw.Window.open('https://www.haxball.com/headlesstoken', {}, function (win) {
    win.on("loaded", () => {
        if (win.window.document.location.href == "https://www.haxball.com/rs/api/getheadlesstoken") {
            getToken();
        }
    });
    win.on('new-win-policy', function (frame, url, policy) {
        nw.Shell.openExternal(url);
        policy.ignore();
    });
    win.on('navigation', function (frame, url, policy) {
        nw.Shell.openExternal(url);
        policy.ignore();
    });
});

function getToken() {
    const win = nw.Window.get();
    var t = win.window.document.body.getElementsByTagName("pre")[0]?.innerText;
    if (!t)
        setTimeout(getToken, 500);
    else {
        t = t.slice(17, -1);
        if (t) {
            token = t;
            start(token);
        }
    }
}

function start(token) {
    console.log(token);
    initRoom(token);
};
