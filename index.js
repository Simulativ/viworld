var path = require("path");
var http = require("http");
var express = require("express");
var cors = require("cors");
var serveIndex = require('serve-index');

const monitor = require("@colyseus/monitor").monitor;

var { Server} = require("colyseus");

var { GameRoom } = require("./server/GameRoom");

const port = process.env.PORT || 2657;
const app = express();

app.use(cors());
app.use(express.json());


// Create HTTP & WebSocket servers
const server = http.createServer(app);
const gameServer = new Server({
    server: server,
    express: app
});
gameServer.define("game", GameRoom);

app.use('/', serveIndex(path.join(__dirname, "client")));
app.use('/', express.static(path.join(__dirname, "client")));
app.use("/colyseus", monitor());

gameServer.listen(port);
console.log(`Listening on ${ port }`)

module.exports = {port}