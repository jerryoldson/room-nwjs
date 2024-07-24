const { Room } = (API = require("node-haxball")());

const initRoom = (token) => {
    Room.create({
        name: "bot test",
        password: "pwd",
        showInRoomList: true,
        maxPlayerCount: 10,
        token: token
    }, {
        storage: {
            player_name: "wxyz-abcd",
            avatar: "👽"
        },
        libraries: [], // example library usage: [new commands(API)] // look at examples/libraries folder for related examples.
        config: null, // example roomConfig usage: new defaultConfig(API) // look at examples/roomConfigs/method2 folder for related examples.
        renderer: null, // example renderer usage: new defaultRenderer(API, {canvas: ..., images: {grass: ..., concrete: ..., concrete2: ..., typing: ...}, paintGame: true}) // look at examples_web folder for usage with room.setRenderer instead.
        plugins: [], // example plugin usage: [new autoPlay_followBall(API)] // look at examples/plugins folder for related examples.
        onSuccess: roomCallbacks, // look at examples/roomConfigs/method1 folder for related examples.
        onFailure: (error) => {
            console.log("Unable to join room...", error.toString());
            process.exit(0);
        },
        onLeave: (msg) => {
            console.log("Bot has left the room:", msg.toString());
            process.exit(0);
        }
    });

    function roomCallbacks(room) { // "roomCallbacks" examples start from here. // look at examples/roomConfigs/method1 folder for related examples.
        room.onAfterRoomLink = (roomLink) => {
            console.log("room link:", roomLink);
            showRoomLink(link);
        };
    }
};

const showRoomLink = (link) => {
    const win = nw.Window.get();
    win.window.document.head.innerHTML = "";
    win.window.document.body.innerHTML = "";
    win.window.document.body.innerHTML =
        `
    <h1>Room Link</h1>
    <a href=${link} id="link">${link}</a>
    `;
};

module.exports = { initRoom };
